"use client";

import BlogForm from "@/components/BlogForm";

export default function CreateBlogPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Yeni Blog Yazısı</h1>
      </div>
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <BlogForm mode="create" />
      </div>
    </div>
  );
}
