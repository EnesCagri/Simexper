"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
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
  Search,
  X,
  SlidersHorizontal,
  Clock,
  Star,
  Calendar,
  Tag,
  ChevronLeft,
  Flame,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { getMaterials } from "@/db/utils";
import {
  MaterialType,
  MaterialCategory,
  EducationalMaterial,
} from "@/db/types";
import React from "react";

const levels = [
  {
    name: "beginner",
    display: "Başlangıç",
    color: "bg-green-500/20 text-green-400",
  },
  {
    name: "intermediate",
    display: "Orta",
    color: "bg-blue-500/20 text-blue-400",
  },
  {
    name: "advanced",
    display: "İleri",
    color: "bg-purple-500/20 text-purple-400",
  },
];

const sortOptions = [
  { id: "newest", name: "En Yeni", icon: Calendar },
  { id: "rating", name: "En Çok Beğenilen", icon: Star },
  { id: "duration", name: "Süre", icon: Clock },
];

const materialCategories: MaterialCategory[] = [
  "mekanik",
  "elektrik",
  "optik",
  "termodinamik",
  "modern-fizik",
];

// Unified Card for Devam Et & Sıradaki
type ContinueCardProps = {
  mat: EducationalMaterial;
  accent?: "blue" | "orange";
  progress?: number;
};
function ContinueCard({
  mat,
  accent = "blue",
  progress = 50,
}: ContinueCardProps) {
  const colorMap: Record<
    "blue" | "orange",
    { from: string; to: string; btn: string }
  > = {
    blue: {
      from: "from-blue-400",
      to: "to-purple-400",
      btn: "from-blue-500 to-purple-500",
    },
    orange: {
      from: "from-orange-400",
      to: "to-pink-500",
      btn: "from-orange-500 to-pink-500",
    },
  };
  const c = colorMap[accent];
  return (
    <motion.div
      className="w-[400px] flex-shrink-0 bg-gray-900/80 rounded-3xl shadow-2xl overflow-hidden border border-gray-800 relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="relative w-full aspect-square">
        <Image
          src={mat.coverImage}
          alt={`${mat.title} Öğrenme Materyalleri`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          className="object-cover"
          priority={mat.type === "video"}
        />
        {/* Progress bar */}
        <div className="absolute left-0 right-0 bottom-0 h-3 bg-gray-800">
          <div
            className={`h-full bg-gradient-to-r ${c.from} ${c.to}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <div className="p-6 flex flex-col gap-3">
        <div className="text-lg font-bold text-white line-clamp-2">
          {mat.title}
        </div>
        <Button
          size="lg"
          className={`rounded-full bg-gradient-to-r ${c.btn} text-white px-6 py-2 mt-2 text-lg`}
        >
          {accent === "blue" ? "Devam Et" : "İncele →"}
        </Button>
      </div>
    </motion.div>
  );
}

// Memoized Slider for Devam Et and Sıradaki
const ContinueSlider = React.memo(function ContinueSlider({
  title,
  accent,
  items,
}: {
  title: React.ReactNode;
  accent: "blue" | "orange";
  items: EducationalMaterial[];
}) {
  const [idx, setIdx] = React.useState(0);
  const [visibleCount, setVisibleCount] = React.useState(3);
  React.useEffect(() => {
    const getVisibleCount = () => {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    };
    setVisibleCount(getVisibleCount());
    const handleResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2
          className={`text-2xl md:text-3xl font-bold bg-clip-text text-transparent ${
            accent === "blue"
              ? "bg-gradient-to-r from-blue-400 to-purple-400"
              : "bg-gradient-to-r from-orange-400 to-pink-500"
          } `}
        >
          {title}
        </h2>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIdx((i) => Math.max(i - 1, 0))}
            disabled={idx === 0}
            className="rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              setIdx((i) => Math.min(i + 1, items.length - visibleCount))
            }
            disabled={idx >= items.length - visibleCount}
            className="rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-6"
          style={{
            transform: `translateX(-${idx * (400 + 24)}px)`,
            transition: "transform 0.5s cubic-bezier(.4,0,.2,1)",
          }}
        >
          {items.map((mat, i) => (
            <ContinueCard
              key={mat.slug}
              mat={mat}
              accent={accent}
              progress={40 + i * 10}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
});

export default function EducationPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<
    MaterialCategory[]
  >([]);
  const [selectedType, setSelectedType] = useState<"all" | MaterialType>("all");
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>(
    []
  );
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [showKeywordDialog, setShowKeywordDialog] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const continueRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 9;

  // Get materials from the database
  const materials = getMaterials();

  // Get unique keywords from materials
  const keywords = React.useMemo(() => {
    const keywordSet = new Set<string>();
    materials.forEach((material) => {
      material.keywords.forEach((keyword) => keywordSet.add(keyword));
    });
    return Array.from(keywordSet);
  }, [materials]);

  // Update category counts
  const typeCounts = React.useMemo(
    () => ({
      all: materials.length,
      video: materials.filter((m) => m.type === "video").length,
      article: materials.filter((m) => m.type === "article").length,
      interactive: materials.filter((m) => m.type === "interactive").length,
    }),
    [materials]
  );

  // Define categories with dynamic counts
  const categories = React.useMemo(
    () =>
      [
        {
          id: "all",
          name: "Tümü",
          icon: BookOpen,
          count: typeCounts.all,
        },
        {
          id: "video",
          name: "Videolar",
          icon: Video,
          count: typeCounts.video,
        },
        {
          id: "article",
          name: "Makaleler",
          icon: FileText,
          count: typeCounts.article,
        },
        {
          id: "interactive",
          name: "İnteraktif",
          icon: Brain,
          count: typeCounts.interactive,
        },
      ] as const,
    [typeCounts]
  );

  // Filter materials based on search, keywords, categories, type, and difficulties
  const filteredMaterials = materials.filter((material) => {
    // Search in title, description, and keywords using OR logic
    const searchTerms = searchQuery.toLowerCase().split(" ");
    const matchesSearch =
      searchTerms.length === 0 ||
      searchTerms.some(
        (term) =>
          material.title.toLowerCase().includes(term) ||
          material.description.toLowerCase().includes(term) ||
          material.keywords.some((keyword) =>
            keyword.toLowerCase().includes(term)
          )
      );

    // Check if material matches selected keywords (OR logic)
    const matchesKeywords =
      selectedKeywords.length === 0 ||
      selectedKeywords.some((keyword) => material.keywords.includes(keyword));

    // Check if material matches selected categories (OR logic)
    const matchesCategories =
      selectedCategories.length === 0 ||
      selectedCategories.includes(material.category);

    const matchesType =
      selectedType === "all" || material.type === selectedType;

    const matchesDifficulty =
      selectedDifficulties.length === 0 ||
      selectedDifficulties.some((diff) => {
        const level = levels.find((l) => l.display === diff);
        return level && material.difficulty === level.name;
      });

    return (
      matchesSearch &&
      matchesKeywords &&
      matchesCategories &&
      matchesType &&
      matchesDifficulty
    );
  });

  // Sort materials
  const sortedMaterials = [...filteredMaterials].sort((a, b) => {
    switch (sortBy) {
      case "duration":
        const aDuration = a.duration ? parseInt(a.duration) : 0;
        const bDuration = b.duration ? parseInt(b.duration) : 0;
        return aDuration - bDuration;
      case "rating":
        return -1; // Replace with actual rating logic
      default:
        return a.title.localeCompare(b.title); // Sort by title by default
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedMaterials.length / itemsPerPage);
  const currentMaterials = sortedMaterials.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedKeywords([]);
    setSelectedCategories([]);
    setSelectedType("all");
    setSelectedDifficulties([]);
    setSortBy("newest");
    setCurrentPage(1);
  };

  const removeKeyword = (keyword: string) => {
    setSelectedKeywords((prev) => prev.filter((k) => k !== keyword));
  };

  const removeCategory = (category: string) => {
    setSelectedCategories((prev) => prev.filter((c) => c !== category));
  };

  // MOCK DATA for sliders (replace with real data as needed)
  const continueLearning = materials.slice(0, 5); // Devam edilenler
  const nextUp = materials.slice(5, 10); // Sıradaki öneriler
  const popular = materials
    .slice()
    .sort(() => 0.5 - Math.random())
    .slice(0, 8); // Popülerler

  // Slider state
  const [continueIdx, setContinueIdx] = useState(0);
  const [nextUpIdx, setNextUpIdx] = useState(0);
  const [popularIdx, setPopularIdx] = useState(0);

  // Helper for visible cards (responsive)
  const [visibleCount, setVisibleCount] = useState(3);
  useEffect(() => {
    const getVisibleCount = () => {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    };
    setVisibleCount(getVisibleCount());
    const handleResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-x-hidden">
      {/* Subtle pink radial gradient overlay */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[1200px] h-[900px] bg-pink-400 rounded-full blur-3xl opacity-30" />
        <div className="absolute right-0 bottom-0 w-[700px] h-[500px] bg-fuchsia-500 rounded-full blur-2xl opacity-20" />
      </div>
      {/* HERO SECTION */}
      <section className="relative w-full min-h-[420px] md:min-h-[520px] flex flex-col items-center justify-center overflow-hidden pb-10">
        {/* SVG/Illustration BG */}
        <div className="absolute inset-0 -z-10">
          {/* Example SVG illustration, replace with real one later */}
          <svg
            viewBox="0 0 1440 520"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full object-cover"
          >
            <rect width="1440" height="520" fill="url(#bg-gradient)" />
            <defs>
              <linearGradient
                id="bg-gradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
                gradientTransform="rotate(120)"
              >
                <stop offset="0%" stopColor="#181828" />
                <stop offset="100%" stopColor="#232347" />
              </linearGradient>
            </defs>
            {/* Cartoon-style elements (placeholder) */}
            <circle
              cx="300"
              cy="400"
              r="80"
              fill="#a259ff"
              fillOpacity="0.18"
            />
            <circle
              cx="1200"
              cy="120"
              r="100"
              fill="#ff6f3c"
              fillOpacity="0.13"
            />
            <ellipse
              cx="900"
              cy="420"
              rx="120"
              ry="40"
              fill="#fff"
              fillOpacity="0.07"
            />
            <ellipse
              cx="600"
              cy="100"
              rx="90"
              ry="30"
              fill="#a259ff"
              fillOpacity="0.09"
            />
            {/* Add more SVG elements for a playful look */}
          </svg>
        </div>
        {/* Foreground Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-20 md:pt-28">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#a259ff] via-[#7f5af0] to-[#ff6f3c] drop-shadow-lg"
          >
            Haydi Fen'i Keşfet!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-2xl text-gray-200 max-w-2xl mx-auto mb-8 font-medium"
          >
            3–8. sınıf fen konularını interaktif simülasyonlarla öğren, pekiştir
            ve eğlen.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center"
          >
            <Button
              size="lg"
              className="rounded-full px-8 py-4 text-lg font-bold bg-gradient-to-r from-[#a259ff] to-[#ff6f3c] text-white shadow-lg hover:from-[#7f5af0] hover:to-[#ff8c42] transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-[#a259ff]"
              onClick={() => {
                continueRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Hemen Başla
            </Button>
            <button
              className="text-base font-semibold underline text-white/80 hover:text-[#a259ff] transition-colors"
              onClick={() => setShowHowItWorks(true)}
              type="button"
            >
              Nasıl çalışır? →
            </button>
          </motion.div>
        </div>
        {/* Modal for 'Nasıl çalışır?' */}
        <Dialog open={showHowItWorks} onOpenChange={setShowHowItWorks}>
          <DialogContent className="max-w-md bg-gray-900 border border-gray-700">
            <DialogHeader>
              <DialogTitle>Simexper Nasıl Çalışır?</DialogTitle>
            </DialogHeader>
            <div className="text-gray-300 text-base py-2">
              Simexper'de fen konularını interaktif simülasyonlar, videolar ve
              makalelerle eğlenceli şekilde öğrenirsin. Sınıf seviyene uygun
              materyalleri seç, ilerlemeni takip et ve yeni konular keşfet!
            </div>
            <Button
              onClick={() => setShowHowItWorks(false)}
              className="mt-4 w-full bg-gradient-to-r from-[#a259ff] to-[#ff6f3c] text-white rounded-full"
            >
              Tamam
            </Button>
          </DialogContent>
        </Dialog>
      </section>

      {/* SLIDERS SECTION */}
      <section className="container mx-auto px-4 -mt-8 mb-12 flex flex-col gap-12">
        {/* 1. Öğrenmeye Devam Et Slider */}
        {continueLearning.length > 0 && (
          <ContinueSlider
            title="Öğrenmeye Devam Et"
            accent="blue"
            items={continueLearning}
          />
        )}
        {/* 2. Sıradaki Konular Slider */}
        <ContinueSlider
          title={
            <span className="flex items-center gap-2">
              <Flame className="w-6 h-6 text-orange-400" />
              Sıradaki Konular
            </span>
          }
          accent="orange"
          items={nextUp}
        />
        {/* 3. En Popüler Materyaller Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-500 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-yellow-400" />
              En Popüler Materyaller
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:grid-cols-2 md:grid-rows-2">
            {popular.slice(0, 4).map((mat, idx) => (
              <motion.div
                key={mat.slug}
                initial={{ opacity: 0, scale: 0.7, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + idx * 0.13,
                  type: "spring",
                  bounce: 0.45,
                }}
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 8px 32px 0 rgba(255, 223, 70, 0.25)",
                }}
                className="relative group rounded-3xl overflow-hidden shadow-2xl border-2 border-yellow-400/20 bg-gray-900/90 flex flex-col"
              >
                <div className="relative w-full aspect-square">
                  <Image
                    src={mat.coverImage}
                    alt={mat.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <div className="p-6 backdrop-blur-md bg-black/40 rounded-b-3xl">
                      <div className="flex gap-2 mb-2">
                        <span className="text-xs bg-yellow-400/20 text-yellow-400 rounded px-2 py-0.5">
                          {mat.type}
                        </span>
                        <span className="text-xs bg-pink-500/20 text-pink-400 rounded px-2 py-0.5">
                          {mat.duration || "45 dk"}
                        </span>
                      </div>
                      <div className="font-bold text-xl md:text-2xl text-white line-clamp-2 mb-1">
                        {mat.title}
                      </div>
                      <div className="text-sm text-gray-300 line-clamp-2 mb-3">
                        {mat.description?.slice(0, 80)}
                      </div>
                      <Button
                        variant="ghost"
                        size="lg"
                        className="text-yellow-400 hover:text-yellow-300 px-0 mt-auto font-semibold text-base"
                      >
                        İncele →
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-24">
        {/* Öğrenmeye Devam Et bölümü için referans */}
        <div ref={continueRef} />
        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 space-y-4"
        >
          <div className="flex flex-wrap gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="İsim veya anahtar kelime ile ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-900/50 border-gray-800 focus:border-gray-700"
                />
              </div>
            </div>

            {/* Keyword Search Button */}
            <Dialog
              open={showKeywordDialog}
              onOpenChange={setShowKeywordDialog}
            >
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-gray-800 hover:border-gray-700"
                >
                  <Tag className="w-4 h-4 mr-2" />
                  Anahtar Kelimeler
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 border-gray-800">
                <DialogHeader>
                  <DialogTitle>Anahtar Kelimeler</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {keywords.map((keyword) => (
                      <div
                        key={keyword}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={keyword}
                          checked={selectedKeywords.includes(keyword)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedKeywords((prev) => [...prev, keyword]);
                            } else {
                              removeKeyword(keyword);
                            }
                          }}
                        />
                        <label
                          htmlFor={keyword}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-300"
                        >
                          {keyword}
                        </label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>

            {/* Category Filter Button */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-gray-800 hover:border-gray-700"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Kategoriler
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 border-gray-800">
                <DialogHeader>
                  <DialogTitle>Kategoriler</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {materialCategories.map((category) => (
                      <div
                        key={category}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={category}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedCategories((prev) => [
                                ...prev,
                                category,
                              ]);
                            } else {
                              removeCategory(category);
                            }
                          }}
                        />
                        <label
                          htmlFor={category}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-300"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>

            {/* Type and Difficulty Filter Button */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-gray-800 hover:border-gray-700"
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filtrele
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 border-gray-800">
                <DialogHeader>
                  <DialogTitle>Filtreleme Seçenekleri</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  {/* Type Selection */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-400">
                      Materyal Tipi
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() =>
                            setSelectedType(category.id as MaterialType)
                          }
                          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm ${
                            selectedType === category.id
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50"
                          }`}
                        >
                          <category.icon className="w-4 h-4" />
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Difficulty Selection */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-400">
                      Zorluk Seviyesi
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {levels.map((level) => (
                        <button
                          key={level.name}
                          onClick={() => {
                            setSelectedDifficulties((prev) =>
                              prev.includes(level.display)
                                ? prev.filter((d) => d !== level.display)
                                : [...prev, level.display]
                            );
                          }}
                          className={`px-4 py-2 rounded-full text-sm ${
                            selectedDifficulties.includes(level.display)
                              ? level.color
                              : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50"
                          }`}
                        >
                          {level.display}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sort Selection */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-400">
                      Sıralama
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {sortOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setSortBy(option.id)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm ${
                            sortBy === option.id
                              ? "bg-purple-500/20 text-purple-400"
                              : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50"
                          }`}
                        >
                          <option.icon className="w-4 h-4" />
                          {option.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Clear Filters Button */}
            {(searchQuery ||
              selectedKeywords.length > 0 ||
              selectedCategories.length > 0 ||
              selectedType !== "all" ||
              selectedDifficulties.length > 0) && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-gray-400 hover:text-gray-300"
              >
                <X className="w-4 h-4 mr-2" />
                Filtreleri Temizle
              </Button>
            )}
          </div>

          {/* Active Filters */}
          {(selectedKeywords.length > 0 ||
            selectedCategories.length > 0 ||
            selectedType !== "all" ||
            selectedDifficulties.length > 0) && (
            <div className="flex flex-wrap gap-2">
              {/* Selected Keywords */}
              {selectedKeywords.map((keyword) => (
                <span
                  key={keyword}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-blue-500/20 text-blue-400"
                >
                  {keyword}
                  <button
                    onClick={() => removeKeyword(keyword)}
                    className="ml-1 hover:text-blue-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}

              {/* Selected Categories */}
              {selectedCategories.map((category) => (
                <span
                  key={category}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-purple-500/20 text-purple-400"
                >
                  {category}
                  <button
                    onClick={() => removeCategory(category)}
                    className="ml-1 hover:text-purple-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}

              {/* Selected Type */}
              {selectedType !== "all" && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-blue-500/20 text-blue-400">
                  {categories.find((c) => c.id === selectedType)?.name}
                  <button
                    onClick={() => setSelectedType("all")}
                    className="ml-1 hover:text-blue-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              )}

              {/* Selected Difficulties */}
              {selectedDifficulties.map((difficulty) => (
                <span
                  key={difficulty}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                    levels.find((l) => l.display === difficulty)?.color
                  }`}
                >
                  {difficulty}
                  <button
                    onClick={() =>
                      setSelectedDifficulties((prev) =>
                        prev.filter((d) => d !== difficulty)
                      )
                    }
                    className="ml-1 hover:opacity-80"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {currentMaterials.map((material, index) => (
            <motion.div
              key={material.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Animated Gradient Border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-lg opacity-40 group-hover:opacity-80 transition duration-300 pointer-events-none" />

              {/* Material Card */}
              <div className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-3xl overflow-hidden group-hover:border-blue-500/60 shadow-xl transition-all duration-300 h-full">
                {/* Image */}
                <div className="relative h-64 md:h-72 overflow-hidden">
                  <Image
                    src={material.coverImage}
                    alt={`${material.title} Öğrenme Materyalleri`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority={index === 0}
                  />
                  {/* Glassy/gradient overlay at bottom for text readability */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-gray-950/80 via-gray-900/40 to-transparent" />
                  {/* Badges - bottom left, glassy */}
                  <div className="absolute bottom-4 left-4 flex gap-2 z-10">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium bg-white/20 backdrop-blur-md text-white shadow border border-white/10">
                      {material.type === "video" && (
                        <Play className="w-4 h-4 mr-1" />
                      )}
                      {material.type === "article" && (
                        <File className="w-4 h-4 mr-1" />
                      )}
                      {material.type === "interactive" && (
                        <Lightbulb className="w-4 h-4 mr-1" />
                      )}
                      {material.type}
                    </span>
                    {material.duration && (
                      <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-200 border border-purple-400/20 backdrop-blur-md">
                        {material.duration}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-7 pt-6">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                    {material.title}
                  </h3>
                  <p className="text-gray-300 mb-4 line-clamp-3 text-base">
                    {material.description}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span
                      className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium ${
                        levels.find((l) => l.name === material.difficulty)
                          ?.color
                      }`}
                    >
                      {
                        levels.find((l) => l.name === material.difficulty)
                          ?.display
                      }
                    </span>
                    <Link
                      href={material.link || material.downloadUrl || "#"}
                      className="inline-flex items-center text-base font-semibold text-blue-400 hover:text-blue-300 transition-colors group/link"
                    >
                      İncele
                      <ArrowRight className="w-5 h-5 ml-1 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center items-center gap-2 mt-12"
          >
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="border-gray-800 hover:border-gray-700"
            >
              Önceki
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
                className={
                  currentPage === page
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "border-gray-800 hover:border-gray-700"
                }
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="border-gray-800 hover:border-gray-700"
            >
              Sonraki
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
