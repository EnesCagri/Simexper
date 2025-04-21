"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Star,
  ChevronRight,
  Brain,
  Zap,
  Lightbulb,
  Flame,
  Circle,
  Move,
  Battery,
  Target,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const DEFAULT_IMAGE = "/images/simulations/placeholder.jpg";

const simulations = [
  {
    id: "harmonic-motion",
    title: "Basit Harmonik Hareket",
    description: "Yay sistemlerinin harmonik hareketini inceleyin",
    category: "mekanik",
    difficulty: "Orta",
    icon: Brain,
    gradient: "from-blue-500 to-cyan-500",
    image: "/images/simulation/Resim1.png",
  },
  {
    id: "projectile-motion",
    title: "Eğik Atış Hareketi",
    description: "Eğik atış hareketini inceleyin",
    category: "mekanik",
    difficulty: "Orta",
    icon: Target,
    gradient: "from-blue-500 to-cyan-500",
    image: "/images/simulation/Resim2.png",
  },
  {
    id: "circular-motion",
    title: "Dairesel Hareket",
    description: "Dairesel hareketi inceleyin",
    category: "mekanik",
    difficulty: "Zor",
    icon: Circle,
    gradient: "from-blue-500 to-cyan-500",
    image: "/images/simulation/Resim3.jpg",
  },
  {
    id: "newtons-laws",
    title: "Newton'un Hareket Yasaları",
    description: "Newton'un hareket yasalarını keşfedin",
    category: "mekanik",
    difficulty: "Kolay",
    icon: Zap,
    gradient: "from-blue-500 to-cyan-500",
    image: "/images/simulation/Resim4.jpg",
  },
  {
    id: "momentum",
    title: "Momentum ve Çarpışmalar",
    description: "Momentum ve çarpışmaları inceleyin",
    category: "mekanik",
    difficulty: "Orta",
    icon: Move,
    gradient: "from-blue-500 to-cyan-500",
    image: "/images/simulation/Resim5.jpg",
  },
  {
    id: "energy",
    title: "Enerji ve İş",
    description: "Enerji dönüşümlerini keşfedin",
    category: "mekanik",
    difficulty: "Orta",
    icon: Battery,
    gradient: "from-blue-500 to-cyan-500",
    image: "/images/simulation/Resim6.jpg",
  },
  {
    id: "electric-field",
    title: "Elektrik Alan Çizgileri",
    description: "Elektrik yüklerinin oluşturduğu alanları keşfedin",
    category: "elektromanyetizma",
    difficulty: "İleri",
    icon: Zap,
    gradient: "from-purple-500 to-pink-500",
    image: "/images/simulation/Resim1.png",
  },
  {
    id: "magnetic-induction",
    title: "Manyetik İndüksiyon",
    description: "Manyetik alan ve indüksiyon akımlarını inceleyin",
    category: "elektromanyetizma",
    difficulty: "İleri",
    icon: Zap,
    gradient: "from-purple-500 to-pink-500",
    image: "/images/simulation/Resim2.png",
  },
  {
    id: "lenses",
    title: "Mercek Sistemleri",
    description: "Işığın merceklerdeki davranışını gözlemleyin",
    category: "optik",
    difficulty: "Orta",
    icon: Lightbulb,
    gradient: "from-green-500 to-emerald-500",
    image: "/images/simulation/Resim3.jpg",
  },
  {
    id: "heat-transfer",
    title: "Isı Transferi",
    description: "Farklı ısı transfer mekanizmalarını inceleyin",
    category: "termodinamik",
    difficulty: "Orta",
    icon: Flame,
    gradient: "from-yellow-500 to-amber-500",
    image: "/images/simulation/Resim4.jpg",
  },
] as const;

const categories = [
  { id: "all", name: "Tümü", icon: BookOpen },
  { id: "mekanik", name: "Mekanik", icon: Target },
  { id: "elektromanyetizma", name: "Elektromanyetizma", icon: Zap },
  { id: "optik", name: "Optik", icon: Lightbulb },
  { id: "termodinamik", name: "Termodinamik", icon: Flame },
];

const difficultyColors = {
  Kolay: "bg-green-500/20 text-green-400",
  Orta: "bg-blue-500/20 text-blue-400",
  Zor: "bg-purple-500/20 text-purple-400",
  İleri: "bg-red-500/20 text-red-400",
};

export default function SimulationsPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gray-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.1),transparent_50%)]" />
        </div>

        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                Fizik Simülasyonları
              </span>
            </h1>
            <p className="text-lg text-gray-400 mb-8">
              İnteraktif deneyler ile fiziği keşfedin ve öğrenin
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-24">
        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900/50 text-gray-400 hover:bg-gray-800/50 transition-all duration-300"
              >
                <Icon className="w-4 h-4" />
                <span>{category.name}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Simulations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {simulations.map((simulation) => {
            const Icon = simulation.icon;
            return (
              <motion.div
                key={simulation.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative group"
              >
                {/* Gradient Border */}
                <div
                  className={`absolute -inset-0.5 bg-gradient-to-r ${simulation.gradient} rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-200`}
                />

                {/* Simulation Card */}
                <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden group-hover:border-gray-700 transition-colors h-full">
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={simulation.image}
                      alt={simulation.title}
                      fill
                      className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-${
                          simulation.category === "mekanik"
                            ? "blue"
                            : simulation.category === "elektromanyetizma"
                            ? "purple"
                            : simulation.category === "optik"
                            ? "green"
                            : "yellow"
                        }-500/20 text-${
                          simulation.category === "mekanik"
                            ? "blue"
                            : simulation.category === "elektromanyetizma"
                            ? "purple"
                            : simulation.category === "optik"
                            ? "green"
                            : "yellow"
                        }-400`}
                      >
                        {simulation.category.charAt(0).toUpperCase() +
                          simulation.category.slice(1)}
                      </span>
                    </div>

                    {/* Difficulty Badge */}
                    <div className="absolute top-4 right-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          difficultyColors[
                            simulation.difficulty as keyof typeof difficultyColors
                          ]
                        }`}
                      >
                        {simulation.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-br ${simulation.gradient} bg-opacity-10 backdrop-blur-sm ring-1 ring-white/10`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                        {simulation.title}
                      </h3>
                    </div>

                    <p className="text-gray-400 mb-6">
                      {simulation.description}
                    </p>

                    <div className="mt-auto">
                      <Link
                        href={`/simulations/${simulation.id}`}
                        className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors group/link"
                      >
                        Simülasyona Git
                        <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
