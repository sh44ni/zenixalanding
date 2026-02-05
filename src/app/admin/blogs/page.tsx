import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogsTable } from "./blogs-table";

async function getBlogs() {
    const blogs = await prisma.blog.findMany({
        orderBy: { createdAt: "desc" },
    });
    return blogs;
}

export default async function BlogsPage() {
    const blogs = await getBlogs();

    return (
        <div className="p-8">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
                    <p className="text-gray-500 mt-1">Manage your blog content</p>
                </div>
                <Button asChild>
                    <Link href="/admin/blogs/new">
                        <Plus className="w-4 h-4 mr-2" />
                        New Post
                    </Link>
                </Button>
            </div>

            <BlogsTable blogs={blogs} />
        </div>
    );
}
