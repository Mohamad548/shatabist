"use client";
import { ProductType } from "@/components/base/product-card/type";
import Switch from "@/components/base/switch";
import clsxm from "@/utils/clsxm";
import { useState } from "react";
import FilterAccordion from "../filter-accordions";

type FilterItem = {
	id: number;
	name: string;
	values?: { id: number; name: string }[];
};

type FilterBodyTypes = {
	className?: string;
	products?: ProductType[];
	selectedFilters: { [propertyId: number]: string[] };
	onFilterChange: (propertyId: number, value: string, checked: boolean) => void;
};

function FilterBody({
	className,
	products = [],
	selectedFilters,
	onFilterChange,
}: FilterBodyTypes) {
	const [searchQueries, setSearchQueries] = useState<{ [key: number]: string }>(
		{}
	);
	const [switchStates, setSwitchStates] = useState<{ [key: number]: boolean }>(
		{}
	);

	// ✅ Ensure `products` is an array before calling .reduce() to prevent runtime errors.
	const filterableProperties = Array.isArray(products)
		? products.reduce(
				(acc, product) => {
					product?.productProperties?.forEach((prop) => {
						if (prop.asFilter) {
							const propertyId = prop?.property_value?.propertyId;
							if (!acc[propertyId]) {
								acc[propertyId] = {
									id: propertyId,
									name: prop?.property_value?.property?.title,
									values: new Set<string>(),
								};
							}

							// Split values by comma and trim whitespace
							const values = prop?.property_value?.description
								?.split(",")
								.map((v: string) => v.trim());
							values?.forEach((value: string) => {
								if (value) {
									acc[propertyId]?.values?.add(value);
								}
							});
						}
					});
					return acc;
				},
				{} as { [key: number]: { id: number; name: string; values: Set<string> } }
		  )
		: {};

	// Convert Sets to arrays and create filter items
	const filters: FilterItem[] = [
		{ id: 1, name: "نمایش کالاهای موجود" },
		...Object.values(filterableProperties)?.map((prop) => ({
			id: prop.id,
			name: prop.name,
			values: Array.from(prop.values)?.map((value, index) => ({
				id: prop.id * 100 + index,
				name: value,
			})),
		})),
		// { id: 13, name: "بازه قیمتی" },
	];

	const handleSearchChange = (id: number, value: string) => {
		setSearchQueries((prev) => ({
			...prev,
			[id]: value,
		}));
	};

	const handleCheckboxChange = (propertyId: number, value: string) => {
		const checked = !selectedFilters[propertyId]?.includes(value);
		onFilterChange(propertyId, value, checked);
	};

	const handleSwitchChange = (id: number, checked: boolean) => {
		setSwitchStates((prev) => ({
			...prev,
			[id]: checked,
		}));
		if (id === 1) {
			onFilterChange(1, "inStock", checked);
		}
	};

	return (
		<section
			className={clsxm(
				"md:flex-col border-gray-200 border md:rounded-md md:bg-white",
				className
			)}
		>
			{filters.map((item, index) =>
				item.values ? (
					<FilterAccordion
						key={index}
						item={item}
						searchQuery={searchQueries[item.id] || ""}
						onSearchChange={(value) => handleSearchChange(item.id, value)}
						selectedValues={selectedFilters[item.id] || []}
						onCheckboxChange={(value: string) =>
							handleCheckboxChange(item.id, value)
						}
					/>
				) : (
					<div
						className={clsxm(
							"grid grid-flow-col mb-4 justify-between gap-x-4 pt-4 px-4"
						)}
						key={index}
					>
						<p className="font-Medium text-sm">{item.name}</p>
						<Switch
							checked={selectedFilters[item.id]?.includes("inStock") || false}
							onChange={(checked) => handleSwitchChange(item.id, checked)}
						/>
					</div>
				)
			)}
		</section>
	);
}

export default FilterBody;
