"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Loader2, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function AffiliateLoginPage() {
    const [step, setStep] = useState<"email" | "otp" | "success">("email");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/affiliate/auth/send-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to send OTP");
            }

            setStep("otp");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/affiliate/auth/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, code: otp }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Invalid code");
            }

            setStep("success");
            setTimeout(() => {
                window.location.href = "/affiliate/dashboard";
            }, 1500);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Invalid code");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 px-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block mb-4">
                        <img
                            src="/logo_logofordarkbg.svg"
                            alt="Zenixa"
                            className="h-10 w-auto mx-auto"
                        />
                    </Link>
                    <h1 className="text-2xl font-bold text-white">Affiliate Portal</h1>
                    <p className="text-gray-400 mt-2">Login to manage your referrals & earnings</p>
                </div>

                {/* Form Card */}
                <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-700">
                    {step === "email" && (
                        <form onSubmit={handleSendOtp} className="space-y-6">
                            {error && (
                                <div className="text-red-400 bg-red-400/10 p-3 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="your@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-500 h-12"
                                        required
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        Continue
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </>
                                )}
                            </Button>
                        </form>
                    )}

                    {step === "otp" && (
                        <form onSubmit={handleVerifyOtp} className="space-y-6">
                            <div className="text-center mb-4">
                                <p className="text-gray-300">We sent a code to</p>
                                <p className="text-white font-medium">{email}</p>
                            </div>

                            {error && (
                                <div className="text-red-400 bg-red-400/10 p-3 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="otp" className="text-gray-300">Verification Code</Label>
                                <Input
                                    id="otp"
                                    type="text"
                                    placeholder="Enter 6-digit code"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                                    className="text-center text-2xl tracking-widest bg-gray-700/50 border-gray-600 text-white h-14"
                                    maxLength={6}
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12"
                                disabled={isLoading || otp.length !== 6}
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    "Verify & Login"
                                )}
                            </Button>

                            <button
                                type="button"
                                onClick={() => setStep("email")}
                                className="w-full text-gray-400 hover:text-white transition-colors text-sm"
                            >
                                Use a different email
                            </button>
                        </form>
                    )}

                    {step === "success" && (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 className="w-8 h-8 text-green-500" />
                            </div>
                            <h2 className="text-xl font-bold text-white mb-2">Login Successful!</h2>
                            <p className="text-gray-400">Redirecting to dashboard...</p>
                        </div>
                    )}
                </div>

                <p className="text-center text-gray-500 mt-6 text-sm">
                    Not an affiliate yet?{" "}
                    <Link href="/affiliate" className="text-primary hover:underline">
                        Apply now
                    </Link>
                </p>
            </div>
        </div>
    );
}
