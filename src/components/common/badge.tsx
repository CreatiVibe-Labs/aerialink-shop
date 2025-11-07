import React, { FC } from 'react';

interface BadgeProps {
  children?: React.ReactNode;
  className?: string;
}

const Badge : FC<BadgeProps> =  ({children,className = ''}) => {
  return (
    <div className={`bg-[#E56B73]/20 px-1 rounded mx-1 ${className}`}>{children}</div>
  );
};

export default Badge;