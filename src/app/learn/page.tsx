"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Video,
  FileText,
  Brain,
  ChevronRight,
  ArrowRight,
  Play,
  File,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const materials = [
  {
    id: 1,
    title: "Fizik Temelleri",
    description: "Fizik biliminin temel kavramlarını öğrenin",
    type: "video",
    duration: "45 dk",
    level: "Başlangıç",
    image: "/images/education/physics-basics.jpg",
    link: "/education/physics-basics",
  },
  {
    id: 2,
    title: "Mekanik Formülleri",
    description: "Mekanik konularında kullanılan temel formüller",
    type: "article",
    duration: "30 dk",
    level: "Orta",
    image: "/images/education/mechanics.jpg",
    link: "/education/mechanics-formulas",
  },
  {
    id: 3,
    title: "Elektromanyetizma",
    description: "Elektrik ve manyetizma konularının detaylı anlatımı",
    type: "interactive",
    duration: "60 dk",
    level: "İleri",
    image: "/images/education/electromagnetism.jpg",
    link: "/education/electromagnetism",
  },
  {
    id: 4,
    title: "Termodinamik Prensipleri",
    description: "Isı ve enerji transferinin temel prensipleri",
    type: "video",
    duration: "50 dk",
    level: "Orta",
    image: "/images/education/thermodynamics.jpg",
    link: "/education/thermodynamics",
  },
  {
    id: 5,
    title: "Optik Deneyleri",
    description: "Işık ve optik konularında pratik deneyler",
    type: "interactive",
    duration: "40 dk",
    level: "Başlangıç",
    image: "/images/education/optics.jpg",
    link: "/education/optics",
  },
  {
    id: 6,
    title: "Modern Fizik",
    description: "Kuantum mekaniği ve görelilik teorisi",
    type: "article",
    duration: "90 dk",
    level: "İleri",
    image: "/images/education/modern-physics.jpg",
    link: "/education/modern-physics",
  },
];

const categories = [
  {
    id: "all",
    name: "Tümü",
    icon: BookOpen,
    count: 6,
  },
  {
    id: "video",
    name: "Videolar",
    icon: Video,
    count: 2,
  },
  {
    id: "article",
    name: "Makaleler",
    icon: FileText,
    count: 2,
  },
  {
    id: "interactive",
    name: "İnteraktif",
    icon: Brain,
    count: 2,
  },
];

const levels = [
  { name: "Başlangıç", color: "bg-green-500/20 text-green-400" },
  { name: "Orta", color: "bg-blue-500/20 text-blue-400" },
  { name: "İleri", color: "bg-purple-500/20 text-purple-400" },
];

export default function EducationPage() {
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
                Eğitim Materyalleri
              </span>
            </h1>
            <p className="text-lg text-gray-400 mb-8">
              Fizik öğrenimini destekleyen kapsamlı eğitim materyalleri
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
                <span className="text-sm bg-gray-800 px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {materials.map((material) => (
            <motion.div
              key={material.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative group"
            >
              {/* Gradient Border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-200" />

              {/* Material Card */}
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden group-hover:border-gray-700 transition-colors h-full">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={material.image}
                    alt={material.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
                      {material.type === "video" && (
                        <Play className="w-3 h-3 mr-1" />
                      )}
                      {material.type === "article" && (
                        <File className="w-3 h-3 mr-1" />
                      )}
                      {material.type === "interactive" && (
                        <Lightbulb className="w-3 h-3 mr-1" />
                      )}
                      {material.type}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400">
                      {material.duration}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {material.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{material.description}</p>
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        levels.find((l) => l.name === material.level)?.color
                      }`}
                    >
                      {material.level}
                    </span>
                    <Link
                      href={material.link}
                      className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors group/link"
                    >
                      İncele
                      <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Link href="/education/all">
            <Button
              variant="outline"
              className="h-12 px-8 group border-gray-800 hover:border-gray-700"
            >
              Tüm Materyalleri Gör
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
