import dynamic from "next/dynamic";

const OrderDetail = dynamic(
	() =>
		import(
			"@/components/app/profile-user/components/content/section-orders/order-detail"
		),
	{ ssr: false }
);

interface OrderDetailPageProps {
	params: {
		orderId: string;
	};
}

function OrderDetailPage({ params }: OrderDetailPageProps) {
	return <OrderDetail orderId={params.orderId} />;
}

export default OrderDetailPage;
