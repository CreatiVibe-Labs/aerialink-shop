import React, { FC } from "react";

interface PointsComponentCardProps {
  className?: string;
  title: string;
  value: string | number;
}

const PointsComponentCard: FC<PointsComponentCardProps> = ({
  title = "empty",
  value = "0000",
  className = "",
}) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <h3 className="text-min-gray text-lg font-bold max-sm:text-sm">{title}</h3>
      <h3 className=" text-7xl max-md:text-5xl font-bold text-primary max-sm:text-4xl">{value}</h3>
    </div>
  );
};

export default PointsComponentCard;
