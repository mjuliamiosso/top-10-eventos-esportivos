import React from "react";

interface FilterButtonsProps {
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
  options,
  selected,
  onSelect,
}) => {
  return (
    <div className="flex gap-5 flex-wrap justify-center">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          className={`font-bold text-xl uppercase cursor-pointer transition-all
            ${
              selected === option
                ? " text-[var(--secondary-color)]"
                : " text-[var(--gray-color)]"
            }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
