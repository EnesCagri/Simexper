"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Brain,
  Zap,
  Lightbulb,
  Flame,
  Filter,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

type Category =
  | "all"
  | "mekanik"
  | "elektromanyetizma"
  | "optik"
  | "termodinamik";

const simulations = [
  {
    id: 1,
    title: "Basit Harmonik Hareket",
    description: "Yay sistemlerinin harmonik hareketini inceleyin",
    image: "/images/Resim1.png",
    category: "mekanik",
    difficulty: "Orta",
    link: "/simulations/harmonic-motion",
  },
  {
    id: 2,
    title: "Eğik Atış Hareketi",
    description: "Açılı fırlatılan cisimlerin yörüngelerini analiz edin",
    image: "/images/Resim2.png",
    category: "mekanik",
    difficulty: "Başlangıç",
    link: "/simulations/projectile-motion",
  },
  {
    id: 3,
    title: "Çarpışmalar",
    description: "Elastik ve esnek çarpışmaları keşfedin",
    image: "/images/Resim3.jpg",
    category: "mekanik",
    difficulty: "İleri",
    link: "/simulations/collisions",
  },
  {
    id: 4,
    title: "Elektrik Alan Çizgileri",
    description: "Elektrik yüklerinin oluşturduğu alanları keşfedin",
    image: "/images/Resim4.jpg",
    category: "elektromanyetizma",
    difficulty: "İleri",
    link: "/simulations/electric-field",
  },
  {
    id: 5,
    title: "Manyetik İndüksiyon",
    description: "Manyetik alan ve indüksiyon akımlarını inceleyin",
    image: "/images/Resim5.jpg",
    category: "elektromanyetizma",
    difficulty: "İleri",
    link: "/simulations/magnetic-induction",
  },
  {
    id: 6,
    title: "Mercek Sistemleri",
    description: "Işığın merceklerdeki davranışını gözlemleyin",
    image: "/images/Resim6.jpg",
    category: "optik",
    difficulty: "Orta",
    link: "/simulations/lenses",
  },
  {
    id: 7,
    title: "Isı Transferi",
    description: "Farklı ısı transfer mekanizmalarını inceleyin",
    image: "/images/Resim1.png",
    category: "termodinamik",
    difficulty: "Orta",
    link: "/simulations/heat-transfer",
  },
];

const categories = [
  { id: "all", name: "Tümü", icon: Filter },
  { id: "mekanik", name: "Mekanik", icon: Brain },
  { id: "elektromanyetizma", name: "Elektromanyetizma", icon: Zap },
  { id: "optik", name: "Optik", icon: Lightbulb },
  { id: "termodinamik", name: "Termodinamik", icon: Flame },
];

const categoryColors = {
  mekanik: "from-blue-500 to-cyan-500",
  elektromanyetizma: "from-purple-500 to-pink-500",
  optik: "from-orange-500 to-yellow-500",
  termodinamik: "from-red-500 to-orange-500",
};

export function SimulationGallery() {
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredSimulations = simulations.filter(
    (sim) => selectedCategory === "all" || sim.category === selectedCategory
  );

  if (!mounted) {
    return (
      <section className="relative py-24 overflow-hidden bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                Simülasyon Galerisi
              </span>
            </h2>
            <p className="text-lg text-gray-400">
              İnteraktif fizik simülasyonları ile öğrenmeyi keşfedin
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden h-[400px] animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-24 overflow-hidden bg-gray-950">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gray-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.1),transparent_50%)]" />
      </div>

      <div className="relative container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Simülasyon Galerisi
            </span>
          </h2>
          <p className="text-lg text-gray-400">
            İnteraktif fizik simülasyonları ile öğrenmeyi keşfedin
          </p>
        </motion.div>

        {/* Category Filter */}
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
                onClick={() => setSelectedCategory(category.id as Category)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    : "bg-gray-900/50 text-gray-400 hover:bg-gray-800/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{category.name}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Simulation Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredSimulations.map((simulation) => (
              <motion.div
                key={simulation.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                onHoverStart={() => setHoveredId(simulation.id)}
                onHoverEnd={() => setHoveredId(null)}
                className="relative group"
              >
                {/* Gradient Border */}
                <div
                  className={`absolute -inset-0.5 bg-gradient-to-r ${
                    categoryColors[
                      simulation.category as keyof typeof categoryColors
                    ]
                  } rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-200`}
                />

                {/* Card */}
                <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden group-hover:border-gray-700 transition-colors h-full">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={simulation.image}
                      alt={simulation.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      priority={simulation.id <= 3}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
                        {simulation.category}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400">
                        {simulation.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {simulation.title}
                    </h3>
                    <p className="text-gray-400 mb-6">
                      {simulation.description}
                    </p>

                    <Link
                      href={simulation.link}
                      className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors group/link"
                    >
                      Simülasyonu Keşfet
                      <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Link href="/simulations">
            <Button
              variant="outline"
              className="h-12 px-8 group border-gray-800 hover:border-gray-700"
            >
              Tüm Simülasyonları Keşfet
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 right-8 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-8 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
    </section>
  );
}
