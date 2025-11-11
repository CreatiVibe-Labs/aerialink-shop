"use client";
import React from "react";
import NewsLetterForm from "./components/news-letter-form";

const NewsLetterBanner: React.FC = () => {

  return (
    <div className="min-h-42 center-between bg-primary p-5 max-sm:mx-3 max-sm:rounded-3xl">
      {/* container */}
      <div className="grid grid-cols-2 max-sm:grid-cols-1 max-w-7xl mx-auto">
        {/* left side */}
        <div className="center">
          <h2 className="xl:text-5xl lg:text-4xl md:text-3xl text-2xl xl:mb-0 lg:mb-0 md:mb-0 mb-5 italic font-extrabold text-white">
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
