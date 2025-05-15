"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Grid2x2,
  LayoutList,
  Search,
  FilterX,
  X,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useMemo, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getSimulations } from "@/db/utils";

const DEFAULT_IMAGE = "/images/simulations/placeholder.jpg";

const ITEMS_PER_PAGE = 12;

const categories = [
  { id: "all", name: "Tümü" },
  { id: "mekanik", name: "Mekanik" },
  { id: "elektromanyetizma", name: "Elektromanyetizma" },
  { id: "optik", name: "Optik" },
  { id: "termodinamik", name: "Termodinamik" },
  { id: "modern-fizik", name: "Modern Fizik" },
];

const classLevels = [
  { id: "all", name: "Tüm Sınıflar" },
  { id: "3", name: "3. Sınıf" },
  { id: "4", name: "4. Sınıf" },
  { id: "5", name: "5. Sınıf" },
  { id: "6", name: "6. Sınıf" },
  { id: "7", name: "7. Sınıf" },
  { id: "8", name: "8. Sınıf" },
  { id: "9", name: "9. Sınıf" },
  { id: "10", name: "10. Sınıf" },
  { id: "11", name: "11. Sınıf" },
  { id: "12", name: "12. Sınıf" },
];

const difficultyColors = {
  Kolay: "text-green-400",
  Orta: "text-blue-400",
  Zor: "text-purple-400",
  İleri: "text-red-400",
};

const keywords = [
  { id: "kinematik", label: "Kinematik" },
  { id: "dinamik", label: "Dinamik" },
  { id: "enerji", label: "Enerji" },
  { id: "momentum", label: "Momentum" },
  { id: "elektrik", label: "Elektrik" },
  { id: "manyetizma", label: "Manyetizma" },
  { id: "optik", label: "Optik" },
  { id: "dalgalar", label: "Dalgalar" },
  { id: "termodinamik", label: "Termodinamik" },
  { id: "kuantum", label: "Kuantum Fiziği" },
];

