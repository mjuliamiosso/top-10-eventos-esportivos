import React, { FC } from "react";

interface EventDateProps {
  nome: string;
  endereco: string;
  datahora: string;
}

const EventDate: FC<EventDateProps> = ({ nome, endereco, datahora }) => {
  const dt = new Date(datahora);
  const day = String(dt.getDate()).padStart(2, "0");
  const month = dt
    .toLocaleString("pt-BR", { month: "short" })
    .toUpperCase()
    .replace(/\.$/, "");
  const time = dt.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex gap-5 items-center text-[var(--text-color)] px-5 py-2 rounded-lg bg-white mr-5 h-full">
      <div className="flex flex-col w-9 items-center">
        <p className="font-bold text-[1.75rem]">{day}</p>
        <p className="text-[var(--gray-color)] text-sm">{month}</p>
      </div>
      <div>
        <p className="text-base font-bold">{nome}</p>
        <p className="text-sm">{endereco}</p>
        <p className="text-[var(--gray-color)] text-sm">{time}</p>
      </div>
    </div>
  );
};

export default EventDate;
