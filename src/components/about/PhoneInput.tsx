"use client";
import React, { useState, useEffect, useRef } from "react";

interface PhoneInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange }) => {
  const [countryCode, setCountryCode] = useState("+44"); // default UK
  const [phoneNumber, setPhoneNumber] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInitialized = useRef(false);

  // Only initialize phoneNumber and countryCode once
  useEffect(() => {
    if (!isInitialized.current && value) {
      if (value.startsWith("+92")) {
        setCountryCode("+92");
        setPhoneNumber(value.replace("+92", ""));
      } else if (value.startsWith("+1")) {
        setCountryCode("+1");
        setPhoneNumber(value.replace("+1", ""));
      } else if (value.startsWith("+44")) {
        setCountryCode("+44");
        setPhoneNumber(value.replace("+44", ""));
      }
      isInitialized.current = true;
    }
  }, [value]);

  const emitChange = (code: string, number: string) => {
    const combined = `${code}${number}`;
    onChange({
      target: { name: "phone", value: combined },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCode = e.target.value;
    setCountryCode(newCode);
    emitChange(newCode, phoneNumber);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = e.target.value.replace(/\D/g, "");
    setPhoneNumber(newNumber);
    emitChange(countryCode, newNumber);
  };

  const handleFocus = () => {
    containerRef.current?.classList.add("ring-1", "ring-[#98C1A9]");
  };

  const handleBlur = () => {
    containerRef.current?.classList.remove("ring-1", "ring-[#98C1A9]");
  };

  return (
    <div className="flex flex-col gap-[8.85px] w-full">
      <label className="text-sm font-[400] text-[18px] leading-[27px] text-[#666664] opacity-40">
        Phone number<span className="text-red-500">*</span>
      </label>

      <div
        ref={containerRef}
        className="flex items-center border border-[#C2C2C1] rounded-[14px] h-[55px] px-3 bg-white transition-all"
      >
        <select
          value={countryCode}
          onChange={handleCountryChange}
          className="appearance-none bg-transparent p-2 outline-none text-[#666664] text-sm pr-2 h-full cursor-pointer"
        >
          <option value="+44">+44</option>
          <option value="+1">+1</option>
          <option value="+92">+92</option>
        </select>

        <div className="w-[1px] h-[30px] bg-[#D9D9D9] mx-2"></div>

        <input
          type="tel"
          name="phone"
          value={phoneNumber}
          onChange={handlePhoneChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder=""
          className="flex-1 h-full text-sm text-[#333] bg-transparent outline-none"
        />
      </div>
    </div>
  );
};

export default PhoneInput;
