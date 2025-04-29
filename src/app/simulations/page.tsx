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
  Grid2x2,
  LayoutList,
  Search,
  FilterX,
  X,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
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

const difficultyColors = {
  Kolay: "text-green-400",
  Orta: "text-blue-400",
  Zor: "text-purple-400",
  İleri: "text-red-400",
};

// Add these constants for keywords
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
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>(
    []
  );
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("popularity");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const simulations = getSimulations();

  // Filter and sort simulations
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
        const matchesDifficulty =
          selectedDifficulties.length === 0 ||
          selectedDifficulties.includes(simulation.difficulty);

        return matchesSearch && matchesCategory && matchesDifficulty;
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
  }, [search, selectedCategory, selectedDifficulties, sortBy]);

  const paginatedSimulations = filteredSimulations.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#1a237e,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,#0d47a1,transparent_50%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
      </div>
      <div className="container mx-auto px-4 py-8">
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
                onClick={() => {
                  setSelectedKeywords((prev) =>
                    prev.includes(keyword.id)
                      ? prev.filter((k) => k !== keyword.id)
                      : [...prev, keyword.id]
                  );
                }}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  selectedKeywords.includes(keyword.id)
                    ? "bg-blue-500 text-white"
                    : "bg-[#1A1B1E] text-gray-400 hover:bg-[#2A2B2E]"
                }`}
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
              </div>

              {/* Difficulty */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Zorluk</h3>
                <div className="space-y-2">
                  {Object.entries(difficultyColors).map(
                    ([difficulty, color]) => (
                      <label
                        key={difficulty}
                        className="flex items-center gap-2 px-3 py-2 rounded hover:bg-[#2A2B2E] cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedDifficulties.includes(difficulty)}
                          onChange={() => {
                            setSelectedDifficulties((prev) =>
                              prev.includes(difficulty)
                                ? prev.filter((d) => d !== difficulty)
                                : [...prev, difficulty]
                            );
                          }}
                          className="rounded border-[#2A2B2E] bg-[#1A1B1E]"
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
                selectedCategory !== "all") && (
                <button
                  onClick={() => {
                    setSelectedKeywords([]);
                    setSelectedDifficulties([]);
                    setSelectedCategory("all");
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
                <SelectTrigger className="w-[200px] bg-[#1A1B1E] border-[#2A2B2E]">
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
                  className="block group"
                >
                  <div className="relative bg-[#1A1B1E] rounded-lg overflow-hidden border border-[#2A2B2E] transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={simulation.image || DEFAULT_IMAGE}
                        alt={simulation.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1B1E] via-transparent to-transparent" />

                      {/* Discount Badge (converted to Difficulty) */}
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

                    <div className="p-4">
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
