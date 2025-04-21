"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  ChevronRight,
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
];

export function BlogSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gray-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.1),transparent_50%)]" />
      </div>

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gray-900/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-800 mb-6">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-300">Blog</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Son Yazılar
            </span>
          </h2>
          <p className="text-lg text-gray-400">
            Fizik eğitimi, simülasyonlar ve teknoloji hakkında en güncel
            içerikler
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Link href="/blogs">
            <Button
              variant="outline"
              className="h-12 px-8 group border-gray-800 hover:border-gray-700"
            >
              Tüm Yazıları Gör
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
