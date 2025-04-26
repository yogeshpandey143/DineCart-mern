import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const MainBanner = () => {
  return (
    <div className="relative -z-1">
      {/* Background Images */}
      <img
        src={assets.main_banner_bg}
        alt="Main banner large"
        className="w-full hidden md:block"
      />
      <img
        src={assets.main_banner_bg_sm}
        alt="Main banner small"
        className="w-full md:hidden"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-[3.5rem]">
          Freshness you can trust. Savings you will love!
        </h1>

        {/* Buttons */}
        <div className="flex items-center mt-6 font-medium gap-4">
          <Link
            to="/shop"
            className="group flex items-center gap-2 px-7 md:px-10 py-3 bg-primary text-white hover:bg-primary-dull transition rounded cursor-pointer"
          >
            Shop Now
            <img
              className="md:hidden transition rounded"
              src={assets.white_arrow_icon}
              alt="white arrow"
            />
          </Link>

          <Link
            to="/explore"
            className="group hidden md:flex items-center gap-2 px-7 py-3 cursor-pointer"
          >
            Explore More
            <img
              className="transition group-hover:translate-x-2 rounded"
              src={assets.black_arrow_icon}
              alt="black arrow"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
