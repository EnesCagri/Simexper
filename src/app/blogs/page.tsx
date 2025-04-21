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
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const blogPosts = [
  {
    title: "Fizik Eğitiminde Simülasyonların Önemi",
    excerpt:
      "Modern eğitimde simülasyonların rolü ve öğrenme sürecine katkıları hakkında detaylı bir inceleme.",
    date: "15 Nisan 2024",
    readTime: "5 dk",
    category: "Eğitim",
    image: "/images/blog/blog1.jpg",
    slug: "fizik-egitiminde-simulasyonlarin-onemi",
  },
  {
    title: "Sanal Laboratuvar Deneyimleri",
    excerpt:
      "Sanal laboratuvarların fizik eğitimindeki yeri ve gerçek deneylerle karşılaştırması.",
    date: "12 Nisan 2024",
    readTime: "4 dk",
    category: "Teknoloji",
    image: "/images/blog/blog1.jpg",
    slug: "sanal-laboratuvar-deneyimleri",
  },
  {
    title: "Öğrenci Başarısında Simülasyonların Etkisi",
    excerpt:
      "Simülasyon tabanlı öğrenmenin öğrenci başarısına olan etkileri ve araştırma sonuçları.",
    date: "10 Nisan 2024",
    readTime: "6 dk",
    category: "Araştırma",
    image: "/images/blog/blog1.jpg",
    slug: "ogrenci-basarisinda-simulasyonlarin-etkisi",
  },
  // Add more blog posts here
];

const categories = [
  { name: "Tümü", count: 12 },
  { name: "Eğitim", count: 4 },
  { name: "Teknoloji", count: 3 },
  { name: "Araştırma", count: 5 },
];

export default function BlogPage() {
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
              <h2 className="text-xl font-semibold text-white mb-6">
                Kategoriler
              </h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    className="flex items-center justify-between w-full text-left px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors"
                  >
                    <span>{category.name}</span>
                    <span className="text-sm bg-gray-800 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Blog Posts */}
          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogPosts.map((post, index) => (
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
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-400 mb-6">{post.excerpt}</p>

                      <Link
                        href={`/blogs/${post.slug}`}
                        className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors group/link"
                      >
                        Devamını Oku
                        <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  className="border-gray-800 hover:border-gray-700"
                >
                  Önceki
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-800 hover:border-gray-700"
                >
                  1
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-800 hover:border-gray-700"
                >
                  2
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-800 hover:border-gray-700"
                >
                  3
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-800 hover:border-gray-700"
                >
                  Sonraki
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
