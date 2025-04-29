import axios from "axios";
import { BlogPostData } from "@/db/types";

const API_URL = "/api/blogs";

export class BlogService {
  // Get all blog posts
  static async getAllPosts(): Promise<BlogPostData[]> {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      throw error;
    }
  }

  // Get a single blog post by slug
  static async getPostBySlug(slug: string): Promise<BlogPostData> {
    try {
      const response = await axios.get(`${API_URL}/${slug}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching blog post ${slug}:`, error);
      throw error;
    }
  }

  // Create a new blog post
  static async createPost(
    postData: Omit<BlogPostData, "id" | "slug" | "date">
  ): Promise<BlogPostData> {
    try {
      const response = await axios.post(API_URL, postData);
      return response.data;
    } catch (error) {
      console.error("Error creating blog post:", error);
      throw error;
    }
  }

  // Update a blog post
  static async updatePost(
    slug: string,
    postData: Partial<BlogPostData>
  ): Promise<BlogPostData> {
    try {
      const response = await axios.put(`${API_URL}/${slug}`, postData);
      return response.data;
    } catch (error) {
      console.error(`Error updating blog post ${slug}:`, error);
      throw error;
    }
  }

  // Delete a blog post
  static async deletePost(slug: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}/${slug}`);
    } catch (error) {
      console.error(`Error deleting blog post ${slug}:`, error);
      throw error;
    }
  }

  // Get posts by category
  static async getPostsByCategory(category: string): Promise<BlogPostData[]> {
    try {
      const response = await axios.get(`${API_URL}?category=${category}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching posts for category ${category}:`, error);
      throw error;
    }
  }

  // Search posts
  static async searchPosts(query: string): Promise<BlogPostData[]> {
    try {
      const response = await axios.get(`${API_URL}?search=${query}`);
      return response.data;
    } catch (error) {
      console.error(`Error searching posts with query ${query}:`, error);
      throw error;
    }
  }
}
