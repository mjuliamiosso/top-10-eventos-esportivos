import React, { FC } from "react";

interface EventDateProps {
  day: string;
  month: string;
  place: string;
  address: string;
  date: string;
}

const EventDate: FC<EventDateProps> = ({
  day,
  month,
  place,
  address,
  date,
}) => {
  return (
    <div className="flex gap-5 items-center text-[var(--text-color)] px-5 py-2 rounded-lg bg-white mr-5 h-full">
      <div className="flex flex-col w-9 items-center">
        <p className="font-bold text-[1.75rem]">{day}</p>
        <p className="text-[var(--gray-color)] text-sm">{month}</p>
      </div>
      <div>
        <p className="text-base font-bold">{place}</p>
        <p className="text-sm">{address}</p>
        <p className="text-[var(--gray-color)] text-sm">{date}</p>
      </div>
    </div>
  );
};

export default EventDate;
