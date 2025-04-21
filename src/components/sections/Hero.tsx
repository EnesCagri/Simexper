"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Sparkles,
  Users,
  BookOpen,
  Star,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Aktif Kullanıcı", value: "10K+", icon: Users },
  { label: "Simülasyon", value: "50+", icon: Sparkles },
  { label: "Ders İçeriği", value: "100+", icon: BookOpen },
];

export function Hero() {
  return (
    <div className="relative pt-28 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gray-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(236,72,153,0.15),transparent_50%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 blur-3xl opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
        </div>
      </div>

      <div className="relative container mx-auto px-4">
        {/* Main Content */}
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="inline-flex items-center gap-2 bg-gray-900/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-800 mb-8">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-300">
                Yeni Simülasyonlar Eklendi
              </span>
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-8">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                Fiziği Öğrenmenin
              </span>
              <span className="block text-white mt-2">En İnteraktif Yolu</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Simexper ile fizik derslerini interaktif simülasyonlarla öğrenin.
              Karmaşık konuları eğlenceli ve anlaşılır hale getiriyoruz.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-200" />
                <Link href="/simulations">
                  <Button className="relative bg-gray-900 hover:bg-gray-800 text-white border-0 h-12 px-8">
                    Simülasyonları Keşfet
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link href="/learn">
                  <Button variant="outline" className="h-12 px-8 group">
                    Nasıl Çalışır
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-pink-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 group-hover:border-gray-700 transition-colors">
                  <stat.icon className="w-6 h-6 text-blue-400 mb-4 group-hover:text-blue-300 transition-colors" />
                  <div className="text-2xl font-bold text-white mb-1 bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/2 left-4 w-24 h-24 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-4 w-32 h-32 bg-pink-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
    </div>
  );
}
