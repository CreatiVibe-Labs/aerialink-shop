'use client'
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
    <div className="flex flex-col w-full relative">
      {label && (
        <label className="mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative w-full">
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`height w-full text-black px-4 outline-none border border-light-gray rounded-custom  focus:border-gray-900 placeholder:text-light-gray pr-10 ${className}`}
          {...rest}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className={`absolute inset-y-0 right-3 flex items-center ${showPassword ? 'text-black' : 'text-light-gray cursor-pointer hover:text-black'}`}
          >
            {showPassword ? <IoEyeOff size={22} /> : <IoEye size={22} />}
          </button>
        )}
      </div>

      {error && (
        <span className="mt-1 text-sm text-red-500">{error}</span>
      )}
    </div>
  );
};

export default Input;
