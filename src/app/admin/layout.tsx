"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    ClipboardList,
    Users,
    DollarSign,
    ChevronLeft,
    LogOut,
    Loader2,
    ShoppingBag,
    Wallet,
    FileText,
    MessageCircle,
    UserPlus,
    Menu,
    X
} from "lucide-react";

const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Conversations", href: "/admin/conversations", icon: MessageCircle },
    { label: "Leads", href: "/admin/leads", icon: UserPlus },
    { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { label: "Applications", href: "/admin/applications", icon: ClipboardList },
    { label: "Affiliates", href: "/admin/affiliates", icon: Users },
    { label: "Withdrawals", href: "/admin/withdrawals", icon: Wallet },
    { label: "Commissions", href: "/admin/commissions", icon: DollarSign },
    { label: "Blogs", href: "/admin/blogs", icon: FileText },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Skip auth check for login page
    const isLoginPage = pathname === "/admin/login";

    useEffect(() => {
        if (isLoginPage) {
            setIsAuthenticated(true);
            return;
        }

        // Check for admin session
        const checkAuth = async () => {
            try {
                const res = await fetch("/api/admin/auth/check");
                if (res.ok) {
                    setIsAuthenticated(true);
                } else {
                    router.replace("/admin/login");
                }
            } catch {
                router.replace("/admin/login");
            }
        };

        checkAuth();
    }, [isLoginPage, router]);

    // Close sidebar on route change (mobile)
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [pathname]);

    const handleLogout = async () => {
        await fetch("/api/admin/auth/logout", { method: "POST" });
        router.replace("/admin/login");
    };

    // Show loading while checking auth
    if (isAuthenticated === null && !isLoginPage) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    // Login page - render without sidebar
    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile Header */}
            <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-gray-900 text-white flex items-center justify-between px-4 z-40">
                <Link href="/admin" className="flex items-center gap-3">
                    <Image
                        src="/logo_logofordarkbg.svg"
                        alt="Zenixa"
                        width={100}
                        height={32}
                        className="h-7 w-auto"
                    />
                    <span className="text-sm font-medium text-gray-400">Admin</span>
                </Link>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-800 transition-colors"
                    aria-label="Toggle menu"
                >
                    {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </header>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white flex flex-col z-50 transition-transform duration-300",
                    // Mobile: slide in/out
                    "lg:translate-x-0",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Logo - hidden on mobile (shown in header instead) */}
                <div className="p-6 border-b border-gray-800 hidden lg:block">
                    <Link href="/admin" className="flex items-center gap-3">
                        <Image
                            src="/logo_logofordarkbg.svg"
                            alt="Zenixa"
                            width={100}
                            height={32}
                            className="h-8 w-auto"
                        />
                        <span className="text-sm font-medium text-gray-400">Admin</span>
                    </Link>
                </div>

                {/* Mobile close button area */}
                <div className="lg:hidden p-4 border-b border-gray-800 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-400">Menu</span>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Nav Items */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                                    isActive
                                        ? "bg-primary text-white"
                                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                                )}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-gray-800 space-y-2">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Back to Site
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="lg:ml-64 min-h-screen pt-16 lg:pt-0">
                {children}
            </main>
        </div>
    );
}
