"use client";
import React, { FC } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface PhoneInputProps {
  label?: string;
  value?: string;
  onChange?: (val: string) => void;
  error?: string;
  className?: string;
}

const CustomPhoneInput: FC<PhoneInputProps> = ({
  label,
  value,
  onChange,
  error,
  className = "",
}) => {
  return (
    <div className="flex flex-col w-full relative">
      {label && (
        <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
      )}

      <div className="relative w-full">
        <PhoneInput
          country={"jp"}
          value={value}
          onChange={(phone) => onChange?.(phone)}
          enableSearch={true}
          inputStyle={{
            width: "100%",
            height: "3.2rem",
            borderRadius: "14px",
            border: "1px solid #79747E",
            paddingLeft: "3rem",
            fontSize: "0.95rem",
            color: "#000",
          }}
          buttonStyle={{
            borderRadius: "14px",
            borderRight: "1px solid transparent",
            backgroundColor: "white",
          }}
          dropdownStyle={{
            borderRadius: "14px",
            border: "1px solid #79747E",
          }}
          searchPlaceholder="Search country"
          containerClass={`w-full ${className}`}
        />
      </div>

      {error && <span className="mt-1 text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default CustomPhoneInput;
