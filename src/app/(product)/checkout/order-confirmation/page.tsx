"use client";

import React, { useRef } from "react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { MdOutlineCheck } from "react-icons/md";
import PDFReceipt from "./_components/pdf-receipt";
import { useSearchParams } from "next/navigation";

const OrderConfirmationPage = () => {
  const pdfRef = useRef<HTMLDivElement>(null);
  const params = useSearchParams();
  const paymentStatus = params.get("payment_status");
  console.log(paymentStatus);

  const handleDownloadPDF = async () => {
    if (!pdfRef.current) return;

    // Temporarily make the PDF div visible (off-screen) for capture
    const originalDisplay = pdfRef.current.style.display;
    const originalPosition = pdfRef.current.style.position;
    pdfRef.current.style.display = "block";
    pdfRef.current.style.position = "absolute";
    pdfRef.current.style.left = "-9999px"; // Move off-screen to avoid UI flicker

    // Select the check icon and download button (if present in PDF div)
    const checkIcon = pdfRef.current.querySelector(
      ".absolute-top-icon"
    ) as HTMLElement;
    const downloadButton = pdfRef.current.querySelector(
      ".download-button"
    ) as HTMLElement;

    // Store original styles
    const originalCheckIconStyles = checkIcon
      ? {
          position: checkIcon.style.position,
          top: checkIcon.style.top,
          transform: checkIcon.style.transform,
        }
      : null;
    const originalDownloadButtonDisplay = downloadButton?.style.display;

    // Adjust styles for PDF capture
    if (checkIcon) {
      checkIcon.style.position = "relative";
      checkIcon.style.top = "0";
      checkIcon.style.transform = "none";
    }
    if (downloadButton) {
      downloadButton.style.display = "none";
    }

    // Capture the canvas
    const canvas = await html2canvas(pdfRef.current, {
      scale: 2.5,
      useCORS: true,
      backgroundColor: "#ffffff",
      scrollX: 0,
      scrollY: 0,
      windowWidth: document.documentElement.offsetWidth,
    });

    // Restore original styles
    if (checkIcon && originalCheckIconStyles) {
      checkIcon.style.position = originalCheckIconStyles.position;
      checkIcon.style.top = originalCheckIconStyles.top;
      checkIcon.style.transform = originalCheckIconStyles.transform;
    }
    if (downloadButton) {
      downloadButton.style.display = originalDownloadButtonDisplay || "";
    }

    // Restore PDF div visibility and position
    pdfRef.current.style.display = originalDisplay;
    pdfRef.current.style.position = originalPosition;
    pdfRef.current.style.left = "0";

    // Generate PDF
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth - 6;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const positionY = (pageHeight - imgHeight) / 2;
    const y = positionY > 0 ? positionY : 5;

    pdf.addImage(imgData, "PNG", 3, y, imgWidth, imgHeight, "", "FAST");
    pdf.save("order_receipt.pdf");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 max-sm:p-2 pb-0 relative">
      {/* PDF div (hidden, with custom PDF styling) */}
      <PDFReceipt
        ref={pdfRef}
        orderNumber="000085752257"
        dateTime="16 Feb 2025, 13:22"
        paymentMethod="Bank Transfer"
        senderName="Antonio Roberto"
        totalPayment="$1,000"
      />

      {/* UI div (visible, with UI-specific styling) */}
      <div
        className="w-full max-w-2xl bg-white relative rounded-lg rounded-b-none"
        style={{
          boxShadow: "0px 11.55px 46.19px 0px #66666629",
        }}
      >
        <div className="flex justify-center absolute-top-icon absolute -top-10 max-sm:-top-5 left-1/2 transform -translate-x-1/2">
          <div className="bg-primary rounded-full p-2 text-7xl max-sm:text-5xl text-white">
            <MdOutlineCheck />
          </div>
        </div>

        <div className="p-6 text-center mt-12 flex flex-col items-center text-min-gray">
          <h2 className="text-2xl font-semibold mb-1">
            Thank you for your order!
          </h2>
          <p className="text-gray-600 mb-6">
            Your payment has been successfully done.
          </p>

          <hr className="border-[#EDEDED] w-1/2 mb-6" />

          <h3 className="text-lg font-medium mb-4">Total Payment</h3>
          <p className="text-3xl font-bold text-gray-800 mb-6">$1,000</p>

          <div className="grid grid-cols-2 gap-4 text-left text-sm w-[80%]  max-md:w-[90%] max-sm:w-full">
            <div className="border border-[#EDEDED] p-3 rounded-xl max-sm:text-sm">
              <p className="font-medium">Order Number</p>
              <p>000085752257</p>
            </div>
            <div className="border border-[#EDEDED] p-3 rounded-xl max-sm:text-sm">
              <p className="font-medium">Date/Time</p>
              <p>16 Feb 2025, 13:22</p>
            </div>
            <div className="border border-[#EDEDED] p-3 rounded-xl max-sm:text-sm">
              <p className="font-medium">Payment Method</p>
              <p>Bank Transfer</p>
            </div>
            <div className="border border-[#EDEDED] p-3 rounded-xl max-sm:text-sm">
              <p className="font-medium">Sender Name</p>
              <p>Antonio Roberto</p>
            </div>
          </div>

          <button
            onClick={handleDownloadPDF}
            className="mt-8 cursor-pointer download-button flex items-center justify-center w-full text-gray-700 hover:text-gray-900"
          >
            <span className="mr-2">
              <img
                src="/assets/icons/download.svg"
                alt="download"
                className="size-6"
              />
            </span>
            Get PDF Receipt
          </button>
        </div>
      </div>

      {/* Bottom wavy pattern */}
      <div
        className="w-full max-w-2xl relative"
        style={{
          padding: "0 0 17px 0",
          backgroundImage:
            "radial-gradient(circle 15px at 41% 100%, transparent 0%, transparent 99%, white 100%)",
          backgroundPosition: "0 bottom",
          backgroundSize: "40px",
          backgroundRepeat: "repeat-x",
        }}
      ></div>
    </div>
  );
};

export default OrderConfirmationPage;
