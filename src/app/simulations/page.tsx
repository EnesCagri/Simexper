"use client";

import { motion } from "framer-motion";
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
  Search,
  FilterX,
  X,
  PlayCircle,
  Eye,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getSimulations } from "@/db/utils";

const DEFAULT_IMAGE = "/images/simulations/placeholder.jpg";

const ITEMS_PER_PAGE = 6;

const categoryIcons: Record<string, any> = {
  mekanik: Brain,
  elektromanyetizma: Target,
  optik: Eye,
  termodinamik: Flame,
  "modern-fizik": Zap,
  genel: BookOpen,
};

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

const difficulties = ["Kolay", "Orta", "Zor", "İleri"];

// Add these constants for available keywords
const availableKeywords = [
  "Mekanik",
  "Elektrik",
  "Elektromanyetizma",
  "Optik",
  "Termodinamik",
  "Kuvvet",
  "Hareket",
  "Enerji",
  "Isı",
  "Sıcaklık",
].sort();

export default function SimulationsPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>(
    []
  );
  const [sortBy, setSortBy] = useState<string>("title");
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  const simulations = getSimulations();

  // Toggle difficulty selection
  const toggleDifficulty = (difficulty: string) => {
    setSelectedDifficulties((prev) =>
      prev.includes(difficulty)
        ? prev.filter((d) => d !== difficulty)
        : [...prev, difficulty]
    );
    setCurrentPage(1);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearch("");
    setSelectedCategory("all");
    setSelectedDifficulties([]);
    setSortBy("title");
    setCurrentPage(1);
    setSelectedKeywords([]);
  };

  // Add a function to handle keyword removal
  const removeKeyword = (keywordToRemove: string) => {
    setSelectedKeywords((prev) => prev.filter((k) => k !== keywordToRemove));
  };

  // Filter and sort simulations
  const filteredSimulations = useMemo(() => {
    return simulations
      .filter((simulation) => {
        const searchLower = search.toLowerCase();
        const matchesSearch =
          simulation.title.toLowerCase().includes(searchLower) ||
          simulation.description.toLowerCase().includes(searchLower) ||
          simulation.keywords.some((keyword) =>
            keyword.toLowerCase().includes(searchLower)
          );
        const matchesCategory =
          selectedCategory === "all" ||
          simulation.category === selectedCategory;
        const matchesDifficulty =
          selectedDifficulties.length === 0 ||
          selectedDifficulties.includes(simulation.difficulty);
        const matchesKeywords =
          selectedKeywords.length === 0 ||
          selectedKeywords.some((selectedKeyword) =>
            simulation.keywords.some((k) =>
              k.toLowerCase().includes(selectedKeyword.toLowerCase())
            )
          );

        return (
          matchesSearch &&
          matchesCategory &&
          matchesDifficulty &&
          matchesKeywords
        );
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "title":
            return a.title.localeCompare(b.title);
          case "difficulty":
            return (
              difficulties.indexOf(a.difficulty) -
              difficulties.indexOf(b.difficulty)
            );
          case "unit":
            return a.unitOrder - b.unitOrder;
          default:
            return 0;
        }
      });
  }, [
    search,
    selectedCategory,
    selectedDifficulties,
    selectedKeywords,
    sortBy,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredSimulations.length / ITEMS_PER_PAGE);
  const paginatedSimulations = filteredSimulations.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const hasActiveFilters =
    search ||
    selectedCategory !== "all" ||
    selectedDifficulties.length > 0 ||
    selectedKeywords.length > 0;

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
        {/* Search and Filters */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Simülasyon adı veya anahtar kelime ile ara..."
                className="pl-10 bg-gray-900/50 border-gray-800 focus:border-blue-500/50"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-gray-900/50 border-gray-800 hover:bg-gray-800/50 flex items-center gap-2"
                >
                  <Search className="h-4 w-4" />
                  Anahtar Kelime Seç
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-gray-900 border-gray-800">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-white">
                    Anahtar Kelime Seç
                  </DialogTitle>
                </DialogHeader>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Anahtar kelime ara..."
                    className="pl-10 bg-gray-800/50 border-gray-700 focus:border-blue-500/50"
                  />
                </div>
                <ScrollArea className="h-[300px] pr-4">
                  <div className="space-y-4">
                    {availableKeywords.map((keyword) => (
                      <div
                        key={keyword}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={keyword}
                          checked={selectedKeywords.includes(keyword)}
                          onCheckedChange={(checked: boolean) => {
                            if (checked) {
                              setSelectedKeywords((prev) => [...prev, keyword]);
                            } else {
                              removeKeyword(keyword);
                            }
                          }}
                        />
                        <label
                          htmlFor={keyword}
                          className="text-sm font-medium leading-none text-gray-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {keyword}
                        </label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] bg-gray-900/50 border-gray-800 focus:border-blue-500/50">
                <SelectValue placeholder="Sırala" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-800">
                <SelectItem value="title">İsim</SelectItem>
                <SelectItem value="difficulty">Zorluk</SelectItem>
                <SelectItem value="unit">Ünite Sırası</SelectItem>
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={clearAllFilters}
                className="bg-gray-900/50 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/50 flex items-center gap-2"
              >
                <FilterX className="h-4 w-4" />
                Filtreleri Temizle
              </Button>
            )}
          </div>

          {/* Selected Keywords Display */}
          {selectedKeywords.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedKeywords.map((keyword) => (
                <Badge
                  key={keyword}
                  variant="secondary"
                  className="flex items-center gap-1 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                >
                  {keyword}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removeKeyword(keyword);
                    }}
                    className="ml-1 hover:text-red-400 focus:outline-none"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Badge
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "secondary"
                  }
                  className={`cursor-pointer hover:bg-blue-500/10 ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-blue-500 to-purple-500"
                      : ""
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <Icon className="w-4 h-4 mr-1" />
                  {category.name}
                </Badge>
              );
            })}
          </div>

          {/* Difficulties */}
          <div className="flex flex-wrap gap-2">
            {difficulties.map((difficulty) => (
              <Badge
                key={difficulty}
                variant={
                  selectedDifficulties.includes(difficulty)
                    ? "default"
                    : "secondary"
                }
                className={`cursor-pointer hover:bg-blue-500/10 ${
                  selectedDifficulties.includes(difficulty)
                    ? "bg-gradient-to-r from-blue-500 to-purple-500"
                    : ""
                }`}
                onClick={() => toggleDifficulty(difficulty)}
              >
                {difficulty}
              </Badge>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="text-gray-400 mb-6">
          {filteredSimulations.length} sonuç bulundu
        </div>

        {/* Simulations Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {paginatedSimulations.map((simulation) => {
            const Icon = categoryIcons[simulation.category];
            return (
              <Link
                key={simulation.id}
                href={`/simulations/${simulation.id}`}
                className="block"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="relative group h-full"
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
                        <Badge variant="secondary" className="bg-gray-900/80">
                          {simulation.category.charAt(0).toUpperCase() +
                            simulation.category.slice(1)}
                        </Badge>
                      </div>

                      {/* Difficulty Badge */}
                      <div className="absolute top-4 right-4">
                        <Badge
                          variant="secondary"
                          className={`${
                            difficultyColors[
                              simulation.difficulty as keyof typeof difficultyColors
                            ]
                          } bg-gray-900/80`}
                        >
                          {simulation.difficulty}
                        </Badge>
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

                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center text-sm font-medium text-blue-400 group-hover:text-blue-300 transition-colors">
                          Simülasyona Git
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>

                        {/* How it works button */}
                        <Dialog>
                          <DialogTrigger
                            asChild
                            onClick={(e) => e.preventDefault()}
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-gray-900/50 border-gray-800/50 hover:bg-gray-800/30"
                            >
                              <PlayCircle className="w-4 h-4 mr-2 text-green-400" />
                              Nasıl Çalışır?
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[800px] bg-gray-900/95 border-gray-800">
                            <DialogHeader>
                              <DialogTitle className="text-2xl font-bold text-white mb-4">
                                {simulation.title} - Nasıl Çalışır?
                              </DialogTitle>
                            </DialogHeader>
                            <div className="aspect-video w-full">
                              <iframe
                                src={simulation.howItWorksVideo}
                                className="w-full h-full rounded-lg"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="border-gray-800 hover:bg-gray-900/50"
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
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    : "border-gray-800 hover:bg-gray-900/50"
                }
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="border-gray-800 hover:bg-gray-900/50"
            >
              Sonraki
            </Button>
          </div>
        )}

        {/* Empty State */}
        {filteredSimulations.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-400 text-lg">
              Arama kriterlerinize uygun simülasyon bulunamadı.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
