import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

// GET single blog
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const { id } = await params;
        const blog = await prisma.blog.findUnique({ where: { id } });

        if (!blog) {
            return NextResponse.json(
                { error: "Blog not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ blog });
    } catch (error) {
        console.error("Failed to fetch blog:", error);
        return NextResponse.json(
            { error: "Failed to fetch blog" },
            { status: 500 }
        );
    }
}

// PATCH update blog
export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const { id } = await params;
        const body = await req.json();
        const { title, slug, excerpt, content, coverImage, published } = body;

        const existingBlog = await prisma.blog.findUnique({ where: { id } });
        if (!existingBlog) {
            return NextResponse.json(
                { error: "Blog not found" },
                { status: 404 }
            );
        }

        // If slug is being changed, check for conflicts
        if (slug && slug !== existingBlog.slug) {
            const slugExists = await prisma.blog.findUnique({ where: { slug } });
            if (slugExists) {
                return NextResponse.json(
                    { error: "A blog with this slug already exists" },
                    { status: 400 }
                );
            }
        }

        // Determine publishedAt
        let publishedAt = existingBlog.publishedAt;
        if (published === true && !existingBlog.published) {
            publishedAt = new Date();
        } else if (published === false) {
            publishedAt = null;
        }

        const blog = await prisma.blog.update({
            where: { id },
            data: {
                ...(title && { title }),
                ...(slug && { slug }),
                ...(excerpt && { excerpt }),
                ...(content && { content }),
                ...(coverImage !== undefined && { coverImage }),
                ...(published !== undefined && { published }),
                publishedAt,
            },
        });

        return NextResponse.json({ success: true, blog });
    } catch (error) {
        console.error("Failed to update blog:", error);
        return NextResponse.json(
            { error: "Failed to update blog" },
            { status: 500 }
        );
    }
}

// DELETE blog
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const { id } = await params;

        await prisma.blog.delete({ where: { id } });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to delete blog:", error);
        return NextResponse.json(
            { error: "Failed to delete blog" },
            { status: 500 }
        );
    }
}
