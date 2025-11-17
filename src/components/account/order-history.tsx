"use client";
import React from "react";
import { useOrders } from "@/contexts/order-context";

const OrderHistory = () => {
  const { orders, loading, hasMore, loadMore } = useOrders();

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).replace(/\//g, "-");
  };

  const formatAmount = (amount: number) => {
    const numAmount = Number(amount);
    if (isNaN(numAmount)) return "0";
    return `$${numAmount.toFixed(0)}`;
  };

  const formatStatus = (status: string) => {
    const statusMap: { [key: string]: string } = {
      completed: "Delivered",
      cancelled: "Cancelled",
      pending: "Pending",
      processing: "Processing",
      delivered: "Delivered",
    };
    return statusMap[status.toLowerCase()] || status;
  };

  // (Reverted) No mobile slider; simple responsive layout only

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
      <div className="flex mt-5">
        <section
          className="w-full max-w-6xl mx-auto rounded-[14px] overflow-x-auto scrollbar-green"
        >
          <div className="w-full max-w-6xl mx-auto">
            {/* Header Row */}
            <div className="hidden md:grid grid-cols-4 items-center h-[69px] bg-[#98C1A9] text-white font-medium text-[20px] rounded-[14px] py-3 px-6">
              <span>Invoice No</span>
              <span>Date</span>
              <span>Amount</span>
              <span>Status</span>
            </div>

            {/* Orders List */}
<<<<<<< Updated upstream
            <div className="flex flex-col gap-5 pt-2">
              {loading && orders.length === 0 ? (
                <div className="text-center py-8 text-[#666664]">Loading orders...</div>
              ) : orders.length === 0 ? (
                <div className="text-center py-8 text-[#666664]">No orders found</div>
              ) : (
                orders.map((order, index) => (
                  <div
                    key={`${order.id}-${index}`}
                    className="grid grid-cols-4 items-center bg-[#FFFDFA] text-[#666664] rounded-[14px] h-[84px] py-4 px-6 shadow-sm text-2xl"
                  >
                    <span className="font-medium">#{order.id}</span>
                    <span>{formatDate(order.created_at)}</span>
                    <span className="text-[#98C1A9] font-semibold">
                      {formatAmount(order.total)}
                    </span>
                    <span
                      className={`font-[500] text-[24px] ${
                        formatStatus(order.status) === "Delivered"
                          ? "text-[#666664]"
                          : formatStatus(order.status) === "Cancelled"
                          ? "text-red-500"
                          : "text-[#98C1A9]"
                      }`}
                    >
                      {formatStatus(order.status)}
                    </span>
                  </div>
                ))
              )}
=======
            <div className="flex flex-col gap-5 pt-2 ">
              {orders.map((order, index) => (
                <div
                  key={index}
                  className="bg-[#FFFDFA] text-[#666664] rounded-[14px] h-auto md:h-[84px] py-4 px-4 md:px-6 shadow-sm text-base md:text-2xl grid md:grid-cols-4 gap-2"
                >
                  <div>
                    <span className="md:hidden block text-xs text-gray-500">Invoice No</span>
                    <span className="font-medium block md:inline">{order.id}</span>
                  </div>
                  <div>
                    <span className="md:hidden block text-xs text-gray-500">Date</span>
                    <span className="block md:inline">{order.date}</span>
                  </div>
                  <div>
                    <span className="md:hidden block text-xs text-gray-500">Amount</span>
                    <span className="text-[#98C1A9] font-semibold block md:inline">{order.amount}</span>
                  </div>
                  <div>
                    <span className="md:hidden block text-xs text-gray-500">Status</span>
                    <span
                      className={`font-[500] text-base md:text-[24px] ${
                        order.status === "Delivered" ? "text-[#666664]" : "text-red-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
>>>>>>> Stashed changes
            </div>
          </div>
        </section>
      </div>

      {/* Load More Button */}
      <div className="flex justify-center pt-4">
        {hasMore && orders.length > 0 && (
          <button
            type="button"
            onClick={loadMore}
            disabled={loading}
            className="lg:w-[381px] w-[240px] h-[52px] border-[1.97px] cursor-pointer border-[#98C1A9] text-[#98C1A9] 
          font-[700] text-[17px] leading-[25.36px] rounded-[10px] hover:bg-[#98C1A9] hover:text-white transition disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        )}
      </div>
    </>
  );
};

export default OrderHistory;
