"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Image from "next/image";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddressModal({ open, onClose }: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="rounded-2xl
   w-full         
    max-w-sm      
    sm:max-w-md     
    md:max-w-2xl     
    lg:max-w-2xl      
    xl:max-w-2xl     
    2xl:max-w-2xl  
        overflow-auto  
  "
      >
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center ">
            <h3 className="text-[18.86px] leading-[15.72px] font-albert-sans tracking-[4%] lg:text-[36px] font-[500] text-[#666664]">
              Address
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-full cursor-pointer"
            >
              <Image
                src="/assets/account/icon-cancel.png"
                alt="close"
                width={64}
                height={64}
                className="w-[19px] h-[19px] lg:w-[64px] lg:h-[64px]"
              />
            </button>
          </DialogTitle>
        </DialogHeader>

        <form className="flex flex-col gap-[10.96px] lg:gap-[20px] w-full ">
          {/* Row 1: Full Name + Last Name */}
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-[20px]">
            <div className="flex flex-col">
              <label className="text-[#666664]/40 text-[17px] font-medium mb-1 hidden lg:block">
                First Name<span className="text-red-500/40">*</span>
              </label>
              <input
                type="text"
                placeholder="First Name"
                required
                className="border text-[#666664]
                     bg-[#F5F5F5]   
    placeholder:text-gray-400
lg:placeholder-transparent
                    w-full h-[52px] rounded-[14px] px-4 py-2 text-sm focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[#666664]/40 text-[17px] font-medium mb-1 hidden lg:block">
                Last Name<span className="text-red-500/40">*</span>
              </label>
              <input
                type="text"
                placeholder="Last Name"
                required
                className="border  text-[#666664]
                     bg-[#F5F5F5]   placeholder:text-gray-400
  lg:placeholder-transparent
                    w-full h-[52px] rounded-[14px] px-4 py-2 text-sm focus:outline-none"
              />
            </div>
          </div>

          {/* Row 2: Line 1 + Line 2 */}
          <div className="grid  lg:grid-cols-2 grid-cols-1  gap-[20px]">
            <div className="flex flex-col">
              <label className="text-[#666664]/40 text-[17px] font-medium mb-1 hidden lg:block">
                Line 1<span className="text-red-500/40">*</span>
              </label>
              <input
                type="text"
                placeholder="Line 1"
                required
                className="border  text-[#666664]
                     bg-[#F5F5F5]  placeholder:text-gray-400
  lg:placeholder-transparent
                    w-full h-[52px] rounded-[14px] px-4 py-2 text-sm focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[#666664]/40 text-[17px] font-medium mb-1 hidden lg:block">
                Line 2<span className="text-red-500/40">*</span>
              </label>
              <input
                type="text"
                placeholder="Line 2"
                className="border text-[#666664]
                     bg-[#F5F5F5]  placeholder:text-gray-400
 lg:placeholder-transparent
                    w-full h-[52px] rounded-[14px] px-4 py-2 text-sm focus:outline-none"
              />
            </div>
          </div>

          {/* Row 3: Prefecture + Postal Code */}
          <div className="grid  lg:grid-cols-2 grid-cols-1  gap-[20px]">
            <div className="flex flex-col">
              <label className="text-[#666664]/40 text-[17px] font-medium mb-1 hidden lg:block">
                Prefecture<span className="text-red-500/40">*</span>
              </label>
              <input
                type="text"
                placeholder="Prefecture"
                required
                className="border  text-[#666664]
                     bg-[#F5F5F5]  placeholder:text-gray-400
  lg:placeholder-transparent
                    w-full h-[52px] rounded-[14px] px-4 py-2 text-sm focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[#666664]/40 text-[17px] font-medium mb-1 hidden lg:block">
                Postal Code<span className="text-red-500/40">*</span>
              </label>
              <input
                type="text"
                placeholder="Postal Code"
                required
                className="border text-[#666664]
                     bg-[#F5F5F5]  placeholder:text-gray-400
lg:placeholder-transparent
                    w-full h-[52px] rounded-[14px] px-4 py-2 text-sm focus:outline-none"
              />
            </div>
          </div>

          {/* Telephone */}
          <div className="flex flex-col w-full">
            <label className="text-[#666664]/40 text-[17px] font-medium mb-1 hidden lg:block">
              Telephone<span className="text-red-500/40">*</span>
            </label>
            <input
              type="tel"
              placeholder="Telephone"
              required
              className="border  text-[#666664]
                     bg-[#F5F5F5]  placeholder:text-gray-400
 lg:placeholder-transparent
                    w-full h-[52px] rounded-[14px] px-4 py-2 text-sm focus:outline-none"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col w-full">
            <label className="text-[#666664]/40 text-[17px] font-medium mb-1 hidden lg:block">
              Email Address (Optional)
              <span className="text-red-500/40">*</span>
            </label>
            <input
              type="email"
              placeholder="Email (Optional)"
              className="border text-[#666664]
                     bg-[#F5F5F5]   placeholder:text-gray-400
lg:placeholder-transparent
                    w-full h-[52px] rounded-[14px] px-4 py-2 text-sm focus:outline-none"
            />
          </div>

          {/* Save button (center) */}
          <div className="flex justify-center gap-5">
            <button
              type="submit"
              className="bg-[#98C1A9] w-full lg:w-[541px] h-[41.21437454223633px] lg:h-[53px] 
                hover:bg-[#82ab94] hover:text-white  text-white px-8 lg:py-2 py-[7.17px] rounded-[14px]
                text-[15.15px] uppercase
                lg:text-[24px]  cursor-pointer "
            >
              Save
            </button>
          </div>
        </form>

        {/* <DialogFooter className="flex justify-center gap-3 pt-4"></DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
