"use client";
import React from "react";

const OrderHistory = () => {
  const orders = [
    { id: "#152626", date: "01-02-2025", amount: "$250", status: "Delivered" },
    { id: "#32928", date: "01-02-2025", amount: "$350", status: "Cancelled" },
    { id: "#152626", date: "01-02-2025", amount: "$250", status: "Delivered" },
    { id: "#32928", date: "01-02-2025", amount: "$350", status: "Cancelled" },
    { id: "#152626", date: "01-02-2025", amount: "$250", status: "Delivered" },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <section className="w-[1014px]  rounded-[14px] pt-8 space-y-6 ">
      

        {/* Header Row */}
        <div className="grid grid-cols-4 items-center h-[69px] bg-[#98C1A9] text-white font-medium text-[20px] rounded-[14px] py-3 px-6">
          <span>Invoice No</span>
          <span>Date</span>
          <span>Amount</span>
          <span>Status</span>
        </div>

        {/* Orders List */}
        <div className="flex flex-col gap-5 pt-2"> 
          {orders.map((order, index) => (
            <div
              key={index}
              className="grid grid-cols-4 items-center bg-[#FFFDFA] text-[#666664] rounded-[14px] h-[84px] py-4 px-6 shadow-sm text-2xl "
            >
              <span className="font-medium">{order.id}</span>
              <span>{order.date}</span>
              <span className="text-[#98C1A9] font-semibold">{order.amount}</span>
              <span
                className={`font-medium ${
                  order.status === "Delivered"
                    ? "text-[#98C1A9]"
                    : "text-red-500"
                }`}
              >
                {order.status}
              </span>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center pt-4">
          <button
            type="button"
            className="w-[381px] h-[52px] border border-[#98C1A9] text-[#98C1A9] font-semibold text-[15px] rounded-[10px] hover:bg-[#98C1A9] hover:text-white transition"
          >
            Load More
          </button>
        </div>
      </section>
    </div>
  );
};

export default OrderHistory;
