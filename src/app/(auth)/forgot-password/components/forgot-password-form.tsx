"use client";

import { useForm } from "react-hook-form";
import BackButton from "@/components/common/back-button";
import Input from "@/components/common/input";
import PrimaryButton from "@/components/common/primary-button";
import { useProfile } from "@/contexts/profile-context";
import toast, { Toaster } from "react-hot-toast";

interface ForgotPasswordValues {
  email: string;
}

const ForgotPasswordForm = () => {
  const { forgotPassword, loading } = useProfile();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordValues>();

  const onSubmit = async (data: ForgotPasswordValues) => {
    try {
      await forgotPassword(data.email);
      toast.success("Verification code sent to your email.");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to send reset email.");
    }
  };

  return (
    <div className="center-col items-start relative w-full">
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
        href="/login"
        label="back to login"
        className="mb-5  max-md:static max-md:mb-5 max-md:-ml-2 font-albert-sans font-[500] text-[12px] lg:text-[14px] leading-[100%] tracking-[0%] text-[#AFB1AE]"
      />

      <div className="center-col items-start space-y-[16px]">
        <h1 className="font-albert-sans font-semibold lg:text-[40px] text-[28px] leading-[100%] tracking-[0] text-[#AFB1AE]">
          Forgot your password?
        </h1>
        <p className="w-full lg:max-w-[512px] font-albert-sans opacity-75 font-[400] lg:text-[16px] text-[12px] leading-[120%] tracking-[0%] text-[#AFB1AE]">
          Don&apos;t worry, happens to all of us. Enter your email below to
          recover your password.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[100%] max-md:max-w-full space-y-5 mt-10"
      >
        <div className="space-y-0.5">
          <Input
            type="email"
            label="email"
            placeholder=""
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            })}
          />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email.message}</span>
          )}
        </div>

        <PrimaryButton type="submit" loading={loading} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </PrimaryButton>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
