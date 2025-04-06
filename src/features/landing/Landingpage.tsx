import React from "react";
import Navbar from "./Navbar"; // Adjust the path if necessary
import { Hero } from "./Hero";
import { Features } from "./Features";
import { About } from "./About";
import { Partners } from "./Partners";
import { Footer } from "./Footer";
import { Sections } from "./Sections";

export const LandingPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-white">
      <Navbar  /> {/* Pass the title prop */}
      <Hero />
      <Features />
      <About />
      <Sections />
      <Partners />
      <Footer />
    </main>
  );
};