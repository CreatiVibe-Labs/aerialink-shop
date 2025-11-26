import React from "react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="max-w-7xl mx-auto  my-10">
      <h1 className="text-[40px] font-bold text-[#AFB1AE] mb-3">Free Samples</h1>
      <p className="text-[#AFB1AE] text-[20px] mb-4">
        Our online <span className="font-semibold">360º Virtual Showroom</span> allows you to visualize how your selected
        carpet will look in your room—try it now!
      </p>
      <p className="text-[#AFB1AE] text-[20px] mb-4">
        We also offer free small cut samples (approximately <span className="font-semibold">5cm x 5cm</span>) of the carpet, so
        you can check the actual color and material. These samples will be delivered by mail, and may take up to one
        week to arrive. Please note that delivery on a specific date is not available for sample orders, as they are
        provided at no cost.
      </p>
      <p className="text-[#AFB1AE] text-[20px] mb-4">
        Delivery may be delayed or halted if the delivery address is incomplete, incorrect, or if the nameplate is
        missing. Samples cannot be shipped together with other products, and sample orders are limited to one set per
        delivery address.
      </p>

      <h2 className="text-2xl font-semibold text-[#AFB1AE] mt-10 mb-4">Sample Request</h2>
      <p className="text-[#AFB1AE] text-[20px] mb-6">
        Choose your desired samples by clicking on the product image listed below, then fill out the contact information
        and delivery address. Your samples will arrive soon.
      </p>

      

      {/* <div className="bg-gray-50 border rounded p-6 ">
        <h3 className="text-xl text-[#AFB1AE] font-semibold mb-3">Request Form (Coming Soon)</h3>
        <p className="text-[#AFB1AE] text-[20px] mb-4">We will add an interactive form here for submitting your sample request.</p>
        <Link href="/360-virtual-showroom" className="inline-block px-5 py-2 bg-primary text-white rounded-xl shadow hover:opacity-90 transition">
          Explore 360º Virtual Showroom
        </Link>
      </div> */}
    </div>
  );
};

export default Page;
