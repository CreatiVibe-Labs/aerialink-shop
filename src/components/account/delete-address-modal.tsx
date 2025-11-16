"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

interface DeleteAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  addressName?: string;
}

const DeleteAddressModal: React.FC<DeleteAddressModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  addressName,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-2xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl p-6">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <h3 className="text-[18.86px] leading-[15.72px] font-albert-sans tracking-[4%] lg:text-[28px] font-[500] text-[#666664]">
              Delete Address
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-full cursor-pointer hover:bg-gray-100 transition"
            >
              <Image
                src="/assets/account/icon-cancel.png"
                alt="close"
                width={48}
                height={48}
                className="w-[16px] h-[16px] lg:w-[48px] lg:h-[48px]"
              />
            </button>
          </DialogTitle>
        </DialogHeader>

        <div className="py-6">
          <p className="text-[#666664] text-[16px] lg:text-[18px] text-center">
            Are you sure you want to delete this address?
          </p>
          {addressName && (
            <p className="text-[#98C1A9] font-semibold text-[18px] lg:text-[20px] text-center mt-2">
              {addressName}
            </p>
          )}
          <p className="text-[#666664] text-[14px] lg:text-[16px] text-center mt-4 opacity-70">
            This action cannot be undone.
          </p>
        </div>

        <div className="flex justify-center gap-4 lg:gap-6">
          <button
            type="button"
            onClick={onClose}
            className="w-[140px] lg:w-[180px] h-[42px] lg:h-[50px] border-[1.5px] border-[#98C1A9] text-[#98C1A9] 
              rounded-[14px] text-[15px] lg:text-[17px] font-semibold hover:bg-[#98C1A9]/10 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="w-[140px] lg:w-[180px] h-[42px] lg:h-[50px] bg-[#98C1A9] text-white 
              rounded-[14px] text-[15px] lg:text-[17px] font-semibold hover:bg-[#7CAB91] transition cursor-pointer"
          >
            Confirm
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAddressModal;
