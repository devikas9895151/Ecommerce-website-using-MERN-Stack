import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="px-6 py-16 bg-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-24">

        {/* Left Section - Logo & Description */}
        <div className="w-full md:w-1/3 flex flex-col space-y-4 text-left">
          <img src={assets.logo} className="w-40 h-auto" alt="Fabrica Logo" />
          <p className="text-gray-600 leading-relaxed">
          At Fabrica, we believe in creativity, sustainability, and progress, ensuring that every product and service we offer is crafted with precision and passion. Join us in shaping the future—because at Fabrica, the possibilities are endless! 🚀
          </p>
        </div>

        {/* Middle Section - Company Links */}
        <div className="w-full md:w-1/5 flex flex-col space-y-4 text-left">
          <p className="text-lg font-semibold">COMPANY</p>
          <ul className="space-y-2 text-gray-600">
            <li><a href="#">Home</a></li>
            <li><a href="#">About us</a></li>
            <li><a href="#">Delivery</a></li>
            <li><a href="#">Privacy policy</a></li>
          </ul>
        </div>

        {/* Right Section - Contact */}
        <div className="w-full md:w-1/5 flex flex-col space-y-4 text-left">
          <p className="text-lg font-semibold">GET IN TOUCH</p>
          <ul className="space-y-2 text-gray-600">
            <li>📞 +1-212-456-7890</li>
            <li>📧 <a href="mailto:contact@fabricayou.com" className="text-blue-600 underline">contact@fabricayou.com</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center text-gray-500 text-sm mt-10 border-t pt-4">
        © 2025 Fabrica.com | All Rights Reserved
      </div>
    </div>
  );
};

export default Footer;
