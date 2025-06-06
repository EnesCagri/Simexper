"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Plus,
  Edit,
  Trash,
  Eye,
  Search,
  Filter,
  FileText,
  X,
  Clock,
  User,
  Calendar,
  Tag,
  BookOpen,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useBlogs } from "@/hooks/useBlogs";
import { BlogPostData, SimulationData } from "@/db/types";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function BlogGrid() {
  const router = useRouter();
  const { posts, loading, error, fetchPosts, deletePost, searchPosts } =
    useBlogs();
  const [search, setSearch] = useState("");
  const [selectedPost, setSelectedPost] = useState<BlogPostData | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [simulations, setSimulations] = useState<SimulationData[]>([]);

  useEffect(() => {
    fetchPosts();
    // Fetch simulations here
    setSimulations([
      {
        id: "1",
        slug: "simulasyon-1",
        title: "Simülasyon 1",
        description: "Açıklama 1",
        category: "mechanics",
        difficulty: "beginner",
        completionTime: "10 dk",
        points: 100,
        gradient: "blue",
        unit: "mechanics",
        unitOrder: 1,
        image: "/images/simulation/Resim1.png",
        coverImage: "/images/simulation/Resim1.png",
        previewGif: "/gifs/simulation/simulation1.gif",
        classLevel: "9",
        keywords: ["keyword1", "keyword2"],
        detailedDescription: "Detaylı açıklama",
        learningObjectives: ["Hedef 1", "Hedef 2"],
        reviews: [],
      },
    ]);
  }, [fetchPosts]);

  const handleSearch = (value: string) => {
    setSearch(value);
    if (value.trim()) {
      searchPosts(value);
    } else {
      fetchPosts();
    }
  };

  const handleDelete = async (slug: string) => {
    if (
      window.confirm("Bu blog yazısını silmek istediğinizden emin misiniz?")
    ) {
      const success = await deletePost(slug);
      if (success) {
        router.refresh();
      }
    }
  };

  const handleView = (post: BlogPostData) => {
    setSelectedPost(post);
    setIsViewModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-400">Hata: {error}</p>
          <Button
            onClick={() => fetchPosts()}
            className="mt-4 bg-blue-500 hover:bg-blue-600"
          >
            Tekrar Dene
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Blog Yazıları
          </h1>
          <p className="text-sm sm:text-base text-gray-400 mt-1">
            Tüm blog yazılarını yönetin
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Blog yazısı ara..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 bg-gray-900/50 border-gray-800 h-10 sm:h-12 text-sm sm:text-base"
          />
        </div>
        <Button
          variant="outline"
          className="bg-gray-900/50 border-gray-800 h-10 sm:h-12 text-sm sm:text-base"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filtrele
        </Button>
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {posts.map((post) => (
          <Card
            key={post.id}
            className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-colors"
          >
            <CardHeader className="p-0">
              {post.coverImage && (
                <div className="relative w-full h-40 sm:h-48 rounded-t-lg overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 rounded-lg bg-blue-500/10">
                    <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
                  </div>
                  <CardTitle className="text-base sm:text-lg text-white line-clamp-2">
                    {post.title}
                  </CardTitle>
                </div>
                <CardDescription className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2">
                  {post.category}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <p className="text-sm sm:text-base text-gray-400 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{post.author.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{post.readingTime}</span>
                </div>
              </div>
              {post.keywords && post.keywords.length > 0 && (
                <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                  {post.keywords.slice(0, 3).map((keyword) => (
                    <Badge
                      key={keyword}
                      variant="secondary"
                      className="bg-gray-800 text-gray-300 text-xs"
                    >
                      <Tag className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
                      {keyword}
                    </Badge>
                  ))}
                  {post.keywords.length > 3 && (
                    <Badge
                      variant="secondary"
                      className="bg-gray-800 text-gray-300 text-xs"
                    >
                      +{post.keywords.length - 3}
                    </Badge>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end gap-2 p-4 sm:p-6 pt-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleView(post)}
                className="text-gray-400 hover:text-white hover:bg-gray-800/50 h-8 sm:h-9"
              >
                <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(post.slug)}
                className="text-red-400 hover:text-red-300 hover:bg-gray-800/50 h-8 sm:h-9"
              >
                <Trash className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* View Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 max-w-[95vw] sm:max-w-[90vw] max-h-[90vh] overflow-y-auto p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-bold text-white">
              Blog Yazısı Detayları
            </DialogTitle>
          </DialogHeader>
          {selectedPost && (
            <div className="space-y-6 sm:space-y-8">
              {selectedPost.coverImage && (
                <div className="relative w-full h-48 sm:h-96 rounded-lg overflow-hidden">
                  <Image
                    src={selectedPost.coverImage}
                    alt={selectedPost.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex items-center gap-3 sm:gap-4">
                <img
                  src={selectedPost.author.avatar}
                  alt={selectedPost.author.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                />
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white">
                    {selectedPost.author.name}
                  </h3>
                  <p className="text-sm text-gray-400">{selectedPost.date}</p>
                </div>
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
                  {selectedPost.title}
                </h2>
                <p className="text-base sm:text-lg text-gray-400 mb-4 sm:mb-6">
                  {selectedPost.excerpt}
                </p>
                <div className="prose prose-invert max-w-none text-sm sm:text-base">
                  {selectedPost.content}
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {selectedPost.keywords?.map((keyword) => (
                  <Badge
                    key={keyword}
                    variant="secondary"
                    className="bg-gray-800 text-gray-300 text-xs"
                  >
                    <Tag className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
                    {keyword}
                  </Badge>
                ))}
              </div>
              {selectedPost.relatedSimulations?.length > 0 && (
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-white">
                    İlgili Simülasyonlar
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {selectedPost.relatedSimulations.map((simulationId) => {
                      const simulation = simulations.find(
                        (s) => s.id === simulationId
                      );
                      return (
                        <Card
                          key={simulationId}
                          className="bg-gray-800/50 border-gray-700"
                        >
                          <CardHeader className="p-4 sm:p-6">
                            <CardTitle className="text-base sm:text-lg text-white">
                              {simulation?.title}
                            </CardTitle>
                            <CardDescription className="text-sm">
                              {simulation?.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="p-4 sm:p-6 pt-0">
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                              <span>{simulation?.completionTime}</span>
                              <span>•</span>
                              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                              <span>{simulation?.difficulty}</span>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Kategori: {selectedPost.category}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Okuma Süresi: {selectedPost.readingTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Durum: {selectedPost.status}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
