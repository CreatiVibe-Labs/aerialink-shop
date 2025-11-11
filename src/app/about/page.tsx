"use client";
import Image from "next/image";
import { useState, ChangeEvent, FormEvent } from "react";
import React from "react";
import { Gallery } from "@/components/common/gallary";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import PhoneInput from "@/components/about/PhoneInput";
interface FormData {
  name: string;
  email: string;
  phone: string;
  order: string;
  message: string;
}
const cardData = [
  {
    title: "Plywood",
    text: "Praesent tincidunt euismod ante. Vivamus placerat at enim non con dimentum. Donec sit amet mauris purus.",
    btnText: "Read More",
  },
  {
    title: "MDF",
    text: "Praesent tincidunt euismod ante. Vivamus placerat at enim non con dimentum. Donec sit amet mauris purus. L",
    btnText: "Read More",
  },
  {
    title: "Wood Pattern",
    text: "Praesent tincidunt euismod ante. Vivamus placerat at enim non con dimentum. Donec sit amet mauris purus.",
    btnText: "Read More",
  },
  {
    title: "Stone Pattern",
    text: "Praesent tincidunt euismod ante. Vivamus placerat at enim non con dimentum. Donec sit amet mauris purus.",
    btnText: "Read More",
  },
];

export default function Page() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    order: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };
  const textClass =
    "flex items-center gap-2 lg:text-[16px] text-sm md:text-base text-[#666664] font-[400] leading-[30px]";

  return (
    <main
      className="flex flex-col items-center w-full  bg-[FFFFFF] text-gray-700 opacity-500 mt-3">
      {/* Hero Section */}
      <section className="relative w-full h-[400px] md:h-[580px] my-1.5">
        <Image
          src="/assets/about/image 53.png"
          alt="Community"
          fill
          className="object-cover brightness-75 rounded-none "
          priority
        />
        <div className="absolute inset-0 bg-[#98C1A9]/60 rounded-none " />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className=" xl:text-6xl text-[27.19px] sm:text-[27.19px] md:text-4xl font-bold">
            Welcome To Our Community
          </h1>
          <p className=" xl:text-4xl text-[14.91px] sm:text-base md:text-lg lg:mt-2 mt-0 font-bold">
            Mon-Fri: 9am-6pm
          </p>
        </div>
      </section>

      {/* Product Section */}
      <section className="w-full max-w-7xl px-5 space-y-12">
        <div className="lg:flex  flex-col lg:gap-[20px] gap-0 hidden ">
          <h2 className="lg:text-[40px] text-[28px]  font-extrabold  text-[#666664]">
            Our Product
          </h2>
          <p className=" xl:text-[24px] text-[13.19px] md:text-base leading-[25.71px] font-[400] text-[#666664]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            tincidunt euismod ante. Vivamus placerat at enim non condimentum.
            Donec sit amet od ante. Vivamus placerat at enim non condimentum.
            Donec sit amet mauris purus. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.
          </p>
        </div>

        <div className="mt-5 lg:mt-0 flex flex-col md:flex-row items-center md:items-start gap-[16px] lg:gap-[56px]">
          <div className="flex-1 order-1 md:order-1 w-full">
            <Image
              src="/assets/about/product.png"
              alt="Product 2"
              width={603}
              height={432}
              className="rounded-[14px] shadow-sm w-full"
            />
          </div>

          <div className="flex-1 order-2 md:order-2 max-w-7xl gap-[20px]">
            <h3 className="lg:text-[40px] text-[28px]  font-extrabold  text-[#666664]">
              Our Product
            </h3>
            <p className="xl:text-[24px] text-[13.19px] md:text-base leading-[25.71px] my-3.5 font-[400] text-[#666664]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              tincidunt euismod ante. Vivamus placerat at enim non condimentum.
              Donec sit amet od ante. Vivamus placerat at enim non condimentum.
              Donec sit amet mauris purus. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit.
            </p>
            <p className="xl:text-[24px] text-[13.19px] md:text-base leading-[25.71px] font-[400] text-[#666664]">
              Praesent tincidunt euismod ante. Vivamus placerat at enim non
              condimentum. Donec sit amet mauris purus. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="w-full max-w-7xl px-5 py-10 flex flex-col-reverse md:flex-row items-center md:items-start gap-[16px] lg:gap-[215px] ">
        <div className="flex-1 order-1 md:order-1 my-auto gap-[17px] flex flex-col w-full">
          <h2 className=" lg:text-[40px] text-[28px] font-[800] text-[#666664] leading-[27.17px]">
            Contact Information
          </h2>

          <div className="flex flex-col">
            <p className={textClass}>
              <Mail size={17} className="text-[#666664]" />
              info@gmail.com
            </p>

            <p className={textClass}>
              <Phone size={17} className="text-[#666664]" />
              097985734656
            </p>

            <p className={textClass}>
              <MapPin size={17} className="text-[#666664]" />
              Praesent tincidunt euismod ante. Vivamus placerat at
            </p>

            <p className={textClass}>
              <Clock size={17} className="text-[#666664]" />
              12pm - 12am
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Image
              width={29}
              height={29}
              src="/assets/icons/about-icon/twitter.png"
              alt="twitter"
              className="w-[29px] h-[29px] cursor-pointer"
            />
            <Image
              width={29}
              height={29}
              src="/assets/icons/about-icon/facebook.png"
              alt="facebook"
              className="w-[29px] h-[29px] cursor-pointer border border-[#CCCCCC] rounded-full"
            />
            <Image
              width={29}
              height={29}
              src="/assets/icons/about-icon/instagram.png"
              alt="instagram"
              className="w-[29px] h-[29px] cursor-pointer border border-[#CCCCCC] rounded-full"
            />
            <Image
              width={29}
              height={29}
              src="/assets/icons/about-icon/cat.png"
              alt="pinterest"
              className="w-[29px] h-[29px] cursor-pointer border border-[#CCCCCC] rounded-full"
            />
          </div>

          <button
            className="font-poppins font-[500] leading-[25.71px] bg-primary text-white text-[17px] 
          px-10 py-2 rounded-[14px] w-[204px] h-[53px] cursor-pointer hover:bg-primary/80"
          >
            Contact Us
          </button>
        </div>

        <div className="flex-1 order-2 md:order-2  w-full">
          <Image
            src="/assets/about/map.png"
            alt="Map Location"
            width={603}
            height={432}
            className="rounded-[14px] shadow-sm w-full object-cover"
          />
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="w-full max-w-7xl lg:p-10 p-5">
        <div className=" flex flex-col gap-[20px] p-[10px] lg:p-[40px] bg-white shadow-[0_0_8px_0_#00000040] rounded-[14px]">
          <h2 className="lg:text-[32.39px] text-[21.05px] font-poppins leading-[49px] font-[600] text-left lg:text-center text-[#585C5A]">
            Inquiry Form
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 "
          >
            <div className="flex flex-col gap-[8.85px]">
              <label className="text-sm font-[400] text-[18px] leading-[27px] text-[#666664] opacity-40">
                Full name<span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder=""
                className="border border-[#C2C2C1] rounded-[14px] h-[55px] p-2 pl-5  text-sm focus:outline-[#98C1A9]"
                required
              />
            </div>

            <div className="flex flex-col gap-[8.85px]">
              <label className="text-sm font-[400] text-[18px] leading-[27px] text-[#666664] opacity-40">
                Email address<span className="text-red-500">*</span>
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder=""
                className="border border-[#C2C2C1] rounded-[14px] h-[55px] p-2 pl-5  text-sm focus:outline-[#98C1A9]"
                required
              />
            </div>

            {/* <div className="flex flex-col gap-[8.85px]">
              <label className="text-sm font-[400] text-[18px] leading-[27px] text-[#666664] opacity-40">
                Phone number<span className="text-red-500">*</span>
              </label>
              <input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+44      |"
                className="border border-[#C2C2C1] rounded-[14px] h-[55px] p-2 pl-5  text-sm focus:outline-[#98C1A9]"
              />
            </div> */}
            <PhoneInput value={formData.phone} onChange={handleChange} />

            <div className="flex flex-col gap-[8.85px]">
              <label className="text-sm font-[400] text-[18px] leading-[27px] text-[#666664] opacity-40">
                Order number / date
              </label>
              <input
                name="order"
                type="text"
                value={formData.order}
                onChange={handleChange}
                placeholder=""
                className="border border-[#C2C2C1] rounded-[14px] h-[55px] p-2 pl-5  text-sm focus:outline-[#98C1A9]"
              />
            </div>

            <div className="flex flex-col gap-[8.85px] md:col-span-2">
              <label className="text-sm font-[400] text-[18px] leading-[27px] text-[#666664] opacity-40">
                Message<span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message or Complaint here"
                className="border border-[#C2C2C1] rounded-[14px] h-[171px] resize-none p-3 pl-5 text-sm focus:outline-[#98C1A9]"
                required
              />
            </div>

            <div className="flex justify-center md:col-span-2">
              <button
                type="submit"
                className="bg-[#98C1A9] h-[56px] w-full lg:w-[259px] cursor-pointer
                 text-white px-6 py-2 rounded-[14px]
                  text-[16px] md:text-base font-[500] hover:bg-[#8ab49a] transition-all"
              >
                Send Inquiry
              </button>
            </div>
          </form>
        </div>
      </section>

      <div className="w-full max-w-7xl min-h-[335px] mt-5 lg:mt-0 px-5 lg:px-5">
        <div className="flex flex-row items-center gap-[17.78px]">
          {/* Vertical Bar */}
          <div className="w-[22.22px] h-[44.44px] rounded-[4.44px] bg-[#98C1A9]"></div>

          {/* Heading */}
          <h2 className="text-[24px] font-semibold leading-[22.22px] text-[#666664] font-poppins">
            Our Products Info
          </h2>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  py-10  lg:grid-cols-4 gap-[34px]">
          {cardData.map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[14px] min-h-[279px] px-[25px] py-[34px]
           shadow-[0px_2.25px_11.26px_2.25px_#00000033]
            border border-[#0000004D] flex flex-col items-center text-center"
            >
              <h1 className="text-[36px] text-[#666664] font-bold leading-[33.79px] mb-[27.04px]">
                {card.title}
              </h1>
              <p className="text-[#666664] leading-[19px] text-[16px] font-[400]">
                {card.text}
              </p>
              <button
                type="button"
                className="bg-[#98C1A9] text-white px-[51px] py-[13px] 
              rounded-[14px] text-[17.14px] leading-[25.71px] font-[500] md:text-base cursor-pointer
              h-[52px] w-[195px] hover:bg-[#8ab49a] transition-all mt-[20px]"
              >
                {card.btnText}
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Gallery */}
      <Gallery />
    </main>
  );
}
