import React, { FC } from "react";

interface TableListProps {
  id: string | number;
  date: string;
  points: number;
  description: string;
}

const TableList: FC<TableListProps> = ({ id, date, points, description }) => {
  return (
    <div
      className={`grid grid-cols-4 max-sm:grid-cols-3 gap-2 p-2 items-center max-md:py-1 shadow text-[#AFB1AE] font-medium   hover:bg-gray-100 transition-colors rounded-lg`}
      style={{
       boxShadow: "0px 0px 6.8px 0px #00000040"
      }}
    >
      <div className="p-2">{id}</div>
      <div className="p-2">{date}</div>
      <div
        className={`p-2 ${
          points > 0 ? "text-green-600" : "text-red-600"
        } font-semibold`}
      >
        {points > 0 ? `+${points}` : points}
      </div>
      <div className="p-2 max-w-40 max-sm:hidden">{description} Lorem ipsum dolor, sit amet  </div>
    </div>
  );
};

export default TableList;
