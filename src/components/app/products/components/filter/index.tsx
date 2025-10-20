import { ProductType } from "@/components/base/product-card/type";
import FilterBody from "./filter-body";
import FilterMobile from "./filter-mobile";

interface FilterProps {
	products?: ProductType[];
	selectedFilters: { [propertyId: number]: string[] };
	onFilterChange: (propertyId: number, value: string, checked: boolean) => void;
}

const Filter = ({
	products = [],
	selectedFilters,
	onFilterChange,
}: FilterProps) => {
	return (
		<>
			<FilterMobile
				products={products}
				selectedFilters={selectedFilters}
				onFilterChange={onFilterChange}
			/>
			<FilterBody
				className="hidden md:flex"
				products={products}
				selectedFilters={selectedFilters}
				onFilterChange={onFilterChange}
			/>
		</>
	);
};

export default Filter;
