import { info } from "console";
import { title } from "process";
import React, { FC, ReactNode } from "react";

interface InterviewProps {
  title: string;
  info: string;
  date: string;
}

const Interview: FC<InterviewProps> = ({ title, info, date }) => {
  return (
    <div className="flex flex-col gap-5 w-[180px]">
      <div className="w-[180px] h-[300px] rounded-lg bg-gray-200">
        Vídeo
      </div>
      <div className="flex flex-col gap-1 text-[var(--text-color)]">
        <p className="text-xl font-bold">{title}</p>
        <div>
          <p className="text-base">{info}</p>
          <p className="text-sm text-[var(--gray-color)] italic">{date}</p>
        </div>
      </div>
    </div>
  );
};

export default Interview;
