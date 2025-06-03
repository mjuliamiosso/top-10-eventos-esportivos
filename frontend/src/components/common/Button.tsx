import { FC, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({ children }) => {
  return (
    <button className="flex items-center gap-2 bg-[var(--secondary-color)] hover:bg-[var(--secondary-hover)] transition-all rounded-lg cursor-pointer font-bold text-[var(--text-white)] px-3 py-2 text-sm lg:px-4 lg:py-3 lg:text-base">
      {children}
    </button>
  );
};

export default Button;
