import { AuthFlow } from "@/components/auth/auth-flow";
import Link from "next/link";

export default function AuthPage() {
    return (
        <div className="min-h-[100dvh] flex flex-col bg-gradient-to-b from-white to-gray-50/80">
            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
                <div className="w-full max-w-md">
                    {/* Centered Logo */}
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 text-xl font-bold text-gray-900 hover:opacity-80 transition-opacity mb-8"
                    >
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-900 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                                <path d="M3 6h18" />
                                <path d="M16 10a4 4 0 0 1-8 0" />
                            </svg>
                        </div>
                        <span className="text-2xl">Zenixa</span>
                    </Link>

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
