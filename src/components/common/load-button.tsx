import React, { FC, ReactNode } from "react";

interface LoadButtonProps {
  onClick: () => Promise<void> | void;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
}

const LoadButton: FC<LoadButtonProps> = ({
  onClick,
  className = "",
  disabled = false,
  children = "Load more",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`border-2 border-primary rounded-xl min-h-14 w-full font-medium text-primary cursor-pointer capitalize max-md:px-4 disabled:opacity-50 disabled:cursor-not-allowed max-w-[260px] ${className}`}
    >
      {children}
    </button>
  );
};

export default LoadButton;
