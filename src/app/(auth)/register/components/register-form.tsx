"use client";
import Checkbox from "@/components/common/checkbox";
import Input from "@/components/common/input";
import PrimaryButton from "@/components/common/primary-button";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { use, useState } from "react";
import { useProfile } from "@/contexts/profile-context";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/dist/client/components/navigation";
import PhoneInput from "@/components/account/registerphone-input";

interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>();

  const router = useRouter();

  const { register: registerUser } = useProfile();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const password = watch("password");

  const onSubmit = async (data: RegisterFormValues) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res = await registerUser(
        `${data.firstName} ${data.lastName}`.trim(),
        data.email,
        data.password,
        data.phone
      );

      toast.success("Account created successfully! Verification email has been sent.");
      reset();
      router.push("/login");
    } catch (error: any) {
      // Handle Laravel validation errors (422) or other errors
      console.log("Registration API Error:", error);
      const message =
        error?.error?.email?.[0] || // Extract email-specific error
        error?.response?.data?.message || // Fallback to general message
        "Registration failed. Please try again.";
      toast.error(message);
    }
  };

  return (
    <div className="center-col items-start w-full">
      <Toaster
        position="top-right"
        toastOptions={{
          // Define default options
          className: '',
          duration: 5000,
          removeDelay: 1000,
          success: {
            duration: 5000,
          },
        }}
      />
      {/* header */}
      <div className="center-col items-start space-y-3  mt-0 " >
        <h1 className="font-albert-sans font-semibold text-[28px] lg:text-[40px] leading-[100%] tracking-[0] text-[#AFB1AE]">
          Register
        </h1>
        {/* <p className="text-light-gray">Create your new account</p> */}
      </div>
      {/* form */}
      <form
        method="post"
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[100%] max-xl:max-w-full space-y-5 mt-10
          "
      >
        {/* First and Last name */}
        <div className="grid grid-cols-2 max-md:grid-cols-1 md:gap-3 gap-5">
          <div className="space-y-0.5">
            <Input
              type="text"
              className="text-[#AFB1AE] border border-gray-300"
              label="first name"
              placeholder=""
              {...register("firstName", { required: "First name is required" })}
            />
            {errors.firstName && (
              <span className="text-sm text-red-500">
                {errors.firstName.message}
              </span>
            )}
          </div>
          <div className="space-y-0.5">
            <Input
              type="text"
              className="text-[#AFB1AE] border border-gray-300"
              label="Last Name"
              placeholder=""
              {...register("lastName")}
            />
          </div>
        </div>

        {/* Email and Phone */}
        <div className="grid grid-cols-2 max-md:grid-cols-1 md:gap-3 gap-5">
          <div className="space-y-0.5">
            <Input
            className="text-[#AFB1AE] border border-gray-300"
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
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="space-y-0.5">
            <Controller
          
              name="phone"
              control={control}
              rules={{
                required: "Phone number is required",
                validate: (val) => val.replace(/\D/g, "").length >= 8 || "Enter a valid phone number",
              }}
              render={({ field }) => (
                <div>
                  <PhoneInput
                    value={field.value || ""}
                    onChange={(e) => field.onChange((e.target as HTMLInputElement).value)}
                  />
                  {errors.phone && (
                    <span className="text-sm text-red-500">{errors.phone.message}</span>
                  )}
                </div>
              )}
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-0.5">
          <Input
            className="text-[#AFB1AE] border border-gray-300"
            type="password"
            label="password"
            placeholder=""
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <span className="text-sm text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-0.5">
          <Input
            className="text-[#AFB1AE] border border-gray-300"
            type="password"
            label="confirm password"
            placeholder=""
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <span className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        {/* Terms checkbox */}
        <div className="flex items-center gap-2">
          <Checkbox
            label={
              <>
                I agree to all the{" "}
                <span className="text-primary cursor-pointer">Terms</span> and{" "}
                <span className="text-primary cursor-pointer">
                  Privacy Policies
                </span>
              </>
            }
            {...register("terms", {
              required: "You must agree before creating an account",
            })}
          />
        </div>
        {errors.terms && (
          <span className="text-sm text-red-500">{errors.terms.message}</span>
        )}

        {/* Error / Success messages */}
        {errorMessage && (
          <p className="text-sm text-red-500 font-medium">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-sm text-green-600 font-medium">{successMessage}</p>
        )}

        {/* form bottom */}
        <div className="center-col space-y-[16px]">
          <PrimaryButton
            type="submit"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </PrimaryButton>

          <p className="text-sm text-[#AFB1AE]  font-[600] ">
            Already have an account?{" "}
            <Link
              href={"/login"}
              className="text-primary hover:underline font-[600]"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
