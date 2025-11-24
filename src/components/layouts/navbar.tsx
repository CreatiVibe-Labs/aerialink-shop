"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosMenu } from "react-icons/io";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    if (isOpen) setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isOpen &&
        !target.closest(".sidebar") &&
        !target.closest(".menu-btn")
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <nav className="z-[9999] sticky top-5 xl:px-4 lg:px-4 md:px-4 px-4 bg-[#fdfdfd]">
      <div className="bg-primary rounded-full max-w-7xl w-full mx-auto flex justify-between items-center py-3 px-8">
        {/* Mobile Menu Button */}
        <div className="center">
          <button
            onClick={handleToggle}
            className="menu-btn text-white focus:outline-none mr-2 ml-[-15px] md:hidden"
          >
            <IoIosMenu size={32} strokeWidth={1} />
          </button>
          <div className="text-white font-bold text-xl">
            <Image src={'/assets/common/ecommerce-logo.png'} width={100} height={100} alt="Aerialink" className="xl:w-12 xl:h-12 lg:w-12 lg:h-12 md:w-10 md:h-10 h-8 w-8 object-contain text-left" />
          </div>
        </div>
        {/* shoping cart for mobile */}
        <div className="md:hidden relative">
          <FiShoppingCart size={32} strokeWidth={1} color="white" />
          {/* count */}
          <div className="bg-white center absolute rounded-full size-4 text-xs top-0 -right-2 text-black">
            12
          </div>
        </div>
        {/* Desktop Navigation */}
        <ul className="hidden md:flex xl:space-x-16 lg:space-x-16 md:space-x-10 font-semibold xl:text-2xl lg:text-xl md:text-lg">
          <li>
            <Link
              href="/"
              className="text-white hover:text-gray-200"
              onClick={handleClose}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/community-forum/"
              className="text-white hover:text-gray-200"
              onClick={handleClose}
            >
              Community Forum
            </Link>
          </li>
          <li>
            <Link
              href="/360-virtual-showroom/"
              className="text-white hover:text-gray-200"
              onClick={handleClose}
            >
              360 virtual showroom
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-white hover:text-gray-200"
              onClick={handleClose}
            >
              About us
            </Link>
          </li>{" "}
        </ul>

        {/* Mobile Sidebar */}
        <div
          className={`fixed inset-0 bg-black/10 z-40 transition-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          onClick={handleClose}
        >
          <div
            className={`sidebar fixed top-0 left-0 w-64 bg-primary h-full p-6 transform transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"
              }`}
          >
            <button
              onClick={handleToggle}
              className="text-white mb-6 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <ul className="space-y-4">
              <li>
                <a
                  href="#home"
                  className="text-white hover:text-gray-200 block"
                  onClick={handleClose}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#forum"
                  className="text-white hover:text-gray-200 block"
                  onClick={handleClose}
                >
                  Community Forum
                </a>
              </li>
              <li>
                <a
                  href="/360-virtual-showroom"
                  className="text-white hover:text-gray-200 block"
                  onClick={handleClose}
                >
                  360 virtual showroom
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-white hover:text-gray-200 block"
                  onClick={handleClose}
                >
                  About us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
