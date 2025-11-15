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
    // <div className="flex min-h-screen mt-5">
    //   <section className="w-full rounded-[14px] ">
    //     {/* Header Row */}
    //     <div className="grid grid-cols-4 items-center h-[69px] bg-[#98C1A9] text-white font-medium text-[20px] rounded-[14px] py-3 px-6">
    //       <span>Invoice No</span>
    //       <span>Date</span>
    //       <span>Amount</span>
    //       <span>Status</span>
    //     </div>

    //     {/* Orders List */}
    //     <div className="flex flex-col gap-5 pt-2">
    //       {orders.map((order, index) => (
    //         <div
    //           key={index}
    //           className="grid grid-cols-4 items-center bg-[#FFFDFA] text-[#666664] rounded-[14px] h-[84px] py-4 px-6 shadow-sm text-2xl "
    //         >
    //           <span className="font-medium">{order.id}</span>
    //           <span>{order.date}</span>
    //           <span className="text-[#98C1A9] font-semibold">
    //             {order.amount}
    //           </span>
    //           <span
    //             className={`font-[500] text-[24px] ${
    //               order.status === "Delivered"
    //                 ? "text-[#666664]"
    //                 : "text-red-500"
    //             }`}
    //           >
    //             {order.status}
    //           </span>
    //         </div>
    //       ))}
    //     </div>

    //     {/* Load More Button */}
    //     <div className="flex justify-center pt-4">
    //       <button
    //         type="button"
    //         className="w-[381px] h-[52px] border cursor-pointer border-[#98C1A9] text-[#98C1A9] font-semibold text-[15px] rounded-[10px] hover:bg-[#98C1A9] hover:text-white transition"
    //       >
    //         Load More
    //       </button>
    //     </div>
    //   </section>
    // </div>
    <>
      <div className="flex  mt-5">
        <section
          className="
          w-full rounded-[14px] overflow-x-auto scrollbar-green
        "
        >
          <div className="min-w-[700px]">
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
                  className="grid grid-cols-4 items-center bg-[#FFFDFA] text-[#666664] rounded-[14px] h-[84px] py-4 px-6 shadow-sm text-2xl"
                >
                  <span className="font-medium">{order.id}</span>
                  <span>{order.date}</span>
                  <span className="text-[#98C1A9] font-semibold">
                    {order.amount}
                  </span>
                  <span
                    className={`font-[500] text-[24px] ${
                      order.status === "Delivered"
                        ? "text-[#666664]"
                        : "text-red-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Load More Button */}
      <div className="flex justify-center pt-4">
        <button
          type="button"
          className="lg:w-[381px] w-[240px] h-[52px] border-[1.97px] cursor-pointer border-[#98C1A9] text-[#98C1A9] 
          font-[700] text-[17px] leading-[25.36px] rounded-[10px] hover:bg-[#98C1A9] hover:text-white transition"
        >
          Load More
        </button>
      </div>
    </>
  );
};

export default OrderHistory;
