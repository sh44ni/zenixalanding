import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog | Zenixa - E-commerce Insights for Pakistani Businesses",
    description: "Read our latest articles on e-commerce, business growth, and digital solutions for Pakistani businesses.",
};

async function getPublishedBlogs() {
    const blogs = await prisma.blog.findMany({
        where: { published: true },
        orderBy: { publishedAt: "desc" },
    });
    return blogs;
}

export default async function BlogPage() {
    const blogs = await getPublishedBlogs();

    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <section className="pt-32 pb-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Blog
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Insights, guides, and analysis for Pakistani businesses navigating the e-commerce landscape.
                    </p>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="pb-24 px-4">
                <div className="max-w-6xl mx-auto">
                    {blogs.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-gray-500 text-lg">No blog posts yet. Check back soon!</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogs.map((blog) => (
                                <Link
                                    key={blog.id}
                                    href={`/blog/${blog.slug}`}
                                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300"
                                >
                                    {/* Cover Image */}
                                    <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                                        {blog.coverImage ? (
                                            <Image
                                                src={blog.coverImage}
                                                alt={blog.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="text-4xl font-bold text-gray-300">Z</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                                            <Calendar className="w-4 h-4" />
                                            {blog.publishedAt
                                                ? new Date(blog.publishedAt).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })
                                                : "Draft"}
                                        </div>

                                        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                            {blog.title}
                                        </h2>

                                        <p className="text-gray-600 line-clamp-3 mb-4">
                                            {blog.excerpt}
                                        </p>

                                        <div className="flex items-center text-primary font-medium text-sm">
                                            Read More
                                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
