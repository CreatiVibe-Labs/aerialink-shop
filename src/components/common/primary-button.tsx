import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { PiSpinnerGapBold } from "react-icons/pi";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "fill" | "outline";
  className?: string;
  loading?: boolean;
  children: ReactNode;
}

const PrimaryButton: React.FC<ButtonProps> = ({
  children,
  variant = "fill",
  className = "",
  disabled,
  loading = false,
  ...rest
}) => {
  const baseStyles =
    "w-full height rounded-custom  font-medium flex items-center justify-center transition-colors duration-200";

  const variantStyles =
    variant === "fill"
      ? "bg-primary text-white hover:bg-primary/90 "
      : "border border-primary text-primary hover:bg-primary hover:text-white cursor-pointer";

  const disabledStyles = "opacity-50 cursor-not-allowed";

  return (
    <button
      disabled={disabled || loading}
      className={`${baseStyles} ${variantStyles} ${
        disabled || loading ? disabledStyles : ""
      } ${className}`}
      {...rest}
    >
      {loading ? (
        <PiSpinnerGapBold className="animate-spin w-5 h-5 " />
      ) : (
        children
      )}
    </button>
  );
};

export default PrimaryButton;
