"use client";

import Checkbox from "@/components/common/checkbox";
import Input from "@/components/common/input";
import PrimaryButton from "@/components/common/primary-button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useProfile } from "@/contexts/profile-context";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import toast, {Toaster} from "react-hot-toast";

interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>();
  const router = useRouter();

  const { login } = useProfile();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      toast.dismiss();
      await login(data.email, data.password);

      toast.success("Login successful!");
      router.replace("/");
      reset();
    } catch (error: any) {
      const message =
        error?.response?.data?.error?.email?.[0] ||
        error?.response?.data?.message ||
        "Invalid credentials. Please check your email or password.";

      toast.error(message);
    }
  };

  return (
    <div className="center-col items-start w-full">
      <Toaster position="top-right" />
      {/* Header */}
      <div className="center-col items-start space-y-[16px]">
        <h1 className="font-albert-sans font-semibold lg:text-[40px] text-[28px] leading-[100%] tracking-[0] text-[#313131]">
          Login
        </h1>
        <p className="font-albert-sans opacity-75 font-[400] lg:text-[16px] text-[12px] leading-[100%] tracking-[0] text-[#313131]">
          Login to access your account
        </p>
      </div>
      {/* Form */}
      <form
        method="post"
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[80%] max-md:max-w-full space-y-[24px] mt-10"
      >
        {/* Email */}
        <div className="space-y-0.5">
          <Input
            label="email"
            type="email"
            placeholder="Example@gmail.com"
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

        {/* Password */}
        <div className="space-y-0.5">
          <Input
            type="password"
            label="password"
            placeholder="•••••••••••••••••••••••••"
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

        {/* Remember + Forgot Password */}
        <div className="center-between">
          <Checkbox label="Remember me" {...register("remember")} />
          <Link
            href="/forgot-password"
            className="text-primary font-medium hover:underline capitalize lg:text-[14px] text-[12px] leading-[100%]"
          >
            Forgot password
          </Link>
        </div>

        {/* Submit */}
        <div className="center-col space-y-[16px]">
          <PrimaryButton
            type="submit"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </PrimaryButton>

          <p className="text-sm text-[#313131] font-[500] ">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-primary hover:underline font-medium"
            >
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
