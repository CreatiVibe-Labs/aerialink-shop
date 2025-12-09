import React, { forwardRef } from "react";
import { MdOutlineCheck } from "react-icons/md";

interface PDFReceiptProps {
  orderNumber: string;
  dateTime: string;
  paymentMethod: string;
  senderName: string;
  totalPayment: string;
}

const PDFReceipt = forwardRef<HTMLDivElement, PDFReceiptProps>(
  ({ orderNumber, dateTime, paymentMethod, senderName, totalPayment }, ref) => {
    return (
      <div
        ref={ref}
        className="bg-white"
        style={{
          display: "none",
          boxShadow: "0px 11.55px 46.19px 0px #66666629",
          fontFamily: "Arial, sans-serif",
          width: "210mm",
          height: "297mm",
          margin: "0 auto",
          padding: "20mm",
        }}
      >
        {/* Flex container for true vertical centering */}
        <div
          className="flex flex-col items-center justify-center"
          style={{ height: "100%", textAlign: "center" }}
        >
          <div className="flex justify-center mb-6">
            <div className="bg-primary rounded-full p-3 text-6xl text-white">
              <MdOutlineCheck />
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-2 text-[#AFB1AE]">Thank you for your order!</h2>
          <p className="text-[#AFB1AE] mb-6 text-lg">
            Your payment has been successfully done.
          </p>

          <hr className="border-gray-300 w-3/4 mb-6" />

          <h3 className="text-xl font-semibold mb-4 text-[#AFB1AE]">Total Payment</h3>
          <p className="text-4xl font-bold text-[#AFB1AE] mb-6">{totalPayment}</p>

          <div className="grid grid-cols-2 gap-4 text-left text-base w-[80%]">
            <div className="border border-gray-300 p-4 rounded-lg">
              <p className="font-semibold text-[#AFB1AE]">Order Number</p>
              <p className="text-[#AFB1AE]">{orderNumber}</p>
            </div>
            <div className="border border-gray-300 p-4 rounded-lg">
              <p className="font-semibold text-[#AFB1AE]">Date/Time</p>
              <p className="text-[#AFB1AE]">{dateTime}</p>
            </div>
            <div className="border border-gray-300 p-4 rounded-lg">
              <p className="font-semibold text-[#AFB1AE]">Payment Method</p>
              <p className="text-[#AFB1AE]">{paymentMethod}</p>
            </div>
            <div className="border border-gray-300 p-4 rounded-lg text-[#AFB1AE]">
              <p className="font-semibold text-[#AFB1AE]">Sender Name</p>
              <p className="text-[#AFB1AE]">{senderName}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

PDFReceipt.displayName = "PDFReceipt";

export default PDFReceipt;