export default function SimulationsPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedClassLevel, setSelectedClassLevel] = useState<string>("all");
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>(
    []
  );
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("popularity");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [heroCategory, setHeroCategory] = useState<string>("all");
  const [carouselIndex, setCarouselIndex] = useState(0);

  const simulations = getSimulations();

  const filteredSimulations = useMemo(() => {
    return simulations
      .filter((simulation) => {
        const searchLower = search.toLowerCase();
        const matchesSearch =
          simulation.title.toLowerCase().includes(searchLower) ||
          simulation.description.toLowerCase().includes(searchLower);
        const matchesCategory =
          selectedCategory === "all" ||
          simulation.category === selectedCategory;
        const matchesClassLevel =
          selectedClassLevel === "all" ||
          simulation.classLevel === selectedClassLevel;
        const matchesDifficulty =
          selectedDifficulties.length === 0 ||
          selectedDifficulties.includes(simulation.difficulty);
        const matchesKeywords =
          selectedKeywords.length === 0 ||
          selectedKeywords.some((keyword) =>
            simulation.keywords.some((k) =>
              k.toLowerCase().includes(keyword.toLowerCase())
            )
          );

        return (
          matchesSearch &&
          matchesCategory &&
          matchesClassLevel &&
          matchesDifficulty &&
          matchesKeywords
        );
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "popularity":
            return b.points - a.points;
          case "name_asc":
            return a.title.localeCompare(b.title);
          case "name_desc":
            return b.title.localeCompare(a.title);
          case "difficulty_asc":
            return a.points - b.points;
          case "difficulty_desc":
            return b.points - a.points;
          default:
            return 0;
        }
      });
  }, [
    search,
    selectedCategory,
    selectedClassLevel,
    selectedDifficulties,
    selectedKeywords,
    sortBy,
  ]);

  const paginatedSimulations = filteredSimulations.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Most popular simulations for hero slider (filtered by heroCategory)
  const heroSimulations = useMemo(() => {
    let sims = [...simulations];
    if (heroCategory !== "all") {
      sims = sims.filter((sim) => sim.category === heroCategory);
    }
    return sims.sort((a, b) => b.points - a.points).slice(0, 8);
  }, [simulations, heroCategory]);

  // Clamp carouselIndex if heroSimulations changes
  useEffect(() => {
    if (carouselIndex >= heroSimulations.length) {
      setCarouselIndex(0);
    }
  }, [heroSimulations, carouselIndex]);

  const currentSim = heroSimulations[carouselIndex];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#0d47a1] to-black pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="relative w-full flex flex-col items-center justify-center py-20 mb-16 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-blue-800/20 to-black/90 backdrop-blur-sm" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

          {/* Animated Background Circles */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-blue-500/10 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.2, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              Simülasyonlar Dünyasına Hoş Geldin!
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Fizik kavramlarını interaktif simülasyonlarla keşfet, deneyimle ve
              öğren. En popüler simülasyonları hemen dene veya kategorilere göz
              at!
            </p>
          </motion.div>

          {/* Category Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 flex flex-wrap justify-center gap-3 mb-12"
          >
            <button
              onClick={() => setHeroCategory("all")}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                heroCategory === "all"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : "bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur-sm"
              }`}
            >
              Tümü
            </button>
            {categories
              .filter((c) => c.id !== "all")
              .map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setHeroCategory(cat.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    heroCategory === cat.id
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                      : "bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur-sm"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
          </motion.div>

          {/* Custom Big Card Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative w-full max-w-6xl h-[500px] flex items-center justify-center select-none"
          >
            {/* Card */}
            <AnimatePresence mode="wait">
              {currentSim && (
                <motion.div
                  key={currentSim.id}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="flex w-full h-full bg-gradient-to-br from-[#1A1B1E] to-[#2A2B2E] rounded-3xl shadow-2xl overflow-hidden border border-white/10 backdrop-blur-sm"
                >
                  {/* Image/Video */}
                  <div className="relative w-2/3 h-full flex-shrink-0 group">
                    <Image
                      src={currentSim.image || DEFAULT_IMAGE}
                      alt={currentSim.title}
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      priority
                    />
                    {/* Gradient Overlays - Lighter version */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                    {/* Difficulty Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="absolute top-8 left-8 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md text-base font-bold text-white shadow-lg border border-white/20"
                    >
                      {currentSim.difficulty}
                    </motion.div>

                    {/* Category Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="absolute top-8 right-8 px-5 py-2.5 rounded-full bg-blue-500/10 backdrop-blur-md text-base font-medium text-blue-200 shadow-lg border border-blue-500/20"
                    >
                      {currentSim.category}
                    </motion.div>

                    {/* Points Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="absolute bottom-8 left-8 px-5 py-2.5 rounded-full bg-yellow-500/10 backdrop-blur-md text-base font-bold text-yellow-200 shadow-lg border border-yellow-500/20"
                    >
                      {currentSim.points} Puan
                    </motion.div>
                  </div>

                  {/* Info Panel */}
                  <div className="flex flex-col justify-between p-14 w-1/3 h-full bg-gradient-to-br from-[#1A1B1E]/90 to-[#2A2B2E]/90 backdrop-blur-md">
                    <div className="space-y-8">
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl font-bold text-white line-clamp-2 leading-tight"
                      >
                        {currentSim.title}
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-200 text-xl leading-relaxed line-clamp-4"
                      >
                        {currentSim.description}
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap gap-3"
                      >
                        {currentSim.keywords?.slice(0, 4).map((kw) => (
                          <span
                            key={kw}
                            className="px-5 py-2.5 rounded-full bg-blue-500/10 text-blue-200 text-sm font-medium border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
                          >
                            {kw}
                          </span>
                        ))}
                      </motion.div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex items-center justify-end mt-8"
                    >
                      <Link
                        href={`/simulations/${currentSim.id}`}
                        className="group relative px-10 py-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105"
                      >
                        <span className="relative z-10">İncele</span>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <motion.button
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(59, 130, 246, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                setCarouselIndex(
                  (prev) =>
                    (prev - 1 + heroSimulations.length) % heroSimulations.length
                )
              }
              className="absolute left-4 z-10 bg-black/40 text-white rounded-full w-14 h-14 flex items-center justify-center text-3xl transition-all backdrop-blur-md border border-white/10 hover:border-blue-500/50"
              aria-label="Önceki"
              style={{ top: "50%", transform: "translateY(-50%)" }}
              disabled={heroSimulations.length === 0}
            >
              &#8592;
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(59, 130, 246, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                setCarouselIndex((prev) => (prev + 1) % heroSimulations.length)
              }
              className="absolute right-4 z-10 bg-black/40 text-white rounded-full w-14 h-14 flex items-center justify-center text-3xl transition-all backdrop-blur-md border border-white/10 hover:border-blue-500/50"
              aria-label="Sonraki"
              style={{ top: "50%", transform: "translateY(-50%)" }}
              disabled={heroSimulations.length === 0}
            >
              &#8594;
            </motion.button>

            {/* Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
              {heroSimulations.map((_, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCarouselIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    carouselIndex === idx
                      ? "bg-blue-500 shadow-lg shadow-blue-500/50 scale-125"
                      : "bg-gray-600/50 hover:bg-gray-500/50"
                  }`}
                  aria-label={`Simülasyon ${idx + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </section>
        {/* Header with result count and search */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold">
            {filteredSimulations.length} simülasyon
          </h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Simülasyon ara..."
                className="w-[300px] pl-10 bg-[#1A1B1E] border-[#2A2B2E] focus:border-blue-500/50"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 border-2 border-[#2A2B2E] rounded-md p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${
                  viewMode === "grid"
                    ? "bg-[#2A2B2E] text-white"
                    : "text-gray-400"
                }`}
              >
                <Grid2x2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${
                  viewMode === "list"
                    ? "bg-[#2A2B2E] text-white"
                    : "text-gray-400"
                }`}
              >
                <LayoutList className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Keywords Section */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword) => (
              <button
                key={keyword.id}
                type="button"
                onClick={() => {
                  setSelectedKeywords((prev) =>
                    prev.includes(keyword.id)
                      ? prev.filter((k) => k !== keyword.id)
                      : [...prev, keyword.id]
                  );
                }}
                className={`px-3 py-1.5 rounded-full text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-95 select-none cursor-pointer ${
                  selectedKeywords.includes(keyword.id)
                    ? "bg-blue-500 text-white shadow-lg"
                    : "bg-[#1A1B1E] text-gray-400 hover:bg-blue-900/30 hover:text-white"
                }`}
                tabIndex={0}
              >
                {keyword.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main content layout */}
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="space-y-6">
              {/* Categories */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Kategoriler</h3>
                <ScrollArea className="h-[200px] pr-4">
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-3 py-2 rounded hover:bg-[#2A2B2E] transition-colors ${
                          selectedCategory === category.id
                            ? "bg-[#2A2B2E] text-white"
                            : "text-gray-400"
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Class Levels */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Sınıf Seviyesi</h3>
                <ScrollArea className="h-[200px] pr-4">
                  <div className="space-y-2">
                    {classLevels.map((level) => (
                      <button
                        key={level.id}
                        onClick={() => setSelectedClassLevel(level.id)}
                        className={`w-full text-left px-3 py-2 rounded hover:bg-[#2A2B2E] transition-colors ${
                          selectedClassLevel === level.id
                            ? "bg-[#2A2B2E] text-white"
                            : "text-gray-400"
                        }`}
                      >
                        {level.name}
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Difficulty */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Zorluk</h3>
                <div className="space-y-2">
                  {Object.entries(difficultyColors).map(
                    ([difficulty, color]) => (
                      <label
                        key={difficulty}
                        htmlFor={`difficulty-${difficulty}`}
                        className="flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-900/30 focus-within:bg-blue-900/40 active:bg-blue-900/50 cursor-pointer transition-colors select-none"
                      >
                        <input
                          id={`difficulty-${difficulty}`}
                          type="checkbox"
                          checked={selectedDifficulties.includes(difficulty)}
                          onChange={() => {
                            setSelectedDifficulties((prev) =>
                              prev.includes(difficulty)
                                ? prev.filter((d) => d !== difficulty)
                                : [...prev, difficulty]
                            );
                          }}
                          className="rounded border-[#2A2B2E] bg-[#1A1B1E] cursor-pointer focus:ring-2 focus:ring-blue-500"
                        />
                        <span className={color}>{difficulty}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Clear Filters */}
              {(selectedKeywords.length > 0 ||
                selectedDifficulties.length > 0 ||
                selectedCategory !== "all" ||
                selectedClassLevel !== "all") && (
                <button
                  onClick={() => {
                    setSelectedKeywords([]);
                    setSelectedDifficulties([]);
                    setSelectedCategory("all");
                    setSelectedClassLevel("all");
                  }}
                  className="w-full px-3 py-2 text-red-400 hover:bg-red-500/10 rounded transition-colors text-left"
                >
                  Filtreleri Temizle
                </button>
              )}
            </div>
          </div>

          {/* Simulations Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[200px] bg-[#1A1B1E] border-[#2A2B2E] focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 hover:border-blue-400 transition-colors cursor-pointer">
                  <SelectValue placeholder="Sırala" />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1B1E] border-[#2A2B2E]">
                  <SelectItem value="popularity">Popülerlik</SelectItem>
                  <SelectItem value="name_asc">İsim A-Z</SelectItem>
                  <SelectItem value="name_desc">İsim Z-A</SelectItem>
                  <SelectItem value="difficulty_asc">Zorluk (Artan)</SelectItem>
                  <SelectItem value="difficulty_desc">
                    Zorluk (Azalan)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div
              className={`grid ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1"
              } gap-6`}
            >
              {paginatedSimulations.map((simulation) => (
                <Link
                  key={simulation.id}
                  href={`/simulations/${simulation.id}`}
                  className="block group h-full"
                >
                  <div className="relative bg-[#1A1B1E] rounded-lg overflow-hidden border border-[#2A2B2E] transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] h-full flex flex-col">
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={simulation.image || DEFAULT_IMAGE}
                        alt={simulation.title}
                        fill
                        className="object-cover transition-opacity duration-300 group-hover:opacity-0"
                      />
                      {simulation.previewGif && (
                        <Image
                          src={simulation.previewGif}
                          alt={`${simulation.title} preview`}
                          fill
                          className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1B1E] via-transparent to-transparent" />

                      {/* Difficulty Badge */}
                      <div className="absolute top-3 left-3">
                        <span
                          className={`px-2 py-1 rounded bg-[#2A2B2E] ${
                            difficultyColors[
                              simulation.difficulty as keyof typeof difficultyColors
                            ]
                          }`}
                        >
                          {simulation.difficulty}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 flex-grow">
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                        {simulation.title}
                      </h3>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">
                          {simulation.category}
                        </span>
                        <span className="text-yellow-400">
                          {simulation.points} Puan
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
