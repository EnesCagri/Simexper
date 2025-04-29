"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  PlayCircle,
  LineChart,
  Maximize2,
  Settings2,
  Play,
  Pause,
  RefreshCw,
  ChevronRight,
  Sliders,
  Download,
  Share2,
} from "lucide-react";

export function HeroSection2() {
  return (
    <section className="relative min-h-screen py-20 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#1a237e,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,#0d47a1,transparent_50%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="flex flex-col items-center">
          {/* Hero Content */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            {/* New feature tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-blue-950/60 rounded-full px-4 py-2 mb-8"
            >
              <span className="text-blue-400 text-sm">Yeni</span>
              <span className="text-gray-400 text-sm">
                İnteraktif Fizik Simülasyonları →
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl lg:text-6xl font-bold mb-6"
            >
              Fiziği
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                Deneyimleyerek Öğren
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-400 text-lg mb-8"
            >
              Modern görselleştirmeler ve gerçek zamanlı analizlerle fizik
              kavramlarını interaktif simülasyonlar üzerinde keşfedin.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link
                href="/simulations"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02] group"
              >
                Simülasyonları Keşfet
                <ChevronRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-all duration-300 backdrop-blur-sm">
                <PlayCircle className="w-5 h-5 mr-2" />
                Nasıl Çalışır?
              </button>
            </motion.div>
          </div>

          {/* Simulation Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full max-w-[1200px] mx-auto relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-gray-900/90 backdrop-blur-sm">
              {/* Header */}
              <div className="flex items-center justify-between px-8 py-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-red-500" />
                  <div className="w-4 h-4 rounded-full bg-yellow-500" />
                  <div className="w-4 h-4 rounded-full bg-green-500" />
                </div>
                <div className="flex items-center gap-4">
                  <button className="p-3 hover:bg-white/5 rounded-lg transition-colors">
                    <Share2 className="w-6 h-6 text-gray-400" />
                  </button>
                  <button className="p-3 hover:bg-white/5 rounded-lg transition-colors">
                    <Download className="w-6 h-6 text-gray-400" />
                  </button>
                  <button className="p-3 hover:bg-white/5 rounded-lg transition-colors">
                    <Maximize2 className="w-6 h-6 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Simulation Content */}
              <div className="p-10">
                {/* Title */}
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h3 className="text-3xl font-medium text-white mb-3">
                      Göreli Hız
                    </h3>
                    <p className="text-gray-400 text-lg">Akıntı simülasyonu</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="p-4 bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors">
                      <Play className="w-6 h-6 text-white" />
                    </button>
                    <button className="p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
                      <Pause className="w-6 h-6 text-gray-400" />
                    </button>
                    <button className="p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
                      <RefreshCw className="w-6 h-6 text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Screenshot */}
                <div className="relative aspect-[16/9] mb-10 rounded-xl overflow-hidden">
                  <Image
                    src="/images/simulation/Resim5.jpg"
                    alt="Basit Harmonik Hareket Simülasyonu"
                    fill
                    className="object-cover rounded-xl"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
