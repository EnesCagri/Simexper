"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getSimulations } from "@/db/utils";
import type { SimulationData } from "@/db/types";

const DEFAULT_IMAGE = "/images/simulation/default-cover.jpg";

const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function SimulationGallery() {
  const [mounted, setMounted] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [simulations, setSimulations] = useState<SimulationData[]>([]);

  useEffect(() => {
    setMounted(true);
    const sims = getSimulations();
    // Only show first 8 simulations in the gallery
    setSimulations(sims.slice(0, 8));
  }, []);

  return (
    <section className="relative py-24 overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#1a237e,transparent_70%)] opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,#0d47a1,transparent_70%)] opacity-15" />
        <div className="absolute inset-0 bg-grid-white/[0.01]" />

        {/* Decorative Orbs */}
        <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-blue-600/5 rounded-full blur-2xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4">
        {/* Title Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Sparkles className="w-6 h-6 text-blue-500" />
            <span className="text-blue-500 font-medium">
              İnteraktif Öğrenme
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
              Fiziği Keşfetmenin En İyi Yolu
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 text-lg md:text-xl"
          >
            Teorik bilgileri pratiğe dökün, kavramları derinlemesine anlayın.
            Her simülasyon, fizik yasalarını keşfetmeniz için özel olarak
            tasarlandı.
          </motion.p>
        </div>

        {/* Simulations Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="wait">
            {simulations.map((simulation) => (
              <motion.div
                key={simulation.id}
                variants={item}
                className="group relative aspect-[4/5] rounded-xl overflow-hidden ring-1 ring-white/5 transition-all duration-300 hover:ring-2 hover:ring-blue-500/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                onHoverStart={() => setHoveredId(simulation.id)}
                onHoverEnd={() => setHoveredId(null)}
              >
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={
                      hoveredId === simulation.id
                        ? simulation.previewGif ||
                          simulation.coverImage ||
                          simulation.image ||
                          DEFAULT_IMAGE
                        : simulation.coverImage ||
                          simulation.image ||
                          DEFAULT_IMAGE
                    }
                    alt={simulation.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = DEFAULT_IMAGE;
                    }}
                  />
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 animate-shine" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent translate-y-18 group-hover:translate-y-0 transition-transform duration-300">
                  {/* Tags */}
                  <div className="flex gap-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs backdrop-blur-sm border border-blue-500/20">
                      {simulation.category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs backdrop-blur-sm border border-blue-500/20">
                      {simulation.difficulty}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-2">
                    {simulation.title}
                  </h3>

                  <p className="text-sm text-gray-300 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 line-clamp-3">
                    {simulation.description}
                  </p>

                  {/* Action Button */}
                  <Link
                    href={`/simulations/${simulation.slug}`}
                    className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-gradient-to-r from-blue-500/20 to-blue-600/20 hover:from-blue-500/30 hover:to-blue-600/30 backdrop-blur-sm rounded-lg text-white text-sm font-medium transition-all duration-300 border border-blue-500/20 hover:border-blue-500/40 group/button"
                  >
                    <span>Simülasyonu Dene</span>
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover/button:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mt-16"
        >
          <Link
            href="/simulations"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-white font-medium rounded-2xl transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02] overflow-hidden"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

            {/* Button content */}
            <span className="relative">Tüm Simülasyonları Keşfet</span>
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform relative" />
          </Link>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) rotate(45deg);
          }
        }
        .animate-shine {
          animation: shine 1.5s infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
