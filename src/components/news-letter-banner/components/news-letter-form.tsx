"use client";
import { useForm } from "react-hook-form";
import { LuMail } from "react-icons/lu";
import NewsLetterFormButton from "./news-letter-form-button";
import { toast } from "react-hot-toast";

interface NewsletterForm {
  email: string;
}

const NewsLetterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterForm>();

  const onSubmit = async (data: NewsletterForm) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/news-letter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: data.email }),
        }
      );

      if (response.ok) {
        toast.success("Successfully subscribed to newsletter!");
        reset();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to subscribe. Please try again.");
        reset();
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full xl:max-w-[60%] lg:max-w-[60%] md:max-w-[70%] space-y-3"
    >
      {/* email input field */}
      <div className="bg-white rounded-full center justify-start px-3 height w-full max-md:min-h-10">
        <LuMail size={20} className="text-light-gray" />
        <input
          type="email"
          required
          placeholder="Enter your email address"
          className="outline-none px-3 placeholder:text-light-gray w-full max-sm:text-sm"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          })}
        />
      </div>
      {errors.email && (
        <p className="text-sm text-red-500 px-2">{errors.email.message}</p>
      )}

      {/* news letter submit button */}
      <NewsLetterFormButton isSubmitting={isSubmitting} />
    </form>
  );
};

export default NewsLetterForm;
