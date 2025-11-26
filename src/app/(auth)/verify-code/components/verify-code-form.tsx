"use client";

import { useForm } from "react-hook-form";
import BackButton from "@/components/common/back-button";
import Input from "@/components/common/input";
import PrimaryButton from "@/components/common/primary-button";
import Cookies from "js-cookie";
import { useProfile } from "@/contexts/profile-context";
import toast, { Toaster } from "react-hot-toast";
import { useRef, KeyboardEvent, ClipboardEvent } from "react";

interface VerifyCodeValues {
  code: string;
}

const VerifyCodeForm = () => {
  const { verifyOtp, resendOtp, loading } = useProfile();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VerifyCodeValues>();

  const email = Cookies.get("reset_email");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^[0-9]*$/.test(value)) {
      return;
    }

    if (value.length > 1) {
      value = value.charAt(0);
    }

    const inputs = inputRefs.current;
    if (inputs[index]) {
      inputs[index]!.value = value;
    }

    // Move to next input if value is entered
    if (value && index < 5 && inputs[index + 1]) {
      inputs[index + 1]?.focus();
    }

    // Update form value
    updateCodeValue();
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    const inputs = inputRefs.current;
    
    if (e.key === "Backspace") {
      if (!inputs[index]?.value && index > 0) {
        inputs[index - 1]?.focus();
      } else {
        inputs[index]!.value = "";
        updateCodeValue();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputs[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputs[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    
    if (/^[0-9]{6}$/.test(pastedData)) {
      const inputs = inputRefs.current;
      pastedData.split("").forEach((char, i) => {
        if (inputs[i]) {
          inputs[i]!.value = char;
        }
      });
      inputs[5]?.focus();
      updateCodeValue();
    }
  };

  const updateCodeValue = () => {
    const code = inputRefs.current.map(input => input?.value || "").join("");
    setValue("code", code);
  };

  const handleResend = async () => {
    if (!email) {
      toast.error("Session expired. Please request a new reset link.");
      return;
    }

    try {
      await resendOtp(email);
      toast.success("Verification code has been resent to your email.");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to resend code.");
    }
  };

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
      <Toaster position="top-right"
        toastOptions={{
          // Define default options
          className: '',
          duration: 5000,
          removeDelay: 1000,
          // Default options for specific types
          success: {
            duration: 5000,
          },
        }}
      />
      <BackButton
        href="/forgot-password"
        label="Change Email Address"
        className="mb-5 max-md:static max-md:mb-5 max-md:-ml-2 font-albert-sans font-[500] text-[12px] lg:text-[14px] leading-[100%] tracking-[0%] text-[#AFB1AE]"
      />

      <div className="center-col items-start space-y-3">
        <h1 className="font-albert-sans font-semibold lg:text-[40px] text-[28px]  leading-[100%] tracking-[0] text-[#AFB1AE]">
          Verify Code
        </h1>
        <p className="font-albert-sans opacity-75 font-[400]  lg:text-[16px] text-[12px] leading-[100%] tracking-[0] text-[#AFB1AE]">
          An authentication code has been sent to your email.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[100%] max-md:max-w-full space-y-5 mt-10"
      >
        <div className="space-y-3">
          <label className="block text-sm font-medium text-[#AFB1AE] capitalize">
            Enter Code
          </label>
          <div className="flex gap-2 md:gap-3">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="lg:w-12 w-10 h-10 lg:h-12 xl:w-20 xl:h-20 md:w-10 md:h-10 text-center md:text-[14px] lg:text-lg xl:text-2xl font-semibold border-2 border-[#E8E8E8] rounded-lg focus:border-primary focus:outline-none transition-colors"
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                disabled={loading}
              />
            ))}
          </div>
          <input type="hidden" {...register("code", {
            required: "Verification code is required",
            pattern: {
              value: /^[0-9]{6}$/,
              message: "Code must be 6 digits",
            },
          })} />
          {errors.code && (
            <span className="text-sm text-red-500">{errors.code.message}</span>
          )}
        </div>

        <p className="text-sm text-[#AFB1AE]  font-[500] ">
          Didn&apos;t get a code?{" "}
          <button
            type="button"
            className="text-primary font-medium hover:underline cursor-pointer disabled:opacity-50"
            onClick={handleResend}
            disabled={loading}
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
