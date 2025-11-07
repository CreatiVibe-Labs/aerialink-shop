"use client";
import Image from "next/image";
import { useState, ChangeEvent, FormEvent } from "react";
import React from "react";
import { Gallery } from "@/components/common/gallary";

interface FormData {
  name: string;
  email: string;
  phone: string;
  order: string;
  message: string;
}

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

  return (
    <main
      className="flex flex-col items-center w-full  m-auto bg-[FFFFFF] text-gray-700 opacity-500 max-w-7xl 
  "
    >
      {/* Hero Section */}
      <section className="relative w-full h-[400px] md:h-[580px] my-1.5">
        <Image
          src="/assets/about/image 53.png"
          alt="Community"
          fill
          className="object-cover brightness-75 rounded-none md:rounded-lg"
          priority
        />
        <div className="absolute inset-0 bg-[#98C1A9]/60 rounded-none md:rounded-lg" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className=" xl:text-6xl text-2xl sm:text-3xl md:text-4xl font-bold">
            Welcome To Our Community
          </h1>
          <p className=" xl:text-4xl text-sm sm:text-base md:text-lg mt-2 font-bold">
            Mon–Fri: 9am–6pm
          </p>
        </div>
      </section>

      {/* Product Section */}
      <section className="w-full max-w-7xl px-5 py-10 space-y-12">
        <div className="hidden md:block">
          <h2 className="text-4xl font-bold mb-3 text-[666664]    ">
            Our Product
          </h2>
          <p className=" xl:text-2xl text-sm md:text-base leading-6.5 mb-6 my-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            tincidunt euismod ante. Vivamus placerat at enim non condimentum.
            Donec sit amet od ante. Vivamus placerat at enim non condimentum.
            Donec sit amet mauris purus. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="flex-1 order-1 md:order-1">
            <Image
              src="/assets/about/product.png"
              alt="Product 2"
              width={600}
              height={400}
              className="rounded-lg shadow-sm w-full"
            />
          </div>

          <div className="flex-1 order-2 md:order-2 max-w-7xl">
            <h3 className="text-4xl font-bold mb-3 text-[666664]">
              Our Product
            </h3>
            <p className="xl:text-2xl text-sm md:text-base leading-6.5 my-3.5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              tincidunt euismod ante. Vivamus placerat at enim non condimentum.
              Donec sit amet od ante. Vivamus placerat at enim non condimentum.
              Donec sit amet mauris purus. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit.
            </p>
            <p className="xl:text-2xl text-sm md:text-base leading-6.5">
              Praesent tincidunt euismod ante. Vivamus placerat at enim non
              condimentum. Donec sit amet mauris purus. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="w-full max-w-7xl px-5 py-10 flex flex-col md:flex-row items-center md:items-start gap-8 ">
        <div className="flex-1 order-1 md:order-1">
          <h2 className=" lg:text-[40px] text-xl md:text-2xl font-bold mb-3 text-[666664]">
            Contact Information
          </h2>
          <p className=" lg:text-[16px] text-sm md:text-base mb-4 text-[666664]">
            info@example.com
          </p>
          <p className="lg:text-[16px] text-sm md:text-base mb-2  text-[666664]">
            Praesent tincidunt euismod ante. Vivamus placerat at{" "}
          </p>
          <p className="lg:text-[16px] text-sm md:text-base leading-relaxed text-[666664]">
            12pm-12am
          </p>

          <div className="flex items-center gap-3 mt-6">
            <Image
              width={100}
              height={100}
              src="/assets/icons/about-icon/twitter.png"
              alt="twitter"
              className="w-6 h-6"
            />
            <Image
              width={100}
              height={100}
              src="/assets/icons/about-icon/facebook.png"
              alt="facebook"
              className="w-6 h-6"
            />
            <Image
              width={100}
              height={100}
              src="/assets/icons/about-icon/instagram.png"
              alt="instagram"
              className="w-6 h-6"
            />
            <Image
              width={100}
              height={100}
              src="/assets/icons/about-icon/cat.png"
              alt="pinterest"
              className="w-6 h-6"
            />
          </div>

          <button className="mt-6 bg-primary text-white -700 text-[17px] px-10 py-2 rounded-xl ">
            Contact Us
          </button>
        </div>

        <div className="flex-1 order-2 md:order-2">
          <Image
            src="/assets/about/map.png"
            alt="Map Location"
            width={600}
            height={400}
            className="rounded-lg shadow-sm w-full object-cover"
          />
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="w-full max-w-7xl px-5 pb-20">
        <div className="bg-white rounded-xl shadow-sm p-5 md:p-10">
          <h2 className="text-lg md:text-2xl font-semibold text-center mb-6 text-gray-500">
            Inquiry Form
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Full name*</label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="border rounded-lg p-2 text-sm focus:outline-[#98C1A9]"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">
                Email address*
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="border rounded-lg p-2 text-sm focus:outline-[#98C1A9]"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">
                Phone number*
              </label>
              <input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+92"
                className="border rounded-lg p-2 text-sm focus:outline-[#98C1A9]"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">
                Order number / date
              </label>
              <input
                name="order"
                type="text"
                value={formData.order}
                onChange={handleChange}
                placeholder="Order ID or Date"
                className="border rounded-lg p-2 text-sm focus:outline-[#98C1A9]"
              />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="text-sm text-gray-600 mb-1">Message*</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message or complaint here"
                className="border rounded-lg p-3 text-sm min-h-[120px] focus:outline-[#98C1A9]"
                required
              />
            </div>

            <div className="flex justify-center md:col-span-2">
              <button
                type="submit"
                className="bg-[#98C1A9] text-white px-6 py-2 rounded-lg text-sm md:text-base font-semibold hover:bg-[#8ab49a] transition-all"
              >
                Send Inquiry
              </button>
            </div>
          </form>
        </div>
      </section>

      <div className="w-full max-w-7xl h-[335px]  px-5 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
        <div className=" bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_2px_6px_2px_rgba(60,64,67,0.15)] border-b-gray-500 flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold mb-3 text-[666664] px-[47px]">
            Plywood
          </h1>
          <p className="text-[666664] leading-[19px]  ">
            Praesent tincidunt euismod ante. Vivamus placerat at enim non con
            dimentum. Donec sit amet mauris purus. L
          </p>
          <button
            type="submit"
            className="bg-[#98C1A9] text-white px-[51px] py-[13px] mt-[25px] rounded-[14px] text-sm md:text-base font-semibold m-]"
          >
            Read More
          </button>
        </div>
        <div className=" bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_2px_6px_2px_rgba(60,64,67,0.15)] border-b-gray-500 flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold mb-3 text-[666664]">MDF</h1>
          <p className="text-[666664] leading-[19px]  ">
            Praesent tincidunt euismod ante. Vivamus placerat at enim non con
            dimentum. Donec sit amet mauris purus. L
          </p>
          <button
            type="submit"
            className="bg-[#98C1A9] text-white px-[51px] py-[13px] mt-[25px] rounded-[14px] text-sm md:text-base font-semibold "
          >
            Read More
          </button>
        </div>
        <div className=" bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_2px_6px_2px_rgba(60,64,67,0.15)] border-b-gray-500 flex flex-col items-center text-center">
          <h1 className=" text-4xl font-bold mb-3 text-[666664]">
            Wood Pattern
          </h1>
          <p className="text-[666664] leading-[19px]  ">
            Praesent tincidunt euismod ante. Vivamus placerat at enim non con
            dimentum. Donec sit amet mauris purus. L
          </p>
          <button
            type="submit"
            className="bg-[#98C1A9] text-white px-[51px] py-[13px] mt-[25px] rounded-[14px] text-sm md:text-base font-semibold "
          >
            Read More
          </button>
        </div>
        <div className=" bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_2px_6px_2px_rgba(60,64,67,0.15)] border-b-gray-500 flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold mb-3 text-[666664]">
            Stone pattern
          </h1>
          <p className="text-[666664] leading-[19px]  ">
            Praesent tincidunt euismod ante. Vivamus placerat at enim non con
            dimentum. Donec sit amet mauris purus. L
          </p>
          <button
            type="submit"
            className="bg-[#98C1A9] text-white px-[51px] py-[13px] mt-[25px] rounded-[14px] text-sm md:text-base font-semibold "
          >
            Read More
          </button>
        </div>
      </div>

      {/* Gallery */}
      <Gallery />
    </main>
  );
}
