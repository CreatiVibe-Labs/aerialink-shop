"use client";

import { useForm } from "react-hook-form";
import BackButton from "@/components/common/back-button";
import Input from "@/components/common/input";
import PrimaryButton from "@/components/common/primary-button";
import Cookies from "js-cookie";
import { useProfile } from "@/contexts/profile-context";
import toast, {Toaster} from "react-hot-toast";

interface NewPasswordValues {
  newPassword: string;
  confirmPassword: string;
}

const NewPasswordForm = () => {
  const { resetPassword, loading } = useProfile();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NewPasswordValues>();

  const email = Cookies.get("reset_email");
  const otp = Cookies.get("reset_otp");
  const newPassword = watch("newPassword");

  const onSubmit = async (data: NewPasswordValues) => {
    if (!email || !otp) {
      toast.error("Session expired. Please start over.");
      return;
    }

    try {
      await resetPassword(email, otp, data.newPassword, data.confirmPassword);
      toast.success("Password reset successfully. You can now log in.");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Password reset failed.");
    }
  };

  return (
    <div className="center-col items-start w-full relative">
<<<<<<< Updated upstream
      <BackButton
=======
      <Toaster position="top-right" />
      {/* <BackButton
>>>>>>> Stashed changes
        href="/login"
        label="back to login"
        className="absolute top-5 max-md:static max-md:mb-5 max-md:-ml-2"
      />

      <div className="center-col items-start space-y-3">
        <h1 className="text-4xl font-medium">Set New Password</h1>
        <p className="text-light-gray">
          Please enter your new password and confirm it below.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[80%] max-md:max-w-full space-y-5 mt-10"
      >
        <div className="space-y-0.5">
          <Input
            type="password"
            placeholder="Enter new password"
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.newPassword && (
            <span className="text-sm text-red-500">
              {errors.newPassword.message}
            </span>
          )}
        </div>

        <div className="space-y-0.5">
          <Input
            type="password"
            placeholder="Confirm new password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === newPassword || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <span className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <PrimaryButton type="submit" loading={loading} disabled={loading}>
          {loading ? "Updating..." : "Update Password"}
        </PrimaryButton>
      </form>
    </div>
  );
};

export default NewPasswordForm;
