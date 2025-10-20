import clsxm from "@/utils/clsxm";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const Button = ({
  children,
  className,
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      className={clsxm(className)}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
