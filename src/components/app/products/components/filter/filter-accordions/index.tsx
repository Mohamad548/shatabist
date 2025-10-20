import Accordion from "@/components/base/accordion";
import DoubleRangeSlider from "@/components/base/double-range";
import Input from "@/components/base/input";
import RadioBox from "@/components/base/radioBox";
import { localization } from "@/constants/localization";
import clsxm from "@/utils/clsxm";
import { useState } from "react";
import { FilterAccordionProps } from "../../../hooks/type";
const FilterAccordion = ({
	item,
	searchQuery,
	onSearchChange,
	selectedValues,
	onCheckboxChange,
}: FilterAccordionProps) => {
	const values = Array.isArray(item.values) ? item.values : [];
	const [rangeIsSelected, setRangeIsSelected] = useState(false);
	const isSelected =
		values.some((value) => selectedValues.includes(value.name)) ||
		rangeIsSelected;
	const getClassNameLabel = (name: string) => {
		return clsxm(
			"transition-all pr-2 duration-300 ease-in-out text-sm cursor-pointer",
			selectedValues.includes(name)
				? "px-2 rounded-md font-Medium"
				: "font-regular text-gray-600"
		);
	};
	const handleRangeChange = (min: number, max: number, isInRange: boolean) => {
		setRangeIsSelected(isInRange);
	};
	return (
		<div className={clsxm("md:block px-4")}>
			<Accordion key={item.id} title={item.name}>
				{item.id !== 13 && (
					<Input
						placeholder={` ${localization.search} ${item.name}...`}
						onChange={(e) => onSearchChange(e.target.value)}
						iconClass="bottom-2"
						iconSrc={item.id == 13 ? "" : "/svg/search-normal.svg"}
						inputClassName="w-full md:flex py-2 rounded-md pr-8 text-sm"
						type="text"
						parentClassName="relative"
					/>
				)}
				{item.id === 13 ? (
					<div className="flex flex-col space-y-4">
						<div className="mt-5">
							<DoubleRangeSlider
								min={0}
								max={100}
								step={1}
								initialMin={0}
								initialMax={100}
								onChange={handleRangeChange}
								values={values}
							/>
						</div>
					</div>
				) : (
					values
						.filter((value) =>
							value.name.toLowerCase().includes(searchQuery?.toLowerCase())
						)
						.map((value) => (
							<div
								className="flex-col py-4 font-regular text-xs text-gray-800"
								key={value.id}
							>
								<RadioBox
									id={value.id}
									name={value.name}
									selectedOption={
										selectedValues.includes(value.name) ? value.id : null
									}
									onChange={() => onCheckboxChange(value.name)}
									type="checkbox"
									classNameParentSorting="gap-2"
									classNameLabel={getClassNameLabel(value.name)}
								/>
							</div>
						))
				)}
			</Accordion>
		</div>
	);
};

export default FilterAccordion;
