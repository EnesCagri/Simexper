import { NextRequest, NextResponse } from "next/server";
import { getBlogPostBySlug } from "@/db/utils";
import fs from "fs";
import path from "path";

// GET /api/blogs/[slug] - Get a specific blog post
export async function GET(
  request: NextRequest,
  context: { params: { slug: string } }
) {
  try {
    const post = getBlogPostBySlug(context.params.slug);
    if (!post) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}

// PUT /api/blogs/[slug] - Update a blog post
export async function PUT(
  request: NextRequest,
  context: { params: { slug: string } }
) {
  try {
    const data = await request.json();
    const filePath = path.join(process.cwd(), "src/db/blogs.json");
    const fileContent = fs.readFileSync(filePath, "utf8");
    const blogsData = JSON.parse(fileContent);

    const postIndex = blogsData.posts.findIndex(
      (post: any) => post.slug === context.params.slug
    );

    if (postIndex === -1) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    // Update the post
    blogsData.posts[postIndex] = {
      ...blogsData.posts[postIndex],
      ...data,
    };

    // Write back to the file
    fs.writeFileSync(filePath, JSON.stringify(blogsData, null, 2));

    return NextResponse.json(blogsData.posts[postIndex]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 }
    );
  }
}

// DELETE /api/blogs/[slug] - Delete a blog post
export async function DELETE(
  request: NextRequest,
  context: { params: { slug: string } }
) {
  try {
    const filePath = path.join(process.cwd(), "src/db/blogs.json");
    const fileContent = fs.readFileSync(filePath, "utf8");
    const blogsData = JSON.parse(fileContent);

    const postIndex = blogsData.posts.findIndex(
      (post: any) => post.slug === context.params.slug
    );

    if (postIndex === -1) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    // Remove the post
    blogsData.posts.splice(postIndex, 1);

    // Write back to the file
    fs.writeFileSync(filePath, JSON.stringify(blogsData, null, 2));

    return NextResponse.json({ message: "Blog post deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
