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
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getMaterials } from "@/db/utils";
import { MaterialType, MaterialCategory } from "@/db/types";
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentMaterials.map((material, index) => (
            <motion.div
              key={material.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Gradient Border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-200" />

              {/* Material Card */}
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden group-hover:border-gray-700 transition-colors h-full">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={
                      material.coverImage || "/images/materials/placeholder.jpg"
                    }
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
                    {material.duration && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400">
                        {material.duration}
                      </span>
                    )}
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
