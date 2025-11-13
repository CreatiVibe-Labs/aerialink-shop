"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import AddressModal from "./addressModel";

const DeliveryAddress: React.FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);

  return (
    <>
      <div className="w-full my-10">
        {/* Address Boxes */}
        <div className="flex flex-wrap lg:gap-[26.62px] gap-[10.19px] w-full">
          {/* Add Address Box */}
          <div
            onClick={() => setShowForm(true)}
            className="w-full lg:w-[32%] lg:h-[257px] h-[200px] border-2 border-dashed border-[#98C1A9] rounded-[16.21px] flex flex-col justify-center items-center text-[#98C1A9] cursor-pointer hover:bg-[#98C1A9]/10 transition"
          >
            {/* <span className="text-7xl font-light leading-none">+</span> */}
            <Plus
              size={43}
              strokeWidth={1.5}
              className="opacity-100 text-[#98C1A9]"
            />
            <p className="mt-2 text-[28px] font-[600] text-[#98C1A9]">
              Add Address
            </p>
          </div>

          {/* Default Address Box */}
          <div className="w-full lg:w-[31%] lg:h-[257px] h-auto bg-white rounded-xl border border-[#98C1A9] shadow-sm overflow-hidden flex flex-col">
            {/* Default Header */}
            <div className="bg-[#98C1A9] flex items-center text-white h-[37px] text[16px] pl-[9px] font-medium">
              Default
            </div>

            {/* Address Info */}
            <div className="flex flex-col justify-between flex-grow p-4 ">
              <div>
                <h3 className="text-[#666664] font-semibold text-[20px]">
                  Name
                </h3>
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
          <div className="w-full lg:w-[31%] lg:h-[257px] h-auto bg-white rounded-xl border border-[#98C1A9] p-4 shadow-sm flex flex-col justify-between">
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
              <p className="text-[#666664] font-semibold text-[20px]">
                Address
              </p>
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
      </div>

      {/* Add Address Form (Popup) */}
      <AddressModal open={showForm} onClose={() => setShowForm(false)} />
    </>
  );
};

export default DeliveryAddress;
