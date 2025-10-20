import { useGetTickets } from "@/components/app/profile-user/hooks";
import TicketCard from "@/components/base/ticket-card";

interface Ticket {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  status: string;
}

function AllTicketTab({ status }: { status: string }) {
  const { data } = useGetTickets(status);
  const { tickets } = data || {};
  return (
    <div className="">
      {[...(tickets || [])]
        .sort(
          (a: Ticket, b: Ticket) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .map((ticket: Ticket) => (
          <TicketCard
            key={ticket.id}
            title={ticket.title}
            content={ticket.content}
            id={ticket.id}
            createdAt={ticket.createdAt}
            updatedAt={ticket.updatedAt}
            status={ticket.status}
          />
        ))}
    </div>
  );
}

export default AllTicketTab;
