"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  ChevronRight,
  Search,
  ChevronLeft,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import { getBlogPosts, getBlogCategories } from "@/db/utils";
import { BlogPostData } from "@/db/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const ITEMS_PER_PAGE = 6;

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"date" | "readingTime">("date");

  const posts = getBlogPosts();
  const categories = getBlogCategories();

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    return posts
      .filter((post) => {
        const searchLower = search.toLowerCase();
        const matchesSearch =
          post.title.toLowerCase().includes(searchLower) ||
          post.excerpt.toLowerCase().includes(searchLower) ||
          post.keywords.some((keyword) =>
            keyword.toLowerCase().includes(searchLower)
          );
        const matchesCategory =
          selectedCategory === "all" || post.category === selectedCategory;

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === "date") {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        } else {
          return (
            parseInt(b.readingTime.replace(" dk", "")) -
            parseInt(a.readingTime.replace(" dk", ""))
          );
        }
      });
  }, [posts, search, selectedCategory, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
            <div className="inline-flex items-center gap-2 bg-gray-900/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-800 mb-6">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-300">Blog</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                Blog
              </span>
            </h1>
            <p className="text-lg text-gray-400 mb-8">
              Fizik eğitimi, simülasyonlar ve teknoloji hakkında en güncel
              içerikler
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Blog yazılarında ara..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg px-4 py-3 pl-12 text-gray-300 focus:outline-none focus:border-gray-700 transition-colors"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-24">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Filtrele</h2>
                {selectedCategory !== "all" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedCategory("all");
                      setCurrentPage(1);
                    }}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Temizle
                  </Button>
                )}
              </div>

              {/* Categories */}
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setCurrentPage(1);
                  }}
                  className={`flex items-center justify-between w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === "all"
                      ? "bg-blue-500/20 text-blue-400"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  <span>Tümü</span>
                  <span className="text-sm bg-gray-800 px-2 py-1 rounded-full">
                    {posts.length}
                  </span>
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setCurrentPage(1);
                    }}
                    className={`flex items-center justify-between w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? "bg-blue-500/20 text-blue-400"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className="text-sm bg-gray-800 px-2 py-1 rounded-full">
                      {
                        posts.filter((post) => post.category === category.id)
                          .length
                      }
                    </span>
                  </button>
                ))}
              </div>

              {/* Sort Options */}
              <div className="mt-8">
                <h3 className="text-lg font-medium text-white mb-4">Sırala</h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between border-gray-800"
                    >
                      {sortBy === "date"
                        ? "Tarihe Göre"
                        : "Okuma Süresine Göre"}
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-gray-900 border-gray-800">
                    <DropdownMenuItem
                      onClick={() => setSortBy("date")}
                      className={`${
                        sortBy === "date" ? "text-blue-400" : "text-gray-300"
                      }`}
                    >
                      Tarihe Göre
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setSortBy("readingTime")}
                      className={`${
                        sortBy === "readingTime"
                          ? "text-blue-400"
                          : "text-gray-300"
                      }`}
                    >
                      Okuma Süresine Göre
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          {/* Blog Posts */}
          <div className="lg:w-3/4">
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-400">
                {filteredPosts.length} yazı bulundu
                {selectedCategory !== "all" &&
                  ` "${
                    categories.find((c) => c.id === selectedCategory)?.name
                  }" kategorisinde`}
                {search && ` "${search}" araması için`}
              </p>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {paginatedPosts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  {/* Gradient Border */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-200" />

                  {/* Blog Card */}
                  <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden group-hover:border-gray-700 transition-colors h-full">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <Badge
                          variant="outline"
                          className="bg-blue-500/20 text-blue-400 border-blue-500/20"
                        >
                          {categories.find((c) => c.id === post.category)?.name}
                        </Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.date).toLocaleDateString("tr-TR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readingTime}
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-400 mb-6">{post.excerpt}</p>

                      <div className="flex items-center justify-between">
                        <Link
                          href={`/blogs/${post.slug}`}
                          className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors group/link"
                        >
                          Devamını Oku
                          <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                        </Link>

                        <div className="flex items-center gap-2">
                          <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            width={24}
                            height={24}
                            className="rounded-full"
                          />
                          <span className="text-sm text-gray-400">
                            {post.author.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="border-gray-800 hover:border-gray-700"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <Button
                        key={page}
                        variant={page === currentPage ? "default" : "outline"}
                        className={
                          page === currentPage
                            ? "bg-blue-500 hover:bg-blue-600"
                            : "border-gray-800 hover:border-gray-700"
                        }
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </Button>
                    )
                  )}
                  <Button
                    variant="outline"
                    className="border-gray-800 hover:border-gray-700"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
