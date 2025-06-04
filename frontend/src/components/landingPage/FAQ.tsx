"use client";

import React, { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import clsx from "clsx";

interface FaqProps {
  question: string;
  answer: string;
}

const Faq: React.FC<FaqProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={clsx(
        "rounded-lg transition-all duration-300",
        isOpen ? "bg-white" : "bg-white border-transparent"
      )}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "w-full flex justify-between items-center p-[14px] font-semibold text-left cursor-pointer transition-colors duration-300",
          isOpen
            ? "text-[var(--secondary-color)]"
            : "text-[var(--text-color)] hover:text-[var(--secondary-color)]"
        )}
      >
        <span className="text-base leading-relaxed">{question}</span>
        <IoChevronDown
          className={clsx(
            "transition-transform duration-300",
            isOpen ? "rotate-180 text-[var(--secondary-color)]" : "text-[var(--text-color)]"
          )}
        />
      </button>

      <div
        className={clsx(
          "overflow-hidden transition-all duration-300 px-[14px]",
          isOpen ? "max-h-40 pb-6" : "max-h-0 pb-0"
        )}
        aria-hidden={!isOpen}
      >
        <p className="text-base leading-relaxed text-[var(--text-color)]">{answer}</p>
      </div>
    </div>
  );
};

export default Faq;
