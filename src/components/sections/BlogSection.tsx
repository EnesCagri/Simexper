"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: {
    name: string;
    avatar: string;
    title: string;
  };
  image: string;
  category: string;
  readingTime: string;
}

export function BlogSection() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Fetch blog posts from blogs.json
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        // Only show first 3 posts in the section
        setBlogPosts(data.posts.slice(0, 3));
      })
      .catch((error) => {
        console.error("Error fetching blog posts:", error);
      });
  }, []);

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gray-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(51,65,85,0.15),transparent_50%)]" />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="text-sm text-gray-400 mb-2">
                • Haberler & Blog
              </div>
              <h2 className="text-2xl font-semibold text-white">
                En Son Haberler & Blog Yazılarımız
              </h2>
            </div>
            <Link
              href="/blogs"
              className="inline-flex items-center px-4 py-1 rounded-full bg-gray-900 text-sm text-gray-300 hover:text-white"
            >
              Tüm Yazıları Gör →
            </Link>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/blogs/${post.slug}`}>
                  <div className="relative">
                    {/* Image Container */}
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <div className="flex items-center text-xs text-gray-400">
                        <span>{post.date}</span>
                        <span className="mx-2">•</span>
                        <span>{post.author.name}</span>
                      </div>
                      <h3 className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <div className="inline-flex items-center text-sm text-gray-400 group-hover:text-white transition-colors">
                        Devamını Oku →
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
