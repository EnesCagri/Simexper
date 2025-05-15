"use client";

import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { HeroSection2 } from "@/components/sections/HeroSection2";
import { FeaturesGrid } from "@/components/sections/FeaturesGrid";
import { WhySimexper } from "@/components/sections/WhySimexper";
import { SimulationGallery } from "@/components/sections/SimulationGallery";
import { BlogSection } from "@/components/sections/BlogSection";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950">
      <div className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.1),transparent_50%)] rotate-180" />
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <HeroSection2 />
            <FeaturesGrid />
            <WhySimexper />
            <SimulationGallery />
            <BlogSection />
          </Suspense>
        </ErrorBoundary>
      </div>
    </main>
  );
}
