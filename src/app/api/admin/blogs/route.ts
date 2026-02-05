import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

// GET all blogs (for admin)
export async function GET() {
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const blogs = await prisma.blog.findMany({
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ blogs });
    } catch (error) {
        console.error("Failed to fetch blogs:", error);
        return NextResponse.json(
            { error: "Failed to fetch blogs" },
            { status: 500 }
        );
    }
}

// POST create new blog
export async function POST(req: NextRequest) {
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const body = await req.json();
        const { title, slug, excerpt, content, coverImage, published } = body;

        if (!title || !slug || !excerpt || !content) {
            return NextResponse.json(
                { error: "Title, slug, excerpt, and content are required" },
                { status: 400 }
            );
        }

        // Validate slug format
        const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
        if (!slugRegex.test(slug)) {
            return NextResponse.json(
                { error: "Slug must be lowercase with hyphens only" },
                { status: 400 }
            );
        }

        // Check if slug already exists
        const existing = await prisma.blog.findUnique({ where: { slug } });
        if (existing) {
            return NextResponse.json(
                { error: "A blog with this slug already exists" },
                { status: 400 }
            );
        }

        const blog = await prisma.blog.create({
            data: {
                title,
                slug,
                excerpt,
                content,
                coverImage,
                published: published || false,
                publishedAt: published ? new Date() : null,
            },
        });

        return NextResponse.json({ success: true, blog });
    } catch (error) {
        console.error("Failed to create blog:", error);
        return NextResponse.json(
            { error: "Failed to create blog" },
            { status: 500 }
        );
    }
}
