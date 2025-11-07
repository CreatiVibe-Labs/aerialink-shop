"use client";
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
    <nav className=" center  z-50 w-full sticky top-5">
      <div className="bg-primary p-4  py-3 rounded-full  center-between max-w-7xl w-full max-2xl:mx-15 max-md:mx-10 max-sm:mx-3">
        {/* Mobile Menu Button */}
        <div className="center">
          <button
            onClick={handleToggle}
            className="menu-btn text-white focus:outline-none mr-2 md:hidden"
          >
            <IoIosMenu size={32} strokeWidth={1} />
          </button>
          <div className="text-white font-bold text-xl">@erialink</div>
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
        <ul className="hidden md:flex space-x-6">
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
              href="/wishlist/"
              className="text-white hover:text-gray-200"
              onClick={handleClose}
            >
              Wishlist
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
          className={`fixed inset-0 bg-black/10 z-40 transition-opacity ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={handleClose}
        >
          <div
            className={`sidebar fixed top-0 left-0 w-64 bg-primary h-full p-6 transform transition-transform ${
              isOpen ? "translate-x-0" : "-translate-x-full"
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

              <li>
                <a
                  href="/wishlist"
                  className="text-white hover:text-gray-200 block"
                  onClick={handleClose}
                >
                  Wishlist
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
