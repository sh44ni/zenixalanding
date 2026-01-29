"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatedSection } from "@/components/shared/animated-section";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    ShoppingCart,
    Smartphone,
    Monitor,
} from "lucide-react";

const categories = [
    { id: "storefront", label: "Storefront", icon: ShoppingCart },
    { id: "admin", label: "Admin Panel", icon: LayoutDashboard },
    { id: "mobile", label: "Mobile Views", icon: Smartphone },
];

const screenshots = {
    storefront: [
        {
            src: "/screenshots/homepage-screenshot-normal-desktop-view.png",
            title: "Homepage",
            description: "Beautiful hero section with featured products",
        },
        {
            src: "/screenshots/shop-page.png",
            title: "Shop Page",
            description: "Grid layout with filters and sorting",
        },
        {
            src: "/screenshots/single-product-page.png",
            title: "Product Details",
            description: "Detailed product view with variants",
        },
        {
            src: "/screenshots/cart-page.png",
            title: "Shopping Cart",
            description: "Easy cart management",
        },
        {
            src: "/screenshots/checkout.png",
            title: "Checkout",
            description: "Streamlined checkout process",
        },
        {
            src: "/screenshots/track-order-page.png",
            title: "Order Tracking",
            description: "Real-time order tracking",
        },
    ],
    admin: [
        {
            src: "/screenshots/admin-dashbord.png",
            title: "Dashboard",
            description: "Overview of your store performance",
        },
        {
            src: "/screenshots/products-admin.png",
            title: "Products",
            description: "Manage your product catalog",
        },
        {
            src: "/screenshots/orders.png",
            title: "Orders",
            description: "Process and track orders",
        },
        {
            src: "/screenshots/inventory.png",
            title: "Inventory",
            description: "Stock management system",
        },
        {
            src: "/screenshots/customers-admin.png",
            title: "Customers",
            description: "Customer relationship management",
        },
        {
            src: "/screenshots/analytics.png",
            title: "Analytics",
            description: "Detailed business insights",
        },
        {
            src: "/screenshots/coupon-admin.png",
            title: "Coupons",
            description: "Discount code management",
        },
        {
            src: "/screenshots/payment-methods.png",
            title: "Payments",
            description: "Payment gateway settings",
        },
    ],
    mobile: [
        {
            src: "/screenshots/homepage-screenshot-normal-desktop-view-mobile-version.png",
            title: "Mobile Homepage",
            description: "Responsive mobile design",
        },
        {
            src: "/screenshots/admin-dashboard-mobile.png",
            title: "Mobile Admin",
            description: "Manage on the go",
        },
        {
            src: "/screenshots/orders-mob.png",
            title: "Mobile Orders",
            description: "Order management on mobile",
        },
        {
            src: "/screenshots/products-admin-mob.png",
            title: "Mobile Products",
            description: "Product management on mobile",
        },
        {
            src: "/screenshots/analytics-mobile.png",
            title: "Mobile Analytics",
            description: "View analytics anywhere",
        },
        {
            src: "/screenshots/track-order-pagemob.png",
            title: "Mobile Tracking",
            description: "Track orders on phone",
        },
    ],
};

export function ScreenshotsSection() {
    const [activeCategory, setActiveCategory] = useState("storefront");
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const activeScreenshots = screenshots[activeCategory as keyof typeof screenshots];

    return (
        <section id="screenshots" className="section-padding bg-slate-50">
            <div className="container-custom">
                {/* Section Header */}
                <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                        <Monitor className="w-4 h-4" />
                        Live Preview
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                        See Zenixa in{" "}
                        <span className="text-primary">Action</span>
                    </h2>
                    <p className="text-lg text-slate-600">
                        Explore our beautiful, conversion-optimized storefront and powerful admin panel.
                    </p>
                </AnimatedSection>

                {/* Category Tabs */}
                <AnimatedSection delay={200} className="mb-10">
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={cn(
                                    "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300",
                                    activeCategory === category.id
                                        ? "bg-primary text-white shadow-lg shadow-primary/25"
                                        : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                                )}
                            >
                                <category.icon className="w-5 h-5" />
                                {category.label}
                            </button>
                        ))}
                    </div>
                </AnimatedSection>

                {/* Screenshots Grid */}
                <div className={cn(
                    "grid gap-6",
                    activeCategory === "mobile"
                        ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
                        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                )}>
                    {activeScreenshots.map((screenshot, index) => (
                        <AnimatedSection
                            key={`${activeCategory}-${index}`}
                            delay={index * 100}
                            className="group"
                        >
                            <div
                                className="cursor-pointer"
                                onClick={() => setSelectedImage(screenshot.src)}
                            >
                                <div className={cn(
                                    "relative bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300",
                                    activeCategory === "mobile" ? "" : ""
                                )}>
                                    {/* Browser/Phone Frame */}
                                    {activeCategory !== "mobile" ? (
                                        <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 border-b border-slate-200">
                                            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                        </div>
                                    ) : (
                                        <div className="h-4 bg-slate-900 rounded-t-xl flex items-center justify-center">
                                            <div className="w-12 h-1 bg-slate-700 rounded-full" />
                                        </div>
                                    )}

                                    {/* Screenshot */}
                                    <div className={cn(
                                        "relative overflow-hidden",
                                        activeCategory === "mobile" ? "aspect-[9/16]" : "aspect-[16/10]"
                                    )}>
                                        <Image
                                            src={screenshot.src}
                                            alt={screenshot.title}
                                            fill
                                            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {/* Overlay on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                            <div className="text-white">
                                                <h4 className="font-semibold">{screenshot.title}</h4>
                                                <p className="text-sm text-slate-300">{screenshot.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-6xl w-full max-h-[90vh]">
                        <Image
                            src={selectedImage}
                            alt="Screenshot preview"
                            width={1920}
                            height={1080}
                            className="w-full h-auto object-contain rounded-lg"
                        />
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute -top-12 right-0 text-white hover:text-primary transition-colors"
                        >
                            Press anywhere to close
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}
