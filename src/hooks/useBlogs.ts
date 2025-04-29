import { useState, useCallback } from "react";
import { BlogService } from "@/services/BlogService";
import { BlogPostData } from "@/db/types";

export function useBlogs() {
  const [posts, setPosts] = useState<BlogPostData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all posts
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await BlogService.getAllPosts();
      setPosts(data);
    } catch (err) {
      setError("Failed to fetch blog posts");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch a single post
  const fetchPost = useCallback(async (slug: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await BlogService.getPostBySlug(slug);
      return data;
    } catch (err) {
      setError("Failed to fetch blog post");
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new post
  const createPost = useCallback(
    async (postData: Omit<BlogPostData, "id" | "slug" | "date">) => {
      try {
        setLoading(true);
        setError(null);
        const newPost = await BlogService.createPost(postData);
        setPosts((prev) => [...prev, newPost]);
        return newPost;
      } catch (err) {
        setError("Failed to create blog post");
        console.error(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Update a post
  const updatePost = useCallback(
    async (slug: string, postData: Partial<BlogPostData>) => {
      try {
        setLoading(true);
        setError(null);
        const updatedPost = await BlogService.updatePost(slug, postData);
        setPosts((prev) =>
          prev.map((post) => (post.slug === slug ? updatedPost : post))
        );
        return updatedPost;
      } catch (err) {
        setError("Failed to update blog post");
        console.error(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Delete a post
  const deletePost = useCallback(async (slug: string) => {
    try {
      setLoading(true);
      setError(null);
      await BlogService.deletePost(slug);
      setPosts((prev) => prev.filter((post) => post.slug !== slug));
      return true;
    } catch (err) {
      setError("Failed to delete blog post");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Search posts
  const searchPosts = useCallback(async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const results = await BlogService.searchPosts(query);
      setPosts(results);
      return results;
    } catch (err) {
      setError("Failed to search blog posts");
      console.error(err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Get posts by category
  const getPostsByCategory = useCallback(async (category: string) => {
    try {
      setLoading(true);
      setError(null);
      const results = await BlogService.getPostsByCategory(category);
      setPosts(results);
      return results;
    } catch (err) {
      setError("Failed to fetch posts by category");
      console.error(err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    posts,
    loading,
    error,
    fetchPosts,
    fetchPost,
    createPost,
    updatePost,
    deletePost,
    searchPosts,
    getPostsByCategory,
  };
}
