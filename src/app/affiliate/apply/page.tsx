"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OTPInput } from "@/components/auth/otp-input";
import { Mail, ArrowLeft, CheckCircle, Loader2, User, Phone, MessageSquare, Link2, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Step = "email" | "otp" | "form" | "success";

interface FormData {
    name: string;
    phone: string;
    promotionMethod: string;
    socialLinks: string;
    expectedReferrals: string;
    whyAffiliate: string;
}

export default function AffiliateApplyPage() {
    const [step, setStep] = React.useState<Step>("email");
    const [email, setEmail] = React.useState("");
    const [otp, setOtp] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [countdown, setCountdown] = React.useState(0);
    const [formData, setFormData] = React.useState<FormData>({
        name: "",
        phone: "",
        promotionMethod: "",
        socialLinks: "",
        expectedReferrals: "",
        whyAffiliate: "",
    });

    React.useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    React.useEffect(() => {
        if (otp.length === 6 && step === "otp") {
            handleVerifyOTP();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [otp]);

    const handleSendOTP = async (e?: React.FormEvent) => {
        e?.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/auth/send-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to send OTP");

            setStep("otp");
            setCountdown(60);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOTP = async () => {
        if (otp.length !== 6) return;
        setError("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/auth/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, code: otp }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Invalid code");

            setStep("form");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Invalid code");
            setOtp("");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmitApplication = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/affiliate/apply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, ...formData }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to submit application");

            setStep("success");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = () => {
        if (countdown > 0) return;
        setOtp("");
        handleSendOTP();
    };

    const handleBack = () => {
        if (step === "otp") {
            setStep("email");
            setOtp("");
        } else if (step === "form") {
            setStep("otp");
        }
        setError("");
    };

    const updateFormData = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const steps = ["email", "otp", "form", "success"];
    const currentIndex = steps.indexOf(step);

    return (
        <div className="min-h-[100dvh] flex flex-col bg-gradient-to-b from-white to-gray-50/80">
            {/* Header */}
            <header className="p-4 sm:p-6">
                <Link href="/" className="inline-block">
                    <img
                        src="/logo_logoforlightbg.svg"
                        alt="Zenixa"
                        className="h-8 w-auto hover:opacity-80 transition-opacity"
                    />
                </Link>
            </header>

            {/* Main */}
            <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
                <div className="w-full max-w-md">
                    {/* Progress */}
                    <div className="flex items-center justify-center gap-2 mb-8">
                        {steps.map((s, i) => (
                            <React.Fragment key={s}>
                                <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300",
                                    currentIndex >= i ? "bg-primary text-white" : "bg-gray-100 text-gray-400"
                                )}>
                                    {currentIndex > i ? <CheckCircle className="w-4 h-4" /> : i + 1}
                                </div>
                                {i < 3 && <div className={cn("w-8 h-1 rounded-full transition-all duration-300", currentIndex > i ? "bg-primary" : "bg-gray-100")} />}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Email Step */}
                    {step === "email" && (
                        <div className="animate-fade-in">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Mail className="w-8 h-8 text-primary" />
                                </div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Become an Affiliate</h1>
                                <p className="text-gray-500">Enter your email to start your application</p>
                            </div>
                            <form onSubmit={handleSendOTP} className="space-y-4">
                                <Input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} error={!!error} disabled={isLoading} autoFocus required className="h-14 text-lg" />
                                {error && <p className="text-sm text-red-500">{error}</p>}
                                <Button type="submit" loading={isLoading} className="w-full h-14 text-lg" disabled={!email || isLoading}>Continue</Button>
                            </form>
                        </div>
                    )}

                    {/* OTP Step */}
                    {step === "otp" && (
                        <div className="animate-fade-in">
                            <button onClick={handleBack} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-6">
                                <ArrowLeft className="w-4 h-4" />Back
                            </button>
                            <div className="text-center mb-8">
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Check your email</h1>
                                <p className="text-gray-500">We sent a 6-digit code to <span className="font-medium text-gray-900">{email}</span></p>
                            </div>
                            <div className="space-y-6">
                                <OTPInput value={otp} onChange={setOtp} disabled={isLoading} error={!!error} />
                                {error && <p className="text-center text-sm text-red-500">{error}</p>}
                                {isLoading && <div className="flex items-center justify-center gap-2 text-gray-500"><Loader2 className="w-4 h-4 animate-spin" />Verifying...</div>}
                                <div className="text-center">
                                    <p className="text-sm text-gray-500 mb-2">Didn&apos;t receive the code?</p>
                                    <button onClick={handleResend} disabled={countdown > 0 || isLoading} className={cn("text-sm font-medium transition-colors", countdown > 0 ? "text-gray-400 cursor-not-allowed" : "text-primary hover:text-primary-600")}>
                                        {countdown > 0 ? `Resend in ${countdown}s` : "Resend code"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Form Step */}
                    {step === "form" && (
                        <div className="animate-fade-in">
                            <button onClick={handleBack} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-6">
                                <ArrowLeft className="w-4 h-4" />Back
                            </button>
                            <div className="text-center mb-6">
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Application</h1>
                                <p className="text-gray-500 text-sm">Tell us about yourself and how you plan to promote Zenixa</p>
                            </div>
                            <form onSubmit={handleSubmitApplication} className="space-y-4">
                                <div className="space-y-3">
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <Input placeholder="Full Name" value={formData.name} onChange={(e) => updateFormData("name", e.target.value)} required className="pl-12 h-12" />
                                    </div>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <Input placeholder="Phone Number" value={formData.phone} onChange={(e) => updateFormData("phone", e.target.value)} required className="pl-12 h-12" />
                                    </div>
                                    <div className="relative">
                                        <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                                        <textarea placeholder="How will you promote Zenixa?" value={formData.promotionMethod} onChange={(e) => updateFormData("promotionMethod", e.target.value)} required className="w-full min-h-[80px] pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent resize-none" />
                                    </div>
                                    <div className="relative">
                                        <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <Input placeholder="Social Media Links (Instagram, YouTube, etc.)" value={formData.socialLinks} onChange={(e) => updateFormData("socialLinks", e.target.value)} className="pl-12 h-12" />
                                    </div>
                                    <div className="relative">
                                        <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <Input placeholder="Expected monthly referrals" value={formData.expectedReferrals} onChange={(e) => updateFormData("expectedReferrals", e.target.value)} required className="pl-12 h-12" />
                                    </div>
                                    <div className="relative">
                                        <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                                        <textarea placeholder="Why do you want to be an affiliate?" value={formData.whyAffiliate} onChange={(e) => updateFormData("whyAffiliate", e.target.value)} required className="w-full min-h-[80px] pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent resize-none" />
                                    </div>
                                </div>
                                {error && <p className="text-sm text-red-500">{error}</p>}
                                <Button type="submit" loading={isLoading} className="w-full h-14 text-lg" disabled={isLoading}>Submit Application</Button>
                            </form>
                        </div>
                    )}

                    {/* Success Step */}
                    {step === "success" && (
                        <div className="animate-fade-in text-center py-8">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-10 h-10 text-green-600" />
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Application Submitted!</h1>
                            <p className="text-gray-500 mb-6">We&apos;ll review your application and get back to you via email within 24-48 hours.</p>
                            <Button asChild variant="outline">
                                <Link href="/">Back to Home</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="p-4 sm:p-6 text-center">
                <p className="text-sm text-gray-400">© 2026 Zenixa by Projekts Vision. All rights reserved.</p>
            </footer>
        </div>
    );
}
