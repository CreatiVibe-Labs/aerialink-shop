"use client";

import { useForm } from "react-hook-form";
import BackButton from "@/components/common/back-button";
import Input from "@/components/common/input";
import PrimaryButton from "@/components/common/primary-button";
import Cookies from "js-cookie";
import { useProfile } from "@/contexts/profile-context";
import toast, {Toaster} from "react-hot-toast";

interface VerifyCodeValues {
  code: string;
}

const VerifyCodeForm = () => {
  const { verifyOtp, loading } = useProfile();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyCodeValues>();

  const email = Cookies.get("reset_email");

  const onSubmit = async (data: VerifyCodeValues) => {
    if (!email) {
      toast.error("Session expired. Please request a new reset link.");
      return;
    }

    try {
      await verifyOtp(email, data.code);
      toast.success("Code verified successfully.");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Invalid or expired code.");
    }
  };

  return (
    <div className="center-col items-start w-full relative">
      <Toaster position="top-right" />
      <BackButton
        href="/login"
        label="Change Email Address"
        className="mb-5 max-md:static max-md:mb-5 max-md:-ml-2 font-albert-sans font-[500] text-[12px] lg:text-[14px] leading-[100%] tracking-[0%] text-[#313131]"
      />

      <div className="center-col items-start space-y-3">
        <h1 className="font-albert-sans font-semibold lg:text-[40px] text-[28px]  leading-[100%] tracking-[0] text-[#313131]">
          Verify Code
        </h1>
        <p className="font-albert-sans opacity-75 font-[400]  lg:text-[16px] text-[12px] leading-[100%] tracking-[0] text-[#313131]">
          An authentication code has been sent to your email.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[80%] max-md:max-w-full space-y-5 mt-10"
      >
        <div className="space-y-0.5">
          <Input
            type="text"
            label="Enter Code"
            placeholder="7789BM6X"
            maxLength={6}
            {...register("code", {
              required: "Verification code is required",
              pattern: {
                value: /^[0-9]{6}$/,
                message: "Code must be 6 digits",
              },
            })}
          />
          {errors.code && (
            <span className="text-sm text-red-500">{errors.code.message}</span>
          )}
        </div>

        <p className="text-sm text-[#313131]  font-[500] ">
          Didn&apos;t get a code?{" "}
          <button
            type="button"
            className="text-primary font-medium hover:underline cursor-pointer"
            onClick={() => toast.info("Resend code clicked")}
          >
            Resend
          </button>
        </p>

        <PrimaryButton type="submit" loading={loading} disabled={loading}>
          {loading ? "Verifying..." : "Verify"}
        </PrimaryButton>
      </form>
    </div>
  );
};

export default VerifyCodeForm;
