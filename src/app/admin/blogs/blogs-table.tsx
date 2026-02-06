"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

interface Blog {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    published: boolean;
    publishedAt: Date | null;
    createdAt: Date;
}

interface BlogsTableProps {
    blogs: Blog[];
}

export function BlogsTable({ blogs: initialBlogs }: BlogsTableProps) {
    const [blogs, setBlogs] = useState(initialBlogs);
    const [isLoading, setIsLoading] = useState<string | null>(null);

    const togglePublish = async (id: string, currentStatus: boolean) => {
        setIsLoading(id);
        try {
            const res = await fetch(`/api/admin/blogs/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ published: !currentStatus }),
            });

            if (res.ok) {
                setBlogs((prev) =>
                    prev.map((b) =>
                        b.id === id ? { ...b, published: !currentStatus } : b
                    )
                );
            }
        } catch (error) {
            console.error("Failed to toggle publish:", error);
        } finally {
            setIsLoading(null);
        }
    };

    const deleteBlog = async (id: string) => {
        if (!confirm("Are you sure you want to delete this blog post?")) return;

        setIsLoading(id);
        try {
            const res = await fetch(`/api/admin/blogs/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setBlogs((prev) => prev.filter((b) => b.id !== id));
            }
        } catch (error) {
            console.error("Failed to delete blog:", error);
        } finally {
            setIsLoading(null);
        }
    };

    if (blogs.length === 0) {
        return (
            <div className="bg-white rounded-xl p-12 text-center border border-gray-100">
                <p className="text-gray-500">No blog posts yet</p>
                <Button asChild className="mt-4">
                    <Link href="/admin/blogs/new">Create your first post</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                        <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Title</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Status</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Date</th>
                        <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {blogs.map((blog) => (
                        <tr key={blog.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                                <p className="font-medium text-gray-900 line-clamp-1">{blog.title}</p>
                                <p className="text-sm text-gray-500">/blog/{blog.slug}</p>
                            </td>
                            <td className="px-6 py-4">
                                <span
                                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${blog.published
                                        ? "bg-green-100 text-green-700"
                                        : "bg-gray-100 text-gray-600"
                                        }`}
                                >
                                    {blog.published ? "Published" : "Draft"}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-gray-600">
                                {new Date(blog.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center justify-end gap-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => togglePublish(blog.id, blog.published)}
                                        disabled={isLoading === blog.id}
                                        title={blog.published ? "Unpublish" : "Publish"}
                                    >
                                        {blog.published ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </Button>
                                    <Button size="sm" variant="outline" asChild>
                                        <Link href={`/admin/blogs/${blog.id}`}>
                                            <Pencil className="w-4 h-4" />
                                        </Link>
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="text-red-600 border-red-200 hover:bg-red-50"
                                        onClick={() => deleteBlog(blog.id)}
                                        disabled={isLoading === blog.id}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
