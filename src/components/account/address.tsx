"use client";
import React, { useState } from "react";
import Image from "next/image";

const DeliveryAddress: React.FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);

  return (
    <div className="w-full max-w-[1013px] mx-auto my-10">
      {/* Address Boxes */}
      <div className="flex flex-wrap gap-6">
        {/* Add Address Box */}
        <div
          onClick={() => setShowForm(true)}
          className="w-[319px] h-[257px] border-2 border-dashed border-[#98C1A9] rounded-[16.21px] flex flex-col justify-center items-center text-[#98C1A9] cursor-pointer hover:bg-[#98C1A9]/10 transition"
        >
          <span className="text-7xl font-light leading-none">+</span>
          <p className="mt-2 text-[28px]">Add Address</p>
        </div>

        {/* Default Address Box */}
        <div className="w-[319px] h-[257px] bg-white rounded-xl border border-[#98C1A9] shadow-sm overflow-hidden flex flex-col">
          {/* Default Header */}
          <div className="bg-[#98C1A9] flex items-center text-white h-[37px] text[16px] pl-[9px] font-medium">
            Default
          </div>

          {/* Address Info */}
          <div className="flex flex-col justify-between flex-grow p-4 ">
            <div>
              <h3 className="text-[#666664] font-semibold text-[20px]">Name</h3>
              <p className="text-[#666664] font-semibold text-[20px]  leading-snug">
                Address
              </p>
              <p className="text-[#666664] font-semibold text-[20px] ">
                Telephone
              </p>
              <p className="text-[#98C1A9] font-semibold text-[16px] mt-5 ">
                Add delivery instruction
              </p>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-4 gap-[19px]">
              {/* Edit Button */}
              <button
                type="button"
                className="flex items-center justify-center w-[133px] h-[38px] text-white border border-[#98C1A9] bg-[#98C1A9] px-4 py-1 rounded-[14px] text-[16px] font-medium cursor-pointer"
              >
                <Image
                  src="/assets/account/interface-edit-write.png"
                  alt="edit"
                  width={14}
                  height={14}
                />
                <span className="ml-2">Edit</span>
              </button>

              {/* Remove Button */}
              <button
                type="button"
                className="flex items-center justify-center w-[133px] h-[38px] text-white border border-[#98C1A9] bg-[#98C1A9] px-4 py-1 rounded-[14px] text-[16px] font-medium"
              >
                <Image
                  src="/assets/account/interface-delete-bin.png"
                  alt="delete"
                  width={14}
                  height={14}
                />
                <span className="ml-2">Remove</span>
              </button>
            </div>
          </div>
        </div>

        {/* Third Address Box */}
        <div className="w-[319px] h-[257px] bg-white rounded-xl border border-[#98C1A9] p-4 shadow-sm flex flex-col justify-between">
          <div>
            {/* Header Line */}
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-[#98C1A9] font-semibold text-[16px]">
                Address
              </h3>
              <button className="text-[#98C1A9] text-[16px] underline font-medium hover:text-[#7CAB91] transition">
                Set as default
              </button>
            </div>

            {/* Address Info */}
            <p className="text-[#666664] font-semibold text-[20px]">Name</p>
            <p className="text-[#666664] font-semibold text-[20px]">Address</p>
            <p className="text-[#666664] font-semibold text-[20px]">
              Telephone
            </p>

            <p className="text-[#98C1A9] font-semibold text-[16px] mt-5">
              Add delivery instruction
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-4 gap-[19px]">
            {/* Edit Button */}
            <button
              type="button"
              className="flex items-center justify-center w-[133px] h-[38px] text-white border border-[#98C1A9] bg-[#98C1A9] px-4 py-1 rounded-[14px] text-[16px] font-medium cursor-pointer"
            >
              <Image
                src="/assets/account/interface-edit-write.png"
                alt="edit"
                width={14}
                height={14}
              />
              <span className="ml-2">Edit</span>
            </button>

            {/* Remove Button */}
            <button
              type="button"
              className="flex items-center justify-center w-[133px] h-[38px] text-white border border-[#98C1A9] bg-[#98C1A9] px-4 py-1 rounded-[14px] text-[16px] font-medium"
            >
              <Image
                src="/assets/account/interface-delete-bin.png"
                alt="delete"
                width={14}
                height={14}
              />
              <span className="ml-2">Remove</span>
            </button>
          </div>
        </div>
      </div>
      {/* Add Address Form (Popup) */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl w-[1083px] h-[710px] shadow-lg border border-[#98C1A9] relative px-[43px] py-[18px] flex flex-col justify-center">
            {/* Header with title + close icon */}
            <div className="flex justify-between items-center mb-[20px]">
              <h3 className="text-[36px] font-semibold text-[#666664]">
                Address
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="p-2  rounded-full cursor-pointer "
              >
                <Image
                  src="/assets/account/icon-cancel.png"
                  alt="close"
                  width={64}
                  height={64}
                />
              </button>
            </div>

            <form className="flex flex-col gap-[20px]">
              {/* Row 1: Full Name + Last Name */}
              <div className="grid grid-cols-2 gap-[20px]">
                <div className="flex flex-col">
                  <label className="text-[#666664]/40 text-[17px] font-medium mb-1">
                    Full Name<span className="text-red-500/40">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    required
                    className="border border-none bg-[#EBECF0] w-full h-[52px] rounded-[14px] px-4 py-2 text-sm focus:outline-none"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-[#666664]/40 text-[17px] font-medium mb-1">
                    Last Name<span className="text-red-500/40">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    required
                    className="border border-none bg-[#EBECF0] w-full h-[52px] rounded-[14px] px-4 py-2 text-sm focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 2: Line 1 + Line 2 */}
              <div className="grid grid-cols-2 gap-[20px]">
                <div className="flex flex-col">
                  <label className="text-[#666664]/40 text-[17px] font-medium mb-1">
                    Line 1<span className="text-red-500/40">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    required
                    className="border border-none bg-[#EBECF0] w-full h-[52px] rounded-[14px] px-4 py-2 text-sm focus:outline-none"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-[#666664]/40 text-[17px] font-medium mb-1">
                    Line 2<span className="text-red-500/40">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    className="border border-none bg-[#EBECF0] w-full h-[52px] rounded-[14px] px-4 py-2 text-sm focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 3: Prefecture + Postal Code */}
              <div className="grid grid-cols-2 gap-[20px]">
                <div className="flex flex-col">
                  <label className="text-[#666664]/40 text-[17px] font-medium mb-1">
                    Prefecture<span className="text-red-500/40">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    required
                    className="border border-none bg-[#EBECF0] w-full h-[52px] rounded-[14px] px-4 py-2 text-sm focus:outline-none"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-[#666664]/40 text-[17px] font-medium mb-1">
                    Postal Code<span className="text-red-500/40">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    required
                    className="border border-none bg-[#EBECF0] w-full h-[52px] rounded-[14px] px-4 py-2 text-sm focus:outline-none"
                  />
                </div>
              </div>

              {/* Telephone */}
              <div className="flex flex-col w-full">
                <label className="text-[#666664]/40 text-[17px] font-medium mb-1">
                  Telephone<span className="text-red-500/40">*</span>
                </label>
                <input
                  type="tel"
                  placeholder=""
                  required
                  className="border border-none h-[52px] rounded-[14px] bg-[#EBECF0] px-4 py-2 text-sm focus:outline-none"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col w-full">
                <label className="text-[#666664]/40 text-[17px] font-medium mb-1">
                  Email Address (Optional)
                  <span className="text-red-500/40">*</span>
                </label>
                <input
                  type="email"
                  placeholder=""
                  className="border border-none h-[52px] rounded-[14px] bg-[#EBECF0] px-4 py-2 text-sm focus:outline-none"
                />
              </div>

              {/* Save button (center) */}
              <div className="flex justify-center gap-5">
                <button
                  type="submit"
                  className="bg-[#98C1A9] w-[541px] h-[53px] text-white px-8 py-2 rounded-[14px] text-[24px]  cursor-pointer "
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryAddress;
