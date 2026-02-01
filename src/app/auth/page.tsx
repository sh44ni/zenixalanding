import { AuthFlow } from "@/components/auth/auth-flow";
import Link from "next/link";

export default function AuthPage() {
    return (
        <div className="min-h-[100dvh] flex flex-col bg-gradient-to-b from-white to-gray-50/80">
            {/* Header */}
            <header className="p-4 sm:p-6">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-xl font-bold text-primary hover:opacity-80 transition-opacity"
                >
                    <svg
                        viewBox="0 0 24 24"
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                    </svg>
                    Zenixa
                </Link>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
                <div className="w-full max-w-md">
                    <AuthFlow redirectUrl="/" />
                </div>
            </main>

            {/* Footer */}
            <footer className="p-4 sm:p-6 text-center">
                <p className="text-sm text-gray-400">
                    © 2026 Zenixa by Projekts Vision. All rights reserved.
                </p>
            </footer>
        </div>
    );
}
