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
    <div className="min-h-screen flex flex-col items-center justify-center space-y-7">
      {/* Profile Form */}
      <form
        onSubmit={handleSubmit}
        className=" rounded-2xl flex flex-col w-full lg:gap-[28px] gap-[10px] mt-5 lg:mt-0"
      >
        <div className="flex flex-col lg:gap-[15px] gap-[8px]">
          <label className="block text-[16px] font-medium text-[#666664] lg:text-[20px] opacity-40 leading-[18.86px] lg:leading-[24px] font-albert-sans ">
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="Geller_Ross12"
            value={formData.username}
            onChange={handleChange}
            className="w-full lg:px-4 px-[19px] py-2 border border-[#EBECF0] text-[#666664] font-[500]
             placeholder:text-[#666664] lg:text-[20px] text-[16px] lg:leading-[24px] leading-[18.86px] font-albert-sans
              lg:rounded-[14px] rounded-[11px] lg:h-[55px] h-[40px] focus:outline-none bg-[#F5F5F5]"
          />
        </div>

        <div className="flex flex-col lg:gap-[15px] gap-[8px]">
          <label className="block text-[16px] font-medium text-[#666664] lg:text-[20px] opacity-40 leading-[18.86px] lg:leading-[24px] font-albert-sans ">
            Full Name
          </label>
          <input
            type="text"
            name="fullname"
            placeholder="Ross Geller"
            value={formData.fullname}
            onChange={handleChange}
            className="w-full lg:px-4 px-[19px] py-2 border border-[#EBECF0] text-[#666664] font-[500]
             placeholder:text-[#666664] lg:text-[20px] text-[16px] lg:leading-[24px] leading-[18.86px] font-albert-sans
              lg:rounded-[14px] rounded-[11px] lg:h-[55px] h-[40px] focus:outline-none bg-[#F5F5F5]"
          />
        </div>

        <div className="flex flex-col lg:gap-[15px] gap-[8px]">
          <label className="block text-[16px] font-medium text-[#666664] lg:text-[20px] opacity-40 leading-[18.86px] lg:leading-[24px] font-albert-sans">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="+44631736971"
            value={formData.phone}
            onChange={handleChange}
            className="w-full lg:px-4 px-[19px] py-2 border border-[#EBECF0] text-[#666664] font-[500]
             placeholder:text-[#666664] lg:text-[20px] text-[16px] lg:leading-[24px] leading-[18.86px] font-albert-sans
              lg:rounded-[14px] rounded-[11px] lg:h-[55px] h-[40px] focus:outline-none bg-[#F5F5F5]"
          />
        </div>

        <div className="flex flex-col lg:gap-[15px] gap-[8px]">
          <label className="block text-[16px] font-medium text-[#666664] lg:text-[20px] opacity-40 leading-[18.86px] lg:leading-[24px] font-albert-sans">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="RossGeller@gmail.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full lg:px-4 px-[19px] py-2 border border-[#EBECF0] text-[#666664] font-[500]
             placeholder:text-[#666664] lg:text-[20px] text-[16px] lg:leading-[24px] leading-[18.86px] font-albert-sans
              lg:rounded-[14px] rounded-[11px] lg:h-[55px] h-[40px] focus:outline-none bg-[#F5F5F5]"
          />
        </div>

        <div className="flex flex-col lg:gap-[15px] gap-[8px]">
          <label className="block text-[16px] font-medium text-[#666664] lg:text-[20px] opacity-40 leading-[18.86px] lg:leading-[24px] font-albert-sans">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="*********"
            value={formData.password}
            onChange={handleChange}
            className="w-full lg:px-4 px-[19px] py-2 border border-[#EBECF0] text-[#666664] font-[500]
             placeholder:text-[#666664] lg:text-[20px] text-[16px] lg:leading-[24px] leading-[18.86px] font-albert-sans
              lg:rounded-[14px] rounded-[11px] lg:h-[55px] h-[40px] focus:outline-none bg-[#F5F5F5]"
          />
        </div>

        <button
          type="submit"
          className="w-[232px] h-[45px] lg:h-[48px] bg-[#98C1A9] text-white px-10 py-2 
          lg:text-[17px] text-[16px] lg:leading-[100%] 
          rounded-[14px] font-[600] cursor-pointer  hover:bg-primary/80"
        >
          SAVE
        </button>
      </form>

      {/* Login & Security Section */}
      <section className="w-full">
        <h3 className="text-[24px] font-bold text-[#98C1A9] leading-[39px]">
          Login & Security
        </h3>

        <p className="text-[#666664] lg:text-[20px] text-[15px] leading-[120%] lg:leading-[29px] font-[500]">
          Manage and log out your active sessions on other browsers and devices.
        </p>
        <p className="text-[#666664] text-[20px] leading-[29px] font-[500] mt-1 hidden lg:block">
          If necessary, you may log out of all of your other browser sessions
          across all of your devices. Some of your recent sessions are listed
          below; however, this list may not be exhaustive. If you feel your
          account has been compromised, you should also update your password.
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
              <span className="font-[500] text-[16px] leading-[24px] font-albert-sans text-[#666664]">
                Windows - Chrome{" "}
              </span>
              <span className="font-[500] text-[12px] leading-[24px] font-albert-sans text-[#666664] mt-1">
                Last active yesterday at 7:45 AM
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
              <span className="font-[500] text-[16px] leading-[24px] font-albert-sans text-[#666664]">
                Linux - Chrome
              </span>
              <span className="font-[500] text-[12px] leading-[24px] font-albert-sans text-[#666664] mt-1">
                Last active Today at 2:42 AM
              </span>
            </div>
          </button>

          <button
            type="submit"
            className="w-[277px] h-[45px] lg:h-[48px] cursor-pointer  hover:bg-primary/80 bg-[#98C1A9] 
            tracking-[0.23px] font-semibold leading-[100%] text-[#FFFFFF]  lg:text-[17px] text-[17px] ] py-2 rounded-[14px]"
          >
            Logout from other devices
          </button>
        </div>
      </section>
    </div>
  );
};

export default Profile;
