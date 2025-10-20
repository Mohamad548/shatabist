import React from "react";
import clsxm from "@/utils/clsxm";

type LoadingSpinnerProps = {
  className?: string;
  size?: number;
  color?: string;
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  className,
  size = 40,
  color = "#4A90E2",
}) => {
  return (
    <div className={clsxm("flex items-center justify-center", className)}>
      <div
        style={{
          width: size,
          height: size,
          borderWidth: size / 8,
          borderColor: `${color} transparent transparent transparent`,
        }}
        className="animate-spin rounded-full border-solid"
      />
    </div>
  );
};

export default LoadingSpinner;
