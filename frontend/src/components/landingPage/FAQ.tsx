"use client";

import React, { useState } from "react";
import { IoChevronDown } from "react-icons/io5"; // Ícone da setinha

interface FAQProps {
  question: string;
  answer: string;
}

const FAQ: React.FC<FAQProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`rounded-lg transition-colors duration-200 ${
        isOpen
          ? "bg-[#fff] text-[var(--text-color)]"
          : "bg-white text-[var(--text-color)]"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 font-semibold focus:outline-none cursor-pointer text-base"
      >
        <span className={` hover:text-[var(--secondary-color)] transition ${
            isOpen ? "text-[var(--secondary-color)]" : ""} `}>{question}</span>
        <IoChevronDown
          className={`text-xl transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && <div className="px-4 pb-4">{answer}</div>}
    </div>
  );
};

export default FAQ;
