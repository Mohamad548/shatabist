import dynamic from "next/dynamic";

const ShoppingListBox = dynamic(
	() => import("@/components/base/shopping-list-box"),
	{ ssr: false }
);

function ShoppingLists({ params }: { params: { id: string } }) {
	const { id } = params;

	return <ShoppingListBox shoppingId={id} />;
}

export default ShoppingLists;
