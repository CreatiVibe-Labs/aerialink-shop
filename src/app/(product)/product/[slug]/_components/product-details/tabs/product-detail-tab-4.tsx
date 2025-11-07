"use client";
import Checkbox from "@/components/common/checkbox";
import PrimaryButton from "@/components/common/primary-button";
import { useProducts } from "@/contexts/product-context";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/api";

// Zod Schema
const reviewSchema = z.object({
  rating: z.number().min(1, "Please select a rating"),
  comment: z.string().min(10, "Review must be at least 10 characters"),
  firstName: z.string().min(2, "First name is required"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  saveInfo: z.boolean().optional(),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

const ProductDetailTab4 = () => {
  const { state } = useProducts();
  const { product } = state;

  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    watch,
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    mode: "onChange",
  });

  // Watch saveInfo to save to localStorage
  const saveInfo = watch("saveInfo");

  // Load saved info
  React.useEffect(() => {
    const savedName = localStorage.getItem("reviewer_name");
    const savedEmail = localStorage.getItem("reviewer_email");
    if (savedName) setValue("firstName", savedName);
    if (savedEmail) setValue("email", savedEmail);
  }, [setValue]);

  // Save info if checked
  React.useEffect(() => {
    if (saveInfo) {
      const name = watch("firstName");
      const email = watch("email");
      if (name) localStorage.setItem("reviewer_name", name);
      if (email) localStorage.setItem("reviewer_email", email);
    }
  }, [saveInfo, watch]);

  // Submit handler
  const onSubmit = async (data: ReviewFormData) => {
    if (!product?.id) {
      toast.error("Product not found");
      return;
    }

    setLoading(true);

    const payload = {
      rating,
      comment: data.comment,
      first_name: data.firstName,
      email: data.email || undefined,
    };

    try {
      const res = await api.post(`/products/${product.id}/reviews`, payload);

      if (res.status === 201 || res.status === 200) {
        toast.success("Review submitted successfully!");
        reset();
        setRating(0);
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || "Failed to submit review";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 text-min-gray max-w-3xl"
    >
      {/* Rating */}
      <div>
        <p className="font-medium mb-2">Your rating *</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              onClick={() => {
                setRating(star);
                setValue("rating", star, { shouldValidate: true });
              }}
              className={`cursor-pointer text-2xl transition-colors ${
                rating >= star ? "text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        {errors.rating && (
          <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>
        )}
      </div>

      {/* Review Text */}
      <div>
        <label className="font-medium block mb-2">Your review *</label>
        <textarea
          {...register("comment")}
          placeholder="Write your experience... (min 10 chars)"
          className="w-full border border-gray-300 rounded-md p-3 outline-none focus:border-primary resize-none"
          rows={5}
        />
        {errors.comment && (
          <p className="text-red-500 text-sm mt-1">{errors.comment.message}</p>
        )}
      </div>

      {/* Name & Email */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">First Name *</label>
          <input
            {...register("firstName")}
            type="text"
            className="w-full border border-gray-300 rounded-md p-3 mt-1 outline-none focus:border-primary"
            placeholder="John"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium">Email Address</label>
          <input
            {...register("email")}
            type="email"
            className="w-full border border-gray-300 rounded-md p-3 mt-1 outline-none focus:border-primary"
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Save Info */}
      <div className="flex items-center gap-2">
        <Checkbox
          {...register("saveInfo")}
          checked={watch("saveInfo") || false}
          onChange={(e) => setValue("saveInfo", e.target.checked)}
          label="Save my name and email for next time"
        />
      </div>

      {/* Submit Button */}
      <PrimaryButton
        type="submit"
        className="px-10"
        disabled={loading || !isValid || rating === 0}
      >
        {loading ? "Submitting..." : "Submit Review"}
      </PrimaryButton>
    </form>
  );
};

export default ProductDetailTab4;
