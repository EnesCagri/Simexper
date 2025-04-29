"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BlogForm from "@/components/BlogForm";
import { useBlogs } from "@/hooks/useBlogs";
import { BlogPostData } from "@/db/types";

export default function EditBlogPage() {
  const params = useParams();
  const { getPost } = useBlogs();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPost(params.slug as string);
        setPost(data);
      } catch (err) {
        setError("Blog yazısı yüklenirken bir hata oluştu.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.slug, getPost]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <p className="text-red-500">{error || "Blog yazısı bulunamadı."}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Blog Yazısını Düzenle</h1>
      </div>
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <BlogForm mode="edit" initialData={post} />
      </div>
    </div>
  );
}
