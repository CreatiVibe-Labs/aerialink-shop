"use client";

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Checkbox from "@/components/common/checkbox";
import Input from "@/components/common/input";
import PhoneInput from "@/components/about/PhoneInput";
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
import { useAddresses } from "@/hooks/use-addresses";
import { useProfile } from "@/contexts/profile-context";
import AddressSelector from "./address-selector";
import OrderConfirmationModal from "./order-confirmation-modal";
import AddAddressModal from "./add-address-modal";

interface FormData {
  fullName: string;
  email: string;
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
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingOrderData, setPendingOrderData] = useState<FormData | null>(null);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const { getTotal, cartItems } = useCart();
  const subtotal = getTotal();
  const { postalCode, shippingRate } = useShippingState();
  const { consumerTax } = useConsumerTax();
  const { user } = useProfile();

  // Saved addresses for logged-in users
  const {
    addresses,
    selectedAddress,
    setSelectedAddress,
    loading: addressesLoading,
    addAddress,
    updateAddress,
    removeAddress,
  } = useAddresses();

  // Check if user is logged in
  const isLoggedIn = !!Cookies.get("token");
  const token = Cookies.get("token");
  console.log({ isLoggedIn, token })
  const hasAddresses = addresses.length > 0;

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

  // Autofill email when logged in (always for logged-in users)
  useEffect(() => {
    if (isLoggedIn && user?.email) {
      desktopForm.setValue("email", user.email);
      mobileForm.setValue("email", user.email);
    }
  }, [isLoggedIn, user]);

  // Autofill form when selected address changes (logged-in users)
  useEffect(() => {
    if (selectedAddress) {
      // Autofill desktop form
      desktopForm.setValue("fullName", selectedAddress.name);
      desktopForm.setValue("phone", selectedAddress.phone_number);
      desktopForm.setValue("address", selectedAddress.address1);
      desktopForm.setValue("postalCode", selectedAddress.postal_code);

      // Autofill mobile form
      mobileForm.setValue("fullName", selectedAddress.name);
      mobileForm.setValue("phone", selectedAddress.phone_number);
      mobileForm.setValue("address", selectedAddress.address1);
      mobileForm.setValue("postalCode", selectedAddress.postal_code);

      // Fetch shipping rate for this address
      if (selectedAddress.postal_code) {
        const fetchShippingForAddress = async () => {
          try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shipping-rate`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ postal_code: selectedAddress.postal_code }),
            });

            const data = await res.json();
            console.log("Address Shipping Rate API Response:", data);

            Cookies.set(
              "checkout_shipping",
              JSON.stringify({
                postalCode: selectedAddress.postal_code,
                shippingRate: data.shipping_rate,
              })
            );
          } catch (err) {
            console.error("Address Shipping Rate API Error:", err);
          }
        };

        fetchShippingForAddress();
      }
    }
  }, [selectedAddress]);

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

    // Calculate tax amount
    const taxAmount = (subtotal + validShippingRate) * (validConsumerTax / 100);

    // Use form data directly (already autofilled for logged-in users if they selected an address)
    const paymentData = {
      amount: totalAmount,
      cartItems: cartItems,
      shippingAmount: validShippingRate,
      taxAmount: taxAmount,
      subtotal: subtotal,
      ...data,
    };

    try {
      const response = await fetch("/api/payments/create-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
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

  // Desktop Submit - Show confirmation modal first
  const onDesktopSubmit: SubmitHandler<FormData> = (data) => {
    setPendingOrderData(data);
    setShowConfirmation(true);
  };

  // Confirmation handler
  const handleConfirmOrder = () => {
    setShowConfirmation(false);
    if (pendingOrderData) {
      processPayment(pendingOrderData);
    }
  };

  // Mobile: Go to Step 2
  const goToReview = async () => {
    // Validate form for all users
    const isValid = await trigger();
    if (!isValid) return;

    // Use form values directly (already autofilled for logged-in users)
    const values = getValues();
    setMobileFormData(values);
    setMobileStep(2);
  };

  // Mobile: Final Submit - Show confirmation modal first
  const onMobilePlaceOrder = () => {
    if (mobileFormData) {
      setPendingOrderData(mobileFormData);
      setShowConfirmation(true);
    }
  };

  return (
    <div>
      {/* Order Confirmation Modal */}
      {pendingOrderData && (
        <OrderConfirmationModal
          isOpen={showConfirmation}
          onClose={() => {
            setShowConfirmation(false);
            setPendingOrderData(null);
          }}
          onConfirm={handleConfirmOrder}
          shippingDetails={{
            fullName: pendingOrderData.fullName,
            email: pendingOrderData.email,
            phone: pendingOrderData.phone,
            address: pendingOrderData.address,
            postalCode: pendingOrderData.postalCode,
          }}
          cartItems={cartItems}
          subtotal={subtotal}
          shippingRate={validShippingRate}
          consumerTax={validConsumerTax}
          total={totalAmount}
        />
      )}
      {/* ================== DESKTOP VIEW ================== */}
      <div className="hidden md:block">
        <h2 className="text-3xl font-medium text-[#AFB1AE] mb-6">Shipping Details</h2>

        {/* Show saved addresses for logged-in users */}
        {isLoggedIn && hasAddresses && (
          <div className="mb-5">
            <AddressSelector
              addresses={addresses}
              selectedAddress={selectedAddress}
              onSelectAddress={setSelectedAddress}
              onAddAddress={addAddress}
              onUpdateAddress={updateAddress}
              onRemoveAddress={removeAddress}
              loading={addressesLoading}
            />
          </div>
        )}

        {/* Show empty state if logged in but no addresses */}
        {isLoggedIn && !hasAddresses && (
          <>
            <div className="mb-5 border-1 border-gray-300 rounded-xl p-6 bg-white">
              <h3 className="text-[#98C1A9] font-bold text-2xl mb-4">Saved address</h3>
              <button
                type="button"
                onClick={() => setShowAddAddressModal(true)}
                className="w-full cursor-pointer border-1 border-[#98C1A9] rounded-xl py-10 bg-[#98C1A9]/10 text-[#98C1A9] transition-colors text-lg flex flex-col items-center justify-center gap-2"
              >
                <span className="text-2xl">+</span>
                Add shipping address
              </button>
            </div>
            <AddAddressModal
              isOpen={showAddAddressModal}
              onClose={() => setShowAddAddressModal(false)}
              onSave={addAddress}
            />
          </>
        )}

        {/* Always show the form (autofilled for logged-in users) */}
        <form onSubmit={handleDesktop(onDesktopSubmit)} className={``}>

          <div className={`${isLoggedIn ? 'hidden' : 'space-y-5'}`}>
            {/* Full Name */}
            <div>
              <label className="block text-sm text-[#AFB1AE] mb-1">
                Full Name<span className="text-red-500">*</span>
              </label>
              <Input
              className="text-[#AFB1AE] border border-gray-300 placeholder:text-[#AFB1AE]"
                type="text"
                placeholder="Enter your full name"
                {...regDesktop("fullName", { required: "Full name is required" })}
              />
              {errDesktop.fullName && (
                <p className="text-red-500 text-sm mt-1">{errDesktop.fullName.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-[#AFB1AE] mb-1">
                Email<span className="text-red-500">*</span>
              </label>
              <Input
              className="text-[#AFB1AE] border border-gray-300 placeholder:text-[#AFB1AE]"
                type="email"
                placeholder="Enter your email"
                {...regDesktop("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
              />
              {errDesktop.email && (
                <p className="text-red-500 text-sm mt-1">{errDesktop.email.message}</p>
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
                  <div>
                    <label className="block text-sm text-[#AFB1AE] mb-1">
                      Phone Number<span className="text-red-500">*</span>
                    </label>
                    <PhoneInput
                      hideLabel
                      value={field.value || ""}
                      onChange={(e) => field.onChange((e.target as HTMLInputElement).value)}
                    />
                    {errDesktop.phone && (
                      <p className="text-red-500 text-sm mt-1">{errDesktop.phone.message}</p>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm text-[#AFB1AE] mb-1">
                Street Address<span className="text-red-500">*</span>
              </label>
              <Input
              className="text-[#AFB1AE] border border-gray-300 placeholder:text-[#AFB1AE]"
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
              <label className="block text-sm text-[#AFB1AE] mb-1">
                Postal Code<span className="text-red-500">*</span>
              </label>
              <Input
              className="text-[#AFB1AE] border border-gray-300 placeholder:text-[#AFB1AE]"
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
          </div>
          {/* Save Info - Only show for guests */}
          {!isLoggedIn && (
            <div className="flex items-center gap-2 pt-2">
              <Checkbox
                label="Save this information for faster check-out next time"
                {...regDesktop("saveInfo")}
              />
            </div>
          )}

          {/* Payment */}
          <div className="pt-6">
            <h3 className="font-semibold text-[#AFB1AE] mb-3">Payment Method</h3>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                value="komoju"
                {...regDesktop("payment")}
                className="accent-light-gray"
              />
              <label className="text-[#AFB1AE] font-medium">KOMOJU</label>
            </div>
          </div>

          <PrimaryButton
            type="submit"
            className="md:max-w-fit px-10 mt-5"
            disabled={loading || hasShippingError}
          >
            {loading ? "Processing..." : "Place Order"}
          </PrimaryButton>
        </form>
      </div>

      {/* ================== MOBILE VIEW ================== */}
      <div className="md:hidden">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-medium text-[#AFB1AE]">
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
          <div className="space-y-4">
            {/* Show saved addresses for logged-in users */}
            {isLoggedIn && hasAddresses && (
              <div className="mb-4">
                <AddressSelector
                  addresses={addresses}
                  selectedAddress={selectedAddress}
                  onSelectAddress={setSelectedAddress}
                  onAddAddress={addAddress}
                  onUpdateAddress={updateAddress}
                  onRemoveAddress={removeAddress}
                  loading={addressesLoading}
                />
              </div>
            )}

            {/* Show empty state if logged in but no addresses */}
            {isLoggedIn && !hasAddresses && (
              <>
                <div className="mb-4 border-2 border-[#666664] rounded-xl p-6 bg-white">
                  <h3 className="text-[#98C1A9] font-bold text-2xl mb-4">Saved address</h3>
                  <button
                    type="button"
                    onClick={() => setShowAddAddressModal(true)}
                    className="w-full border-2 border-dashed border-[#C5D3CE] rounded-xl py-16 bg-[#FAFBFA] text-[#AFB1AE] hover:bg-gray-50 transition-colors text-sm flex items-center justify-center gap-2"
                  >
                    <span className="text-2xl">+</span>
                    Add shipping address
                  </button>
                </div>
                <AddAddressModal
                  isOpen={showAddAddressModal}
                  onClose={() => setShowAddAddressModal(false)}
                  onSave={addAddress}
                />
              </>
            )}

            {/* Always show the form (autofilled for logged-in users) */}
            <form className="space-y-4">
              <div className={`${isLoggedIn ? 'hidden' : 'space-y-4 '}`}>
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

                {/* Email */}
                <div>
                  <Input
                  className="text-[#AFB1AE] border border-gray-300 placeholder:text-[#AFB1AE]"
                    type="email"
                    placeholder="Email"
                    {...regMobile("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                  />
                  {errMobile.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errMobile.email.message}
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
                      <div>
                        <PhoneInput
                          hideLabel
                          value={field.value || ""}
                          onChange={(e) => field.onChange((e.target as HTMLInputElement).value)}
                        />
                        {errMobile.phone && (
                          <p className="text-red-500 text-sm mt-1">{errMobile.phone.message}</p>
                        )}
                      </div>
                    )}
                  />
                </div>

                {/* Address */}
                <div>
                  <Input
                  className="text-[#AFB1AE] border border-gray-300 placeholder:text-[#AFB1AE]"
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
                  className="text-[#AFB1AE] border border-gray-300 placeholder:text-[#AFB1AE]"
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
              </div>

              {/* Save Info - Only show for guests */}
              {!isLoggedIn && (
                <div className="flex items-center gap-2">
                  <Checkbox
                    label="Save this information for faster check-out next time"
                    {...regMobile("saveInfo")}
                  />
                </div>
              )}

              <PrimaryButton
                type="button"
                onClick={goToReview}
                className="w-full py-3 mt-4"
              >
                Continue to Payment
              </PrimaryButton>
            </form>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 border border-min-gray px-3 py-3 rounded-xl">
              <input
                type="radio"
                value="komoju"
                checked={mobileFormData?.payment === "komoju"}
                readOnly
                className="accent-[#AFB1AE] size-5"
              />
              <label className="text-[#AFB1AE] font-medium">KOMOJU</label>
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