"use client";
import Image from "next/image";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import React from "react";
import { Gallery } from "@/components/common/gallary";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import PhoneInput from "@/components/about/PhoneInput";
import { useProfile } from "@/contexts/profile-context";
import toast, { Toaster } from "react-hot-toast";
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import Link from "next/link";

interface FormData {
  name: string;
  email: string;
  phone: string;
  order: string;
  message: string;
}

const socialLinks = [
  {
    href: "#",
    icon: <FaTwitter className="text-primary group-hover:text-white" />,
  },
  {
    href: "#",
    icon: <FaFacebook className="text-primary group-hover:text-white" />,
  },
  {
    href: "#",
    icon: <FaInstagram className="text-primary group-hover:text-white" />,
  },
  {
    href: "#",
    icon: <FaGithub className="text-primary group-hover:text-white" />,
  },
];


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

export default function AboutPage() {
  const { user } = useProfile();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    order: "",
    message: "",
  });

  // Auto-fill form data if user is logged in
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone_number || "",
      }));
    }
  }, [user]);

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone_number: formData.phone,
        order_number: formData.order,
        message: formData.message,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/inquiry`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      console.log({ data });

      if (data.success) {
        toast.success(data.message || "Inquiry submitted successfully!");
        // Reset form
        setFormData({
          name: user ? user.name : "",
          email: user ? user.email : "",
          phone: "",
          order: "",
          message: "",
        });
      } else {
        toast.error(data.message || "Failed to submit inquiry");
      }
    } catch (error: any) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const textClass =
    "flex items-center gap-2 lg:text-[16px] text-sm md:text-base text-[#666664] font-[400] leading-[30px]";

  return (
    <main className="flex flex-col items-center w-full  bg-[FFFFFF] text-gray-700 opacity-500 mt-3">
      {/* Hero Section */}
      <Toaster position="top-right" />
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
      <section className="w-full max-w-7xl space-y-10">
        <div className="lg:flex  flex-col lg:gap-[18px] gap-0 hidden ">
          <h2 className="lg:text-[40px] text-[28px]  font-extrabold  text-[#666664]">
            Our Product
          </h2>
          <p className=" text-[24px] leading-[25px] font-[400] text-[#666664]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            tincidunt euismod ante. Vivamus placerat at enim non condimentum.
            Donec sit amet od ante. Vivamus placerat at enim non condimentum.
            Donec sit amet mauris purus. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.
          </p>
        </div>

        <div className="mt-5 lg:mt-0 flex flex-col md:flex-row items-center md:items-start gap-[16px] lg:gap-[56px]">
          <div className="flex-1 order-1 md:order-1 w-full">
            <img
              src="/assets/about/product.jpg"
              alt="Product 2"
              className="rounded-2xl border-0 md:w-[603px] md:h-[432px]"
            />
          </div>

          <div className="flex-1 order-2 md:order-2 max-w-7xl gap-[20px]">
            <h3 className="lg:text-[40px] text-[28px]  font-extrabold  text-[#666664]">
              Our Product
            </h3>
            <p className="lg:text-[24px] lg:leading-[25px] text-[13.19px] md:text-base my-3.5 font-[400] text-[#666664] mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              tincidunt euismod ante in malesuada. Vivamus placerat at enim non
              condimentum fermentum. Donec sit amet ante et lorem scelerisque
              luctus. Mauris placerat purus sit amet nisi elementum, id viverra
              orci dictum. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit.
            </p>
            <p className="lg:text-[24px] lg:leading-[25px] text-[13.19px] md:text-base font-[400] text-[#666664]">
              Praesent tincidunt euismod ante sit amet commodo. Vivamus placerat
              at enim non condimentum lorem. Donec sit amet mauris purus
              tristique eget. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="w-full max-w-7xl py-10 flex flex-col-reverse md:flex-row items-center md:items-start gap-[16px] lg:gap-[215px] ">
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

          <div className="flex items-center  text-gray-600 gap-3">

            {socialLinks.map((item, i) => (
              <Link key={i} href={item.href}>
                <div className="hover:bg-primary border border-primary group cursor-pointer rounded-full size-8 center">
                  {item.icon}
                </div>
              </Link>
            ))}

          </div>

          <button
            className="font-poppins font-[500] leading-[25.71px] bg-primary text-white text-[17px] 
          px-10 py-2 rounded-[14px] w-[204px] h-[53px] cursor-pointer hover:bg-primary/80"
          >
            Contact Us
          </button>
        </div>

        <div className="flex-1 order-2 md:order-2  w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3280.635822438208!2d135.2681585!3d34.6891397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60008d7bbb2ec4fd%3A0x3fc8f7fe18f2b3bf!2s6-ch%C5%8Dme-9%20K%C5%8Dy%C5%8Dch%C5%8Dnaka%2C%20Higashinada%20Ward%2C%20Kobe%2C%20Hyogo%20658-0032%2C%20Japan!5e0!3m2!1sen!2s!4v1754675364488!5m2!1sen!2s"
            width="100%"
            height="380"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-2xl border-0 md:w-[603px] md:h-[432px]"
          ></iframe>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="w-full max-w-7xl ">
        <div className=" flex flex-col gap-[20px] p-[10px] lg:p-[40px] bg-white shadow-[0_0_8px_0_#00000040] rounded-[14px]">
          <h2 className="lg:text-[32.39px] text-[21.05px] font-poppins leading-[49px] font-[600] text-left lg:text-center text-[#585C5A]">
            Inquiry Form
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 "
          >
            {/* Full Name */}
            <div className="flex flex-col gap-[8.85px]">
              <label className="text-sm font-[400] text-[14px] md:text-[18px] leading-[21px] md:leading-[27px] text-[#666664] opacity-40">
                Full name<span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="First Name"
                className="border border-[#C2C2C1] rounded-[14px] h-[43px] md:h-[55px] p-2 pl-5 text-sm focus:outline-[#98C1A9]"
                required
              />
            </div>

            {/* Phone Number */}
            <PhoneInput value={formData.phone} onChange={handleChange} />

            {/* Email */}
            <div className="flex flex-col gap-[8.85px]">
              <label className="text-sm font-[400] text-[14px] md:text-[18px] leading-[21px] md:leading-[27px] text-[#666664] opacity-40">
                Email address<span className="text-red-500">*</span>
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="border border-[#C2C2C1] rounded-[14px] h-[43px] md:h-[55px] p-2 pl-5 text-sm focus:outline-[#98C1A9]"
                required
              />
            </div>

            {/* Order Number / Date */}
            <div className="flex flex-col gap-[8.85px]">
              <label className="text-sm font-[400] text-[14px] md:text-[18px] leading-[21px] md:leading-[27px] text-[#666664] opacity-40">
                Order number / date
              </label>
              <input
                name="order"
                type="text"
                value={formData.order}
                onChange={handleChange}
                placeholder="Order Number"
                className="border border-[#C2C2C1] rounded-[14px] h-[43px] md:h-[55px] p-2 pl-5 text-sm focus:outline-[#98C1A9]"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-[8.85px] md:col-span-2">
              <label className="text-sm font-[400] text-[14px] md:text-[18px] leading-[21px] md:leading-[27px] text-[#666664] opacity-40">
                Message<span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message or Complaint here"
                className="border border-[#C2C2C1] text-[#666664]/40  font-semibold rounded-[14px] h-[140px] md:h-[171px] resize-none p-3 pl-5 text-[17px] focus:outline-[#98C1A9]"
                required
              />
            </div>

            {/* Submit */}
            <div className="flex justify-center md:col-span-2">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-[#98C1A9] h-[50px] md:h-[56px] w-full md:w-full lg:w-[259px] cursor-pointer text-white px-6 py-2 rounded-[14px] text-[16px] md:text-base font-[500] hover:bg-[#8ab49a] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Sending..." : "Send Inquiry"}
              </button>
            </div>
          </form>
        </div>
      </section>

      <div className="w-full max-w-7xl min-h-[335px] mt-6 lg:mt-10">
        <div className="flex flex-row items-center gap-[17.78px] mb-0">
          {/* Vertical Bar */}
          <div className="w-[22.22px] h-[44.44px] rounded-[4.44px] bg-[#98C1A9]"></div>

          {/* Heading */}
          <h2 className="text-[24px] font-semibold leading-[22.22px] text-[#666664] font-poppins ">
            Our Products Info
          </h2>
        </div>
        <div className="w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 py-10 gap-3 md:gap-6">
          {cardData.map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[14px] aspect-square px-3 md:px-[25px] py-4 md:py-[50px]
           shadow-[0px_2.25px_11.26px_2.25px_#00000033]
            border border-[#0000004D] flex flex-col items-center text-center justify-between"
            >
              <h1 className="text-[20px] sm:text-[22px] md:text-[36px] text-[#666664] font-bold leading-[1.1]  mt-1 md:mt-0">
                {card.title}
              </h1>
              <p className="text-[#666664] text-[8px] leading-[12px] md:text-[16px] md:leading-[19px] font-[400] px-1 md:px-0">
                {card.text}
              </p>
              <button
                type="button"
                className="bg-[#98C1A9] text-white px-4 md:px-[51px] py-2.5 md:py-[13px]
              rounded-[14px] text-[14px] md:text-[17.14px] leading-[20px] md:leading-[25.71px] font-[500] cursor-pointer
              h-[38px] md:h-[52px] w-[70%] md:w-[195px] hover:bg-[#8ab49a] transition-all mb-1 md:mb-0"
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
