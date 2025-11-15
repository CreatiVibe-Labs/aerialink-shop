"use client";

import React, { useRef, useEffect, useState } from "react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { MdOutlineCheck } from "react-icons/md";
import PDFReceipt from "./_components/pdf-receipt";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

interface OrderItem {
  id: number;
  product_id: number;
  variant_id: number | null;
  quantity: number;
  price: string;
  product: {
    id: number;
    name: string;
    slug: string;
    main_image: string;
  };
  variant: {
    id: number;
    sku: string;
    attributes: Array<{
      attribute_name: string;
      attribute_value: string;
    }>;
  } | null;
}

const OrderConfirmationPage = () => {
  const pdfRef = useRef<HTMLDivElement>(null);
  const params = useSearchParams();
  const paymentStatus = params.get("payment_status");
  const status = params.get("status");
  const clearCart = params.get("clear_cart");

  const errorMessage = params.get("error");

  const orderId = params.get("order_id");
  const createdAt = params.get("created_at");
  const fullName = params.get("full_name");
  const totalAmount = params.get("total_amount");
  const paymentMethod = params.get("payment_method");
  const paymentType = params.get("payment_type");

  const finalPaymentMethod = (paymentMethod || "N/A") + ' - ' + (paymentType || "N/A");

  const [orderItems, setOrderItems] = useState<any[]>([]);

  // Get cart items before clearing
  useEffect(() => {
    const cartItemsStr = localStorage.getItem("cart_items");
    if (cartItemsStr) {
      try {
        const items = JSON.parse(cartItemsStr);
        setOrderItems(items);
      } catch (error) {
        // Silent error handling
      }
    }
  }, []);

  // Clear cart when order is successful (runs after getting items)
  useEffect(() => {
    if (status === "success" && clearCart === "true" ) {
      localStorage.removeItem("cart_items");
      window.dispatchEvent(new Event("storage"));
    }
  }, [status, clearCart]);

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
    <div className="py-10 pb-20 flex flex-col items-center justify-center p-4 max-sm:p-2 relative">
      {/* Error Message Display */}
      {status === "error" && errorMessage && (
        <div className="w-full max-w-4xl mb-6 bg-red-50 border-2 border-red-500 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-red-700 mb-3 flex items-center gap-2">
            <span className="text-3xl">⚠️</span> Order Creation Failed
          </h2>

          {(() => {
            try {
              const decodedMessage = decodeURIComponent(errorMessage);
              const jsonString = decodedMessage.replace(/^Order API Error \(\d+\): /, '');
              const errorData = JSON.parse(jsonString);

              return (
                <>
                  {/* Error Response */}
                  <div className="bg-white rounded-lg p-4 mb-4 border border-red-200">
                    <p className="text-red-700 font-bold mb-2 text-lg">🔴 API Error Response:</p>
                    <div className="bg-red-50 p-3 rounded border border-red-300">
                      <p className="font-semibold text-red-600 mb-1">
                        Status: {errorData.status || 'N/A'} - {errorData.statusText || 'N/A'}
                      </p>
                      <pre className="text-sm text-gray-800 whitespace-pre-wrap break-words mt-2">
                        {typeof errorData.error === 'string'
                          ? errorData.error
                          : JSON.stringify(errorData.error, null, 2)}
                      </pre>
                    </div>
                  </div>

                  {/* Payload Sent */}
                  {errorData.payload && (
                    <div className="bg-white rounded-lg p-4 mb-4 border border-blue-200">
                      <p className="text-blue-700 font-bold mb-2 text-lg">📦 Request Payload Sent:</p>
                      <div className="bg-blue-50 p-3 rounded border border-blue-300 max-h-96 overflow-y-auto">
                        <pre className="text-xs text-gray-800 whitespace-pre-wrap break-words font-mono">
                          {JSON.stringify(errorData.payload, null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}

                  {!errorData.payload && (
                    <div className="bg-orange-50 border border-orange-300 rounded-lg p-4 mb-4">
                      <p className="text-orange-700 font-semibold">⚠️ Payload not available in error data</p>
                      <p className="text-sm text-gray-600 mt-1">Check console logs for full error details</p>
                    </div>
                  )}
                </>
              );
            } catch (parseError) {
              return (
                <div className="bg-white rounded p-4 mb-4">
                  <p className="text-red-600 font-semibold mb-2">Raw Error Details:</p>
                  <pre className="text-sm text-gray-800 whitespace-pre-wrap break-words bg-gray-50 p-3 rounded border border-gray-200">
                    {decodeURIComponent(errorMessage)}
                  </pre>
                </div>
              );
            }
          })()}

          <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-700">
              <strong className="text-yellow-700">⚡ Important:</strong> Your payment was successful, but we encountered an error while creating your order in the system. Please contact support with the error details above.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                const fullError = decodeURIComponent(errorMessage);
                navigator.clipboard.writeText(fullError);
                alert("Error details copied to clipboard!");
              }}
              className="bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-red-700 font-semibold transition-colors"
            >
              📋 Copy Full Error
            </button>
            <button
              onClick={() => {
                try {
                  const errorData = JSON.parse(decodeURIComponent(errorMessage).replace(/^Order API Error \(\d+\): /, ''));
                  navigator.clipboard.writeText(JSON.stringify(errorData.payload, null, 2));
                  alert("Payload copied to clipboard!");
                } catch (e) {
                  alert("Could not copy payload");
                }
              }}
              className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 font-semibold transition-colors"
            >
              📦 Copy Payload Only
            </button>
          </div>
        </div>
      )}

      {/* PDF div (hidden, with custom PDF styling) */}
      <PDFReceipt
        ref={pdfRef}
        orderNumber={orderId || "N/A"}
        dateTime={createdAt || "N/A"}
        paymentMethod={finalPaymentMethod}
        senderName={fullName || "N/A"}
        totalPayment={totalAmount || "N/A"}
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
          <p className="text-3xl font-bold text-gray-800 mb-6">
            ¥
            {totalAmount
              ? Math.floor(parseFloat(totalAmount.toString().replace(/,/g, ""))).toLocaleString()
              : "N/A"}
          </p>

          <div className="grid grid-cols-2 gap-4 text-left text-sm w-[80%]  max-md:w-[90%] max-sm:w-full">
            <div className="border border-[#EDEDED] p-3 rounded-xl max-sm:text-sm">
              <p className="font-medium">Order Number</p>
              <p>{orderId || "N/A"}</p>
            </div>
            <div className="border border-[#EDEDED] p-3 rounded-xl max-sm:text-sm">
              <p className="font-medium">Date/Time</p>
              <p>{createdAt || "N/A"}</p>
            </div>
            <div className="border border-[#EDEDED] p-3 rounded-xl max-sm:text-sm">
              <p className="font-medium">Payment Method</p>
              <p className="capitalize">{finalPaymentMethod.replace(/_/g, " ")}</p>
            </div>
            <div className="border border-[#EDEDED] p-3 rounded-xl max-sm:text-sm">
              <p className="font-medium">Sender Name</p>
              <p>{fullName || "N/A"}</p>
            </div>
          </div>
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
