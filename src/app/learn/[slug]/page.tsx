"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  BookOpen,
  Star,
  Clock,
  User,
  FileText,
  Video,
  PlayCircle,
  ChevronDown,
  ChevronUp,
  Link as LinkIcon,
  Brain,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { notFound } from "next/navigation";
import { getMaterialBySlug } from "@/db/utils";

export default function EducationMaterialPage() {
  const params = useParams();
  const [showDetails, setShowDetails] = useState(true);

  const slug = params.slug as string;
  const material = getMaterialBySlug(slug);

  if (!material) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-lg border-b border-gray-800/50"
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild>
            <Link
              href="/learn"
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Eğitim Materyallerine Dön
            </Link>
          </Button>
        </div>
      </motion.nav>

      {/* Background Effects */}
      <div className="fixed inset-0 bg-gray-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.15),transparent_50%)]" />
      </div>

      <div className="relative container mx-auto px-4 pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Title and Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-900/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-800/50"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Cover Image */}
                <div className="relative w-full md:w-48 h-64 flex-shrink-0">
                  <Image
                    src={material.coverImage}
                    alt={material.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <h1 className="text-3xl font-bold text-white mb-4">
                    {material.title}
                  </h1>
                  <p className="text-gray-300 mb-6">{material.description}</p>

                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-purple-400" />
                      <span className="text-gray-300">{material.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">
                        {material.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-yellow-400" />
                      <span className="text-gray-300">{material.duration}</span>
                    </div>
                    {material.type && (
                      <div className="flex items-center gap-2">
                        {material.type === "video" && (
                          <Video className="w-4 h-4 text-blue-400" />
                        )}
                        {material.type === "article" && (
                          <FileText className="w-4 h-4 text-blue-400" />
                        )}
                        {material.type === "interactive" && (
                          <Brain className="w-4 h-4 text-blue-400" />
                        )}
                        <span className="text-gray-300">{material.type}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-6">
                    {material.keywords.map((keyword) => (
                      <Badge
                        key={keyword}
                        variant="secondary"
                        className="bg-blue-500/10 text-blue-400 border-blue-500/20"
                      >
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Details Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-900/30 rounded-2xl overflow-hidden backdrop-blur-sm border border-gray-800/50"
            >
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-800/30 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-400" />
                  <h2 className="text-xl font-semibold text-white">
                    Detaylı Açıklama
                  </h2>
                </div>
                {showDetails ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              {showDetails && (
                <div className="p-6 border-t border-gray-800">
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 whitespace-pre-line">
                      {material.description}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Link to Material */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-900/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-800/50"
            >
              {material.link && (
                <Link
                  href={material.link}
                  target="_blank"
                  className="flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2">
                    <LinkIcon className="w-5 h-5 text-blue-400" />
                    <span className="text-white group-hover:text-blue-400 transition-colors">
                      Materyale Git
                    </span>
                  </div>
                  <ArrowLeft className="w-5 h-5 text-gray-400 rotate-180 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Category Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gray-900/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-800/50"
            >
              <h2 className="text-xl font-semibold text-white mb-4">
                Kategori Bilgisi
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-300">{material.category}</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Bu materyal {material.category} kategorisinde yer almaktadır.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
