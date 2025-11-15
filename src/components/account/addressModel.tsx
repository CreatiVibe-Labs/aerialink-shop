"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import Input from "@/components/common/input";
import PhoneInput from "@/components/common/phone-input";
import PrimaryButton from "@/components/common/primary-button";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onSave?: (data: AddressFormData) => Promise<void>;
}

interface AddressFormData {
  name: string;
  phone_number: string;
  address1: string;
  postal_code: string;
  default: boolean;
}

export default function AddressModal({ open, onClose, onSave }: ModalProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<AddressFormData>({
    defaultValues: {
      name: "",
      phone_number: "",
      address1: "",
      postal_code: "",
      default: false,
    },
  });

  const onSubmit = async (data: AddressFormData) => {
    if (onSave) {
      await onSave(data);
    }
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };
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
              Add Address
            </h3>
            <button
              onClick={handleClose}
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

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[10.96px] lg:gap-[20px] w-full ">
          {/* Full Name */}
          <div className="flex flex-col">
            <label className="text-[#666664]/40 text-[17px] font-medium mb-1 hidden lg:block">
              Full Name<span className="text-red-500/40">*</span>
            </label>
            <input
              type="text"
              placeholder="Full Name"
              {...register("name", { required: "Full name is required" })}
              className="border text-[#666664] bg-[#F5F5F5] placeholder:text-gray-400 lg:placeholder-transparent w-full h-[52px] rounded-[14px] px-4 py-2 text-sm focus:outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="flex flex-col">
            <Controller
              name="phone_number"
              control={control}
              rules={{
                required: "Phone number is required",
                validate: (val) =>
                  val.replace(/\D/g, "").length >= 8 || "Enter a valid phone number",
              }}
              render={({ field }) => (
                <div>
                  <label className="text-[#666664]/40 text-[17px] font-medium mb-1 hidden lg:block">
                    Phone Number<span className="text-red-500/40">*</span>
                  </label>
                  <PhoneInput
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.phone_number?.message}
                  />
                </div>
              )}
            />
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <label className="text-[#666664]/40 text-[17px] font-medium mb-1 hidden lg:block">
              Street Address<span className="text-red-500/40">*</span>
            </label>
            <input
              type="text"
              placeholder="Street Address"
              {...register("address1", { required: "Address is required" })}
              className="border text-[#666664] bg-[#F5F5F5] placeholder:text-gray-400 lg:placeholder-transparent w-full h-[52px] rounded-[14px] px-4 py-2 text-sm focus:outline-none"
            />
            {errors.address1 && (
              <p className="text-red-500 text-sm mt-1">{errors.address1.message}</p>
            )}
          </div>

          {/* Postal Code */}
          <div className="flex flex-col">
            <label className="text-[#666664]/40 text-[17px] font-medium mb-1 hidden lg:block">
              Postal Code<span className="text-red-500/40">*</span>
            </label>
            <input
              type="text"
              placeholder="Postal Code"
              {...register("postal_code", {
                required: "Postal code is required",
                pattern: {
                  value: /^[0-9]{4,10}$/,
                  message: "Enter a valid postal code",
                },
              })}
              className="border text-[#666664] bg-[#F5F5F5] placeholder:text-gray-400 lg:placeholder-transparent w-full h-[52px] rounded-[14px] px-4 py-2 text-sm focus:outline-none"
            />
            {errors.postal_code && (
              <p className="text-red-500 text-sm mt-1">{errors.postal_code.message}</p>
            )}
          </div>

          {/* Set as Default */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="default_address"
              {...register("default")}
              className="accent-light-gray size-4"
            />
            <label htmlFor="default_address" className="text-sm text-[#666664]">
              Set as default address
            </label>
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
