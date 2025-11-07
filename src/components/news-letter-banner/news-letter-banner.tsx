"use client";
import React from "react";
import NewsLetterForm from "./components/news-letter-form";

const NewsLetterBanner: React.FC = () => {

  return (
    <div className="min-h-42 center-between bg-primary p-5 max-sm:mx-3 max-sm:rounded-3xl">
      {/* container */}
      <div className="grid grid-cols-2 max-sm:grid-cols-1 max-w-7xl mx-auto">
        {/* left side */}
        <div className="center max-sm:hidden">
          <h2 className="text-[3vmax] max-md:text-[2.5vmax] italic font-bold  text-white">
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </h2>
        </div>

        {/* right side */}
        <div className="center-col items-end">
          <NewsLetterForm />
        </div>
      </div>
    </div>
  );
};

export default NewsLetterBanner;
