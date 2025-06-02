import { FC, ReactNode } from "react";

interface ButtonProps {
  text: ReactNode;
}

const Button: FC<ButtonProps> = ({ text }) => {
  return <div>Button</div>;
};

export default Button;
