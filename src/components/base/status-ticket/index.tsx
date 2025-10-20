import React from "react";
import { useGetTickets } from "@/components/app/profile-user/hooks";
import TicketCard from "../ticket-card";
import ShataLoading from "../loading/shata-loading";

interface Ticket {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  status: string;
}

function StatusTicketList({
  status,
  label,
}: {
  status: string;
  label: string;
}) {
  const { data, isLoading } = useGetTickets(status);
  const { tickets } = data || {};

  if (isLoading)
    return (
      <ShataLoading
        size="medium"
        showText={true}
        text="در حال بارگذاری تیکت ها..."
      />
    );

  return (
    <div className=" flex flex-col gap-2">
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
            label={label}
          />
        ))}
    </div>
  );
}

export default StatusTicketList;
