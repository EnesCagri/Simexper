import { NextResponse } from "next/server";
import { getBlogPosts, getBlogPostBySlug } from "@/db/utils";
import fs from "fs";
import path from "path";
import blogsData from "@/db/blogs.json";

// GET /api/blogs - Get all blog posts
export async function GET() {
  try {
    return NextResponse.json(blogsData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

// POST /api/blogs - Create a new blog post
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const posts = getBlogPosts();

    // Generate a unique ID and slug
    const id = `blog-${Date.now()}`;
    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const newPost = {
      id,
      slug,
      ...data,
      date: new Date().toISOString().split("T")[0],
    };

    // Read the current blogs.json file
    const filePath = path.join(process.cwd(), "src/db/blogs.json");
    const fileContent = fs.readFileSync(filePath, "utf8");
    const blogsData = JSON.parse(fileContent);

    // Add the new post
    blogsData.posts.push(newPost);

    // Write back to the file
    fs.writeFileSync(filePath, JSON.stringify(blogsData, null, 2));

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}
