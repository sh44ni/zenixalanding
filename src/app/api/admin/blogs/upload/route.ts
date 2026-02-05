import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 }
            );
        }

        // Validate file type
        const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: "Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed." },
                { status: 400 }
            );
        }

        // Validate file size (max 10MB for Cloudinary)
        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: "File too large. Maximum size is 10MB." },
                { status: 400 }
            );
        }

        // Upload to Cloudinary
        const result = await uploadToCloudinary(file, "blog");

        return NextResponse.json({
            success: true,
            url: result.url,
            publicId: result.publicId
        });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { error: "Failed to upload file" },
            { status: 500 }
        );
    }
}
