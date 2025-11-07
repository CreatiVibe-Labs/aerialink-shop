"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";

interface FormData {
  username: string;
  fullname: string;
  phone: string;
  email: string;
  password: string;
}

const Profile: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    fullname: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Data logged in console ✅");

    setFormData({
      username: "",
      fullname: "",
      phone: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-7 p-10">
      {/* Profile Form */}
      <form
        onSubmit={handleSubmit}
        className=" rounded-2xl space-y-7 w-[1013px] "
      >
        

        <div>
          <label className="block text-sm font-medium mb-1 text-[#666664]/40 text-[20px]">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-[14px] focus:outline-none bg-[#EBECF0]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-[#666664]/40 text-[20px]">
            Full Name
          </label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-[14px] focus:outline-none bg-[#EBECF0]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-[#666664]/40 text-[20px]">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-[14px] focus:outline-none bg-[#EBECF0]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-[#666664]/40 text-[20px]">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-[14px] focus:outline-none bg-[#EBECF0]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-[#666664]/40 text-[20px]">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-[14px] focus:outline-none bg-[#EBECF0]"
          />
        </div>

        <button
          type="submit"
          className="w-[232px] h-12 bg-[#98C1A9] text-white text-[17px] py-2 rounded-[14px]"
        >
          SAVE
        </button>
      </form>

      {/* Login & Security Section */}
<section className="w-[1013px]  ">

  <h3 className="text-2xl font-bold text-[#98C1A9]">Login & Security</h3>

<p className="text-[#666664] text-[17px] leading-relaxed mb-2 ">
    Manage and log out your active sessions on other browsers and devices.
  </p>
  <p className="text-[#666664] text-[17px] leading-relaxed ">
    If necessary, you may log out of all of your other browser sessions across all of your devices.
    Some of your recent sessions are listed below; however, this list may not be exhaustive. 
    If you feel your account has been compromised, you should also update your password.
  </p>
 
  <div className="flex flex-col gap-4 pt-2">
  
    <button
      type="button"
      className="h-[80px] max-w-[644px] bg-[#F5F5F5] text-[#666664] text-[16px] font-medium  transition flex items-center justify-start px-4"
    >
      
      <div className="w-10 h-10 bg-[#F5F5F5] rounded-full mr-4 flex items-center justify-center">
        <Image
          src="/assets/account/computer-desktop-remove.png" 
          alt="Windows Chrome Logo"
          width={32}
          height={32}
          className="object-contain"
        />
      </div>

     
      <div className="flex flex-col items-start">
        <span>Login with Windows Chrome</span>
        <span className="text-sm text-[#666664] mt-1">
          Last active: 2 hours ago
        </span>
      </div>
    </button>

  
    <button
      type="button"
      className="h-[80px] max-w-[644px] bg-[#F5F5F5] text-[#666664] text-[16px] font-medium  transition flex items-center justify-start px-4"
    >
     
      <div className="w-10 h-10 bg-[#F5F5F5] rounded-full mr-4 flex items-center justify-center">
        <Image
          src="/assets/account/computer-desktop-remove.png" 
          alt="Linux Chrome Logo"
          width={32}
          height={32}
          className="object-contain"
        />
      </div>

    
      <div className="flex flex-col items-start">
        <span>Login with Linux Chrome</span>
        <span className="text-sm text-[#666664] mt-1">
          Last active: 1 day ago
        </span>
      </div>
    </button>

     <button
          type="submit"
          className="w-[277px] h-12 bg-[#98C1A9] font-semibold text-white text-[17px] py-2 rounded-[14px]"
        >
          Logout From Another Device
        </button>
  </div>
</section>

    </div>
  );
};

export default Profile;
