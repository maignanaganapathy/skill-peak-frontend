"use client";
import React from "react";
import FaceBook from "./assets/FaceBook.svg"; 
import Instagram from "./assets/Instagram.svg"; 
import twitter from "./assets/twitter.svg"; 
import logo from "./assets/logo.svg"; 
export const Footer: React.FC = () => {
  return (
    <footer className="px-0 pt-16 pb-8 text-white" style={{ backgroundColor: "#3E7CB1" }}>

      <div className="flex justify-between px-5 py-0 mx-auto my-0 max-w-[1200px] max-md:flex-col max-md:gap-10 max-md:text-center">
      <div className="relative max-w-[300px]">
          <img
           src={logo}
            alt="Footer Logo"
            className="mt-[-42px] w-20 h-[60px]"
          />
          <p className="mb-5 text-sm font-medium">
            From Training to Transformation
            <br />
            Elevate Your skill with RIPE.
          </p>
          <address className="text-sm not-italic">
            <p>Chennai</p>
            <p>training@goripe.com</p>
            <p>+91 9962514135</p>
          </address>
        </div>
        <nav className="flex gap-20 max-md:flex-col max-md:gap-8 max-md:items-center">
          <div>
          <h2 className="font-bold">PRODUCTS</h2>

            <div className="text-sm leading-6">
              <a href="#">Online Courses</a>
              <br />
              <a href="#">Mock Test</a>
              <br />
              <a href="#">Digital Products</a>
              <br />
              <a href="#">Communities</a>
            </div>
          </div>
          <div>
          <h2 className="font-bold">COMPANY</h2>
            <div className="text-sm leading-6">
              <a href="#">About Us</a>
              <br />
              <a href="#">Success Stories</a>
              <br />
              <a href="#">Testimonials</a>
              <br />
              <a href="#">Career</a>
            </div>
          </div>
          <div>
          <h2 className="font-bold">SUPPORT</h2>
            <div className="text-sm leading-6">
              <a href="#">Contact Us</a>
              <br />
              <a href="#">Privacy Policy</a>
              <br />
              <a href="#">Terms & Conditions</a>
            </div>
          </div>
          <div>
          <h2 className="font-bold">RESOURCES</h2>
            <div className="text-sm leading-6">
              <a href="#">What's New</a>
              <br />
              <a href="#">Blogs</a>
              <br />
              <a href="#">Product Demo</a>
              <br />
              <a href="#">Help Center</a>
            </div>
          </div>
        </nav>
      </div>

    <div className="flex gap-5 justify-center mx-0 my-10">
      <a
        href="#"
        aria-label="Instagram"
        className="hover:opacity-80 transition-opacity"
      >
        <img src={Instagram} alt="Instagram" className="w-6 h-6" />
      </a>
      <a
        href="#"
        aria-label="Twitter"
        className="hover:opacity-80 transition-opacity"
      >
        <img src={twitter} alt="Twitter" className="w-6 h-6" />
      </a>
      <a
        href="#"
        aria-label="Facebook"
        className="hover:opacity-80 transition-opacity"
      >
        <img src={FaceBook} alt="Facebook" className="w-6 h-6" />
      </a>
    </div>
 

      <p className="text-sm font-light text-center">
        Copyright © 2025 RIPE skill Peak LMS. All Rights Reserved
      </p>
    </footer>
  );
};
