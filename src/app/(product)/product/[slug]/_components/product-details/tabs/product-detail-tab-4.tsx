

"use client";
import { useProducts } from "@/contexts/product-context";
import { useProfile } from "@/contexts/profile-context";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import CommunityReviews from "@/app/community-forum/_component/Reviews";

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

  const reviews = (product as any)?.reviews || [];

  return (
    <CommunityReviews reviews={reviews} product_id={product?.id} />
  );
};

export default ProductDetailTab4;
