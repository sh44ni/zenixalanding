import { NextResponse } from "next/server";
import { seedFirstBlog } from "@/lib/seed-blog";
import { requireAdmin } from "@/lib/auth";

// POST to seed the first blog post (admin only)
export async function POST() {
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const blog = await seedFirstBlog();
        return NextResponse.json({ success: true, blog });
    } catch (error) {
        console.error("Seed blog error:", error);
        return NextResponse.json(
            { error: "Failed to seed blog" },
            { status: 500 }
        );
    }
}
