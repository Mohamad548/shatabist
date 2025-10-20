import dynamic from "next/dynamic";

const TicketDetail = dynamic(() => import("@/components/base/ticket-detail"), {
	ssr: false,
});

function TicketDetailPage({ params }: { params: { id: string } }) {
	const { id } = params;
	return <TicketDetail ticketId={id} />;
}

export default TicketDetailPage;
