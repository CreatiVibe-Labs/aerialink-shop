"use client";

import { useForm } from "react-hook-form";
import BackButton from "@/components/common/back-button";
import Input from "@/components/common/input";
import PrimaryButton from "@/components/common/primary-button";
import { useProfile } from "@/contexts/profile-context";
import { toast } from "react-toastify";

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
      <BackButton
        href="/login"
        label="back to login"
        className="mb-5 max-md:static max-md:mb-5 max-md:-ml-2"
      />

      <div className="center-col items-start space-y-3">
        <h1 className="text-4xl font-medium">Forgot your password?</h1>
        <p className="text-light-gray">
          Don’t worry, happens to all of us. Enter your email below to recover
          your password.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[80%] max-md:max-w-full space-y-5 mt-10"
      >
        <div className="space-y-0.5">
          <Input
            type="email"
            placeholder="example@gmail.com"
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
