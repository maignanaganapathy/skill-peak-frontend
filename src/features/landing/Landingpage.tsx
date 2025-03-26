// Correct relative path
"use client";
import React from "react";
import Navbar from "./Navbar"; 
import { Hero } from "./Hero";
import { Features } from "./Features";
import { About } from "./About";
import { Partners } from "./Partners";
import { Footer } from "./Footer";

export const LandingPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <About />
      <Partners />
      <Footer />
    </main>
  );
};
