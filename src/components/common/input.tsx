"use client";
import React, { InputHTMLAttributes, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  label,
  placeholder = "Enter text",
  value,
  onChange,
  error,
  className = "",
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="flex flex-col w-full relative ">
      {label && (
        <label className="absolute -top-2 left-4 bg-white px-1 text-[14px] leading-[100%] tracking-[0] text-[#1C1B1F] font-[Albert_Sans] font-normal z-10 capitalize">
          {label}
        </label>
      )}

      <div className="relative w-full">
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`height w-full text-[#1C1B1F] px-4 outline-none border border-[#79747E] opacity-75 font-albert-sans font-[400]
             rounded-[14px]  focus:border-gray-900 placeholder:text-[#1C1B1F] pr-10 ${className} text-[12px] lg:text-[16px]`}
          {...rest}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className={`absolute inset-y-0 right-3 flex items-center ${
              showPassword
                ? "text-black"
                : "text-light-gray cursor-pointer hover:text-black"
            }`}
          >
            {showPassword ? <IoEyeOff size={22} /> : <IoEye size={22} />}
          </button>
        )}
      </div>

      {error && <span className="mt-1 text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default Input;
