export interface FilterAccordionProps {
	item: FilterItem;
	searchQuery: string;
	onSearchChange: (value: string) => void;
	selectedValues: string[];
	onCheckboxChange: (value: string) => void;
	className?: string;
}
export interface FilterValue {
	id: number;
	name: string;
}
export interface FilterItem {
	id: number;
	name: string;
	values?: FilterValue[];
}
