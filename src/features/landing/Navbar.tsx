"use client";

import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md py-4 px-10">
      <nav className="flex justify-end items-center max-w-screen-xl mx-auto">
        {/* Navigation Links */}
        <ul className="flex gap-6 items-center font-medium text-black">
          <li>
            <Link to="/" className="hover:text-blue-500 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-500 transition-colors">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-blue-500 transition-colors">
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Auth Buttons */}
        <div className="flex gap-4 ml-8">
  <button
    className="w-[100px] h-[40px] text-white rounded-xl transition-colors flex justify-center items-center"
    style={{ backgroundColor: "#1E4D92" }}
    onClick={() => navigate("/login")}
  >
    Login
  </button>

  <button
    className="w-[100px] h-[40px] bg-gray-300 rounded-xl text-gray-900 hover:bg-gray-400 transition-colors flex justify-center items-center"
    onClick={() => navigate("/signup")}
  >
    Sign up
  </button>
</div>

      </nav>
    </header>
  );
}
