"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getBlogPostBySlug, getRelatedBlogPosts } from "@/db/utils";
import { BlogPostData } from "@/db/types";
import {
  Calendar,
  Clock,
  ChevronRight,
  MessageCircle,
  ThumbsUp,
  Share2,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  date: string;
  likes: number;
}

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostData[]>([]);
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: {
        name: "Ayşe Yılmaz",
        avatar: "/images/avatars/ayse.jpg",
      },
      content: "Harika bir yazı olmuş, teşekkürler!",
      date: "2024-04-15",
      likes: 5,
    },
    {
      id: "2",
      author: {
        name: "Mehmet Demir",
        avatar: "/images/avatars/mehmet.jpg",
      },
      content:
        "Çok faydalı bilgiler var, özellikle simülasyon kısmı çok iyi açıklanmış.",
      date: "2024-04-14",
      likes: 3,
    },
  ]);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const currentPost = getBlogPostBySlug(slug as string);
    if (currentPost) {
      setPost(currentPost);
      setLikes(currentPost.likes || 0);
      setRelatedPosts(getRelatedBlogPosts(currentPost));
    }
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-gray-400">Yükleniyor...</div>
      </div>
    );
  }

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header with Cover Image */}
      <div className="relative h-[60vh] w-full">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-950" />

        {/* Title and Meta */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge
                variant="outline"
                className="mb-4 bg-blue-500/20 text-blue-400 border-blue-500/20"
              >
                {post.category}
              </Badge>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                {post.title}
              </h1>
              <div className="flex items-center gap-6 text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString("tr-TR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readingTime}
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  {comments.length} Yorum
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Interaction Buttons */}
            <div className="flex items-center gap-4 mt-8 border-t border-gray-800 pt-8">
              <Button
                variant={isLiked ? "default" : "outline"}
                className={isLiked ? "bg-blue-500 hover:bg-blue-600" : ""}
                onClick={handleLike}
              >
                <ThumbsUp className="w-4 h-4 mr-2" />
                {likes} Beğeni
              </Button>
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Paylaş
              </Button>
            </div>

            {/* Author Card */}
            <Card className="mt-8 bg-gray-900/50 border-gray-800">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={post.author.avatar}
                      alt={post.author.name}
                    />
                    <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-white">
                      {post.author.name}
                    </CardTitle>
                    <CardDescription>{post.author.title}</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Comments Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-white mb-6">Yorumlar</h2>
              <div className="space-y-6">
                {comments.map((comment) => (
                  <Card
                    key={comment.id}
                    className="bg-gray-900/50 border-gray-800"
                  >
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={comment.author.avatar}
                            alt={comment.author.name}
                          />
                          <AvatarFallback>
                            {comment.author.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium text-white">
                              {comment.author.name}
                            </CardTitle>
                            <CardDescription className="text-xs">
                              {new Date(comment.date).toLocaleDateString(
                                "tr-TR"
                              )}
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400">{comment.content}</p>
                      <div className="flex items-center gap-2 mt-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400"
                        >
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          {comment.likes}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Keywords */}
            <Card className="bg-gray-900/50 border-gray-800 mb-8">
              <CardHeader>
                <CardTitle className="text-white">Anahtar Kelimeler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {post.keywords.map((keyword) => (
                    <Badge
                      key={keyword}
                      variant="outline"
                      className="bg-gray-800/50"
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Related Posts */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">İlgili Yazılar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.slug}
                      href={`/blogs/${relatedPost.slug}`}
                      className="block group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="relative h-20 w-20 flex-shrink-0">
                          <Image
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors">
                            {relatedPost.title}
                          </h3>
                          <p className="text-sm text-gray-400 mt-1">
                            {relatedPost.readingTime}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Related Simulations */}
            {post.relatedSimulations && post.relatedSimulations.length > 0 && (
              <Card className="bg-gray-900/50 border-gray-800 mt-8">
                <CardHeader>
                  <CardTitle className="text-white">
                    İlgili Simülasyonlar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {post.relatedSimulations.map((simSlug) => (
                      <Link
                        key={simSlug}
                        href={`/simulations/${simSlug}`}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors group"
                      >
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-blue-400" />
                          <span className="text-gray-300 group-hover:text-white transition-colors">
                            {simSlug.replace(/-/g, " ")}
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
