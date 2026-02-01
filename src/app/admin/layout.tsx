"use client";

import Link from "next/link";
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
    Wallet
} from "lucide-react";

const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { label: "Applications", href: "/admin/applications", icon: ClipboardList },
    { label: "Affiliates", href: "/admin/affiliates", icon: Users },
    { label: "Withdrawals", href: "/admin/withdrawals", icon: Wallet },
    { label: "Commissions", href: "/admin/commissions", icon: DollarSign },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

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
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-900 text-white flex flex-col">
                {/* Logo */}
                <div className="p-6 border-b border-gray-800">
                    <Link href="/admin" className="flex items-center gap-2 text-xl font-bold">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                                <path d="M3 6h18" />
                                <path d="M16 10a4 4 0 0 1-8 0" />
                            </svg>
                        </div>
                        Zenixa Admin
                    </Link>
                </div>

                {/* Nav Items */}
                <nav className="flex-1 p-4 space-y-1">
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
            <main className="ml-64 min-h-screen">
                {children}
            </main>
        </div>
    );
}
