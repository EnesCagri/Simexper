"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { FeaturesGrid } from "@/components/sections/FeaturesGrid";
import { WhySimexper } from "@/components/sections/WhySimexper";
import { SimulationGallery } from "@/components/sections/SimulationGallery";
import { BlogSection } from "@/components/sections/BlogSection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950">
      <Navbar />
      <div className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.1),transparent_50%)] rotate-180" />
        <Hero />
        <FeaturesGrid />
        <WhySimexper />
        <SimulationGallery />
        <BlogSection />
      </div>
    </main>
  );
}
