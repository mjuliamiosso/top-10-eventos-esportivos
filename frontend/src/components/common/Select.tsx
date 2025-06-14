import React from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  name: string;
  options: Option[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({ name, options, value, onChange }) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="p-2.5 text-sm lg:text-base border bg-white border-gray-300 rounded-lg cursor-pointer"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
