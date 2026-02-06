"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Loader2, X, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function NewBlogPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        coverImage: "",
        published: false,
    });

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .trim();
    };

    const handleTitleChange = (title: string) => {
        setFormData((prev) => ({
            ...prev,
            title,
            slug: prev.slug === "" || prev.slug === generateSlug(prev.title)
                ? generateSlug(title)
                : prev.slug,
        }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        setError("");

        try {
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/admin/blogs/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (res.ok) {
                setFormData((prev) => ({ ...prev, coverImage: data.url }));
            } else {
                setError(data.error || "Failed to upload image");
            }
        } catch {
            setError("Failed to upload image");
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const handleRemoveImage = () => {
        setFormData((prev) => ({ ...prev, coverImage: "" }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/admin/blogs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                router.push("/admin/blogs");
            } else {
                setError(data.error || "Failed to create blog");
            }
        } catch {
            setError("Network error. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-8">
            <div className="mb-8">
                <Link
                    href="/admin/blogs"
                    className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-4"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Blogs
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">New Blog Post</h1>
            </div>

            <form onSubmit={handleSubmit} className="max-w-4xl">
                <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-6">
                    {error && (
                        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => handleTitleChange(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Enter blog title"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Slug
                        </label>
                        <div className="flex items-center">
                            <span className="text-gray-500 mr-2">/blog/</span>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, slug: e.target.value }))
                                }
                                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="blog-url-slug"
                                required
                            />
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Cover Image
                        </label>

                        {formData.coverImage ? (
                            <div className="relative">
                                <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden bg-gray-100">
                                    <Image
                                        src={formData.coverImage}
                                        alt="Cover preview"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
                            >
                                {isUploading ? (
                                    <div className="flex flex-col items-center">
                                        <Loader2 className="w-8 h-8 text-gray-400 animate-spin mb-2" />
                                        <p className="text-sm text-gray-500">Uploading...</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <ImageIcon className="w-10 h-10 text-gray-300 mb-3" />
                                        <p className="text-sm text-gray-600 font-medium">Click to upload cover image</p>
                                        <p className="text-xs text-gray-400 mt-1">JPEG, PNG, WebP or GIF (max 5MB)</p>
                                    </div>
                                )}
                            </div>
                        )}

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/gif"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Excerpt
                        </label>
                        <textarea
                            value={formData.excerpt}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
                            }
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                            rows={3}
                            placeholder="Short summary for blog listings..."
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Content (HTML)
                        </label>
                        <textarea
                            value={formData.content}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, content: e.target.value }))
                            }
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm resize-none"
                            rows={20}
                            placeholder="Blog content in HTML..."
                            required
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="published"
                            checked={formData.published}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, published: e.target.checked }))
                            }
                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                        <label htmlFor="published" className="text-sm text-gray-700">
                            Publish immediately
                        </label>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                                <Save className="w-4 h-4 mr-2" />
                            )}
                            Create Post
                        </Button>
                        <Button type="button" variant="outline" asChild>
                            <Link href="/admin/blogs">Cancel</Link>
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
