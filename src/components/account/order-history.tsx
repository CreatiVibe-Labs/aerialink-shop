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
      <div className="flex mt-10">
        <section className="w-full max-w-6xl mx-auto rounded-[14px]">
          <div className="w-full max-w-6xl mx-auto">
            {/* Desktop Header Row */}
            <div className="hidden md:grid grid-cols-4 items-center h-[69px] bg-[#98C1A9] text-white font-medium text-[20px] rounded-[14px] py-3 px-6">
              <span>Invoice No</span>
              <span>Date</span>
              <span>Amount</span>
              <span>Status</span>
            </div>

            {/* Mobile View (Single Scroll Container) */}
            <div className="md:hidden w-full overflow-x-auto scrollbar-green pb-4">
              <div className="min-w-[500px]">
                {/* Mobile Header */}
                <div className="grid grid-cols-4 items-center h-[50px] bg-[#98C1A9] text-white font-medium text-[16px] rounded-[10px] px-4 mb-4">
                  <span>Invoice No</span>
                  <span>Date</span>
                  <span>Amount</span>
                  <span>Status</span>
                </div>

                {/* Mobile Rows */}
                <div className="flex flex-col gap-4">
                  {loading && orders.length === 0 ? (
                    <div className="text-center py-8 text-[#AFB1AE]">
                      Loading orders...
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-8 text-[#AFB1AE]">
                      No orders found
                    </div>
                  ) : (
                    orders.map((order, index) => (
                      <div
                        key={`mobile-${order.id}-${index}`}
                        className="grid grid-cols-4 items-center bg-white text-[#AFB1AE] rounded-[10px] h-[50px] px-4 shadow-sm text-[15px]"
                      >
                        <span className="font-medium">#{order.id}</span>
                        <span>{formatDate(order.created_at)}</span>
                        <span className="text-[#98C1A9] font-semibold">
                          {formatAmount(order.total)}
                        </span>
                        <span
                          className={`font-[500] ${formatStatus(order.status) === "Delivered"
                            ? "text-[#AFB1AE]"
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
                </div>
              </div>
            </div>

            {/* Desktop Orders List */}
            <div className="hidden md:flex flex-col gap-5 pt-2">
              {loading && orders.length === 0 ? (
                <div className="text-center py-8 text-[#AFB1AE]">
                  Loading orders...
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-8 text-[#AFB1AE]">
                  No orders found
                </div>
              ) : (
                orders.map((order, index) => (
                  <div
                    key={`desktop-${order.id}-${index}`}
                    className="grid grid-cols-4 items-center text-[#AFB1AE] rounded-[14px] h-[84px] py-4 px-6 shadow-sm text-2xl bg-white"
                  >
                    <span className="font-medium">#{order.id}</span>
                    <span>{formatDate(order.created_at)}</span>
                    <span className="text-[#98C1A9] font-semibold">
                      {formatAmount(order.total)}
                    </span>
                    <span
                      className={`font-[500] text-[24px] ${formatStatus(order.status) === "Delivered"
                        ? "text-[#AFB1AE]"
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
            </div>
          </div>
        </section>
      </div>

      {/* Load More Button */}
      <div className="flex justify-center pt-4">
        {hasMore && orders.length >= 5 && (
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
