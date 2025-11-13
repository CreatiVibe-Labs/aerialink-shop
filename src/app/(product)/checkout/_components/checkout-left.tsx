"use client";

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Checkbox from "@/components/common/checkbox";
import Input from "@/components/common/input";
import PhoneInput from "@/components/common/phone-input";
import PrimaryButton from "@/components/common/primary-button";
import ProductItemsSection from "./right/product-items-section";
import PontsDiscountSection from "./right/ponts-discount-section";
import CouponSection from "./right/coupon-section";
import TotalSection from "./right/total-section";
import { GoChevronLeft } from "react-icons/go";
import { useCart } from "@/contexts/cart-context";
import Cookies from "js-cookie";
import { useShippingState } from "@/hooks/use-shipping-state";
import { useConsumerTax } from "@/hooks/use-consumer-tax";

interface FormData {
  fullName: string;
  phone: string;
  address: string;
  postalCode: string;
  saveInfo: boolean;
  payment: string;
}

const CheckoutLeft = () => {
  const [mobileStep, setMobileStep] = useState(1); // 1 = form, 2 = review
  const [loading, setLoading] = useState(false);
  const [mobileFormData, setMobileFormData] = useState<FormData | null>(null);
  const { getTotal } = useCart();
  const subtotal = getTotal();
  const { postalCode, shippingRate } = useShippingState();
  const { consumerTax } = useConsumerTax();

  // Calculate total amount for payment (subtotal + shipping + consumer tax)
  const validShippingRate = shippingRate && shippingRate > 0 ? shippingRate : 0;
  const validConsumerTax = consumerTax && consumerTax > 0 ? consumerTax : 0;
  const totalAmount = subtotal + validShippingRate + (subtotal + validShippingRate) * (validConsumerTax / 100);

  // Determine if there's a shipping error
  const hasShippingError = !postalCode || shippingRate === null;

  // Desktop Form (Independent)
  const desktopForm = useForm<FormData>({
    defaultValues: { payment: "komoju", saveInfo: false, postalCode },
    mode: "onTouched",
  });

  // Mobile Form (Independent)
  const mobileForm = useForm<FormData>({
    defaultValues: { payment: "komoju", saveInfo: false },
    mode: "onTouched",
  });

  const desktopPostalCode = desktopForm.watch("postalCode");

  // Mobile Postal Code watcher
  const mobilePostalCode = mobileForm.watch("postalCode");

  useEffect(() => {
    if (!desktopPostalCode || desktopPostalCode.length < 4) return;

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shipping-rate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ postal_code: desktopPostalCode }),
        });

        const data = await res.json();
        console.log("Desktop Postal API Response:", data);

        // Store postal code and shipping_rate in cookie
        Cookies.set(
          "checkout_shipping",
          JSON.stringify({
            postalCode: desktopPostalCode,
            shippingRate: data.shipping_rate,
          })
        );
      } catch (err) {
        console.error("Desktop Postal API Error:", err);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [desktopPostalCode]);

  useEffect(() => {
    if (!mobilePostalCode || mobilePostalCode.length < 4) return;

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shipping-rate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ postal_code: mobilePostalCode }),
        });

        const data = await res.json();
        console.log("Mobile Postal API Response:", data);

        // Store postal code and shipping_rate in cookie
        Cookies.set(
          "checkout_shipping",
          JSON.stringify({
            postalCode: mobilePostalCode,
            shippingRate: data.shipping_rate,
          })
        );
      } catch (err) {
        console.error("Mobile Postal API Error:", err);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [mobilePostalCode]);

  const {
    register: regDesktop,
    handleSubmit: handleDesktop,
    control: ctrlDesktop,
    formState: { errors: errDesktop },
  } = desktopForm;

  const {
    register: regMobile,
    control: ctrlMobile,
    formState: { errors: errMobile },
    trigger,
    getValues,
  } = mobileForm;

  // Shared Payment Handler
  const processPayment = async (data: FormData) => {
    console.log("Payment Data:", data);
    setLoading(true);
    try {
      const response = await fetch("/api/payments/create-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount, ...data }),
      });

      const resData = await response.json();
      if (resData.sessionUrl) {
        window.location.href = resData.sessionUrl;
      } else {
        alert("Failed to create payment session.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handlePostCode = async () => {
    const postalCode = getValues("postalCode");
    console.log("Postal Code Entered:", postalCode);
  };
  // Desktop Submit
  const onDesktopSubmit: SubmitHandler<FormData> = (data) => {
    processPayment(data);
  };

  // Mobile: Go to Step 2
  const goToReview = async () => {
    const isValid = await trigger();
    if (isValid) {
      const values = getValues();
      setMobileFormData(values);
      setMobileStep(2);
    }
  };

  // Mobile: Final Submit
  const onMobilePlaceOrder = () => {
    if (mobileFormData) {
      processPayment(mobileFormData);
    }
  };

  return (
    <div>
      {/* ================== DESKTOP VIEW ================== */}
      <div className="hidden md:block">
        <h2 className="text-3xl font-medium text-min-gray mb-6">Billing Details</h2>

        <form onSubmit={handleDesktop(onDesktopSubmit)} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Full Name<span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="Enter your full name"
              {...regDesktop("fullName", { required: "Full name is required" })}
            />
            {errDesktop.fullName && (
              <p className="text-red-500 text-sm mt-1">{errDesktop.fullName.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <Controller
              name="phone"
              control={ctrlDesktop}
              rules={{
                required: "Phone number is required",
                validate: (val) => val.replace(/\D/g, "").length >= 8 || "Enter a valid phone number",
              }}
              render={({ field }) => (
                <PhoneInput
                  label="Phone Number *"
                  value={field.value}
                  onChange={field.onChange}
                  error={errDesktop.phone?.message}
                />
              )}
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Street Address<span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="Enter your address"
              {...regDesktop("address", { required: "Address is required" })}
            />
            {errDesktop.address && (
              <p className="text-red-500 text-sm mt-1">{errDesktop.address.message}</p>
            )}
          </div>

          {/* Postal Code */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Postal Code<span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="Postal Code"
              {...regDesktop("postalCode", {
                required: "Postal code is required",
                pattern: {
                  value: /^[0-9]{4,10}$/,
                  message: "Enter a valid postal code",
                },
              })}
            />
            {errDesktop.postalCode && (
              <p className="text-red-500 text-sm mt-1">{errDesktop.postalCode.message}</p>
            )}
          </div>

          {/* Save Info */}
          <div className="flex items-center gap-2 pt-2">
            <Checkbox
              label="Save this information for faster check-out next time"
              {...regDesktop("saveInfo")}
            />
          </div>

          {/* Payment */}
          <div className="pt-6">
            <h3 className="font-semibold text-gray-800 mb-3">Payment Method</h3>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                value="komoju"
                {...regDesktop("payment")}
                className="accent-light-gray"
              />
              <label className="text-gray-700 font-medium">KOMOJU</label>
            </div>
          </div>

          <PrimaryButton
            type="submit"
            className="md:max-w-fit px-10"
            disabled={loading || hasShippingError}
          >
            {loading ? "Processing..." : "Place Order"}
          </PrimaryButton>
        </form>
      </div>

      {/* ================== MOBILE VIEW ================== */}
      <div className="md:hidden">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-medium text-min-gray">
            {mobileStep === 1 ? "Billing Details" : "Review & Pay"}
          </h2>
          {mobileStep === 2 && (
            <PrimaryButton
              className="min-h-8 px-2 max-w-fit rounded-xl"
              onClick={() => setMobileStep(1)}
            >
              <GoChevronLeft className="mr-1" /> Back
            </PrimaryButton>
          )}
        </div>

        {mobileStep === 1 ? (
          <form className="space-y-4">
            {/* Full Name */}
            <div>
              <Input
                type="text"
                placeholder="Full Name"
                {...regMobile("fullName", { required: "Full name is required" })}
              />
              {errMobile.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {errMobile.fullName.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <Controller
                name="phone"
                control={ctrlMobile}
                rules={{
                  required: "Phone number is required",
                  validate: (val) =>
                    val.replace(/\D/g, "").length >= 8 || "Enter a valid phone number",
                }}
                render={({ field }) => (
                  <PhoneInput
                    value={field.value}
                    onChange={field.onChange}
                    error={errMobile.phone?.message}
                  />
                )}
              />
            </div>

            {/* Address */}
            <div>
              <Input
                type="text"
                placeholder="Street Address"
                {...regMobile("address", { required: "Address is required" })}
              />
              {errMobile.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errMobile.address.message}
                </p>
              )}
            </div>

            {/* Postal Code */}
            <div>
              <Input
                type="text"
                placeholder="Postal Code"
                {...regMobile("postalCode", {
                  required: "Postal code is required",
                  pattern: {
                    value: /^[0-9]{4,10}$/,
                    message: "Enter a valid postal code",
                  },
                })}
              />
              {errMobile.postalCode && (
                <p className="text-red-500 text-sm mt-1">
                  {errMobile.postalCode.message}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                label="Save this information for faster check-out next time"
                {...regMobile("saveInfo")}
              />
            </div>

            <PrimaryButton
              type="button"
              onClick={goToReview}
              className="w-full py-3"
            >
              Continue to Payment
            </PrimaryButton>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 border border-min-gray px-3 py-3 rounded-xl">
              <input
                type="radio"
                value="komoju"
                checked={mobileFormData?.payment === "komoju"}
                readOnly
                className="accent-light-gray size-5"
              />
              <label className="text-gray-700 font-medium">KOMOJU</label>
            </div>

            {/* <CouponSection /> */}
            <ProductItemsSection />
            {/* <PontsDiscountSection /> */}
            <TotalSection />

            <PrimaryButton
              onClick={onMobilePlaceOrder}
              className="w-full py-3"
              disabled={loading || hasShippingError}
            >
              {loading ? "Processing..." : "Place Order"}
            </PrimaryButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutLeft;