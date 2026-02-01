"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OTPInput } from "./otp-input";
import { Mail, ArrowLeft, CheckCircle, Loader2, Gift, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type AuthStep = "email" | "otp" | "success";

interface AuthFlowProps {
    onSuccess?: (user: { id: string; email: string; name: string | null }) => void;
    redirectUrl?: string;
}

export function AuthFlow({ onSuccess, redirectUrl = "/" }: AuthFlowProps) {
    const [step, setStep] = React.useState<AuthStep>("email");
    const [email, setEmail] = React.useState("");
    const [referralCode, setReferralCode] = React.useState("");
    const [showReferral, setShowReferral] = React.useState(false);
    const [otp, setOtp] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [countdown, setCountdown] = React.useState(0);

    // Countdown timer for resend
    React.useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    // Auto-submit when OTP is complete
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

            if (!res.ok) {
                throw new Error(data.error || "Failed to send OTP");
            }

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
                body: JSON.stringify({ email, code: otp, referralCode: referralCode || undefined }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Invalid code");
            }

            setStep("success");

            // Call success callback or redirect
            if (onSuccess) {
                setTimeout(() => onSuccess(data.user), 1500);
            } else {
                setTimeout(() => {
                    window.location.href = redirectUrl;
                }, 1500);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Invalid code");
            setOtp("");
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
        setStep("email");
        setOtp("");
        setError("");
    };

    return (
        <div className="w-full max-w-md mx-auto">
            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-2 mb-8">
                {["email", "otp", "success"].map((s, i) => (
                    <React.Fragment key={s}>
                        <div
                            className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300",
                                step === s || ["email", "otp", "success"].indexOf(step) > i
                                    ? "bg-primary text-white"
                                    : "bg-gray-100 text-gray-400"
                            )}
                        >
                            {["email", "otp", "success"].indexOf(step) > i ? (
                                <CheckCircle className="w-4 h-4" />
                            ) : (
                                i + 1
                            )}
                        </div>
                        {i < 2 && (
                            <div
                                className={cn(
                                    "w-12 h-1 rounded-full transition-all duration-300",
                                    ["email", "otp", "success"].indexOf(step) > i
                                        ? "bg-primary"
                                        : "bg-gray-100"
                                )}
                            />
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* Step Content */}
            <div className="relative overflow-hidden">
                {/* Email Step */}
                <div
                    className={cn(
                        "transition-all duration-300 ease-out",
                        step === "email"
                            ? "translate-x-0 opacity-100"
                            : "-translate-x-full opacity-0 absolute inset-0"
                    )}
                >
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Mail className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                            Welcome to Zenixa
                        </h1>
                        <p className="text-gray-500">
                            Enter your email to sign in or create an account
                        </p>
                    </div>

                    <form onSubmit={handleSendOTP} className="space-y-4">
                        <div>
                            <Input
                                type="email"
                                placeholder="your@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={!!error}
                                disabled={isLoading}
                                autoFocus
                                required
                                className="h-14 text-lg"
                            />
                            {error && (
                                <p className="mt-2 text-sm text-red-500">{error}</p>
                            )}
                        </div>

                        {/* Referral Code Section */}
                        <div>
                            <button
                                type="button"
                                onClick={() => setShowReferral(!showReferral)}
                                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors w-full justify-center"
                            >
                                <Gift className="w-4 h-4" />
                                Have a referral code?
                                <ChevronDown className={cn(
                                    "w-4 h-4 transition-transform",
                                    showReferral && "rotate-180"
                                )} />
                            </button>
                            <div className={cn(
                                "overflow-hidden transition-all duration-300",
                                showReferral ? "max-h-20 mt-3" : "max-h-0"
                            )}>
                                <Input
                                    type="text"
                                    placeholder="Enter referral code (optional)"
                                    value={referralCode}
                                    onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                                    disabled={isLoading}
                                    className="h-12 text-center tracking-wider uppercase"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            loading={isLoading}
                            className="w-full h-14 text-lg"
                            disabled={!email || isLoading}
                        >
                            Continue
                        </Button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-500">
                        By continuing, you agree to our{" "}
                        <a href="/terms" className="text-primary hover:underline">
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="/privacy" className="text-primary hover:underline">
                            Privacy Policy
                        </a>
                    </p>
                </div>

                {/* OTP Step */}
                <div
                    className={cn(
                        "transition-all duration-300 ease-out",
                        step === "otp"
                            ? "translate-x-0 opacity-100"
                            : step === "email"
                                ? "translate-x-full opacity-0 absolute inset-0"
                                : "-translate-x-full opacity-0 absolute inset-0"
                    )}
                >
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-6"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>

                    <div className="text-center mb-8">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                            Check your email
                        </h1>
                        <p className="text-gray-500">
                            We sent a 6-digit code to{" "}
                            <span className="font-medium text-gray-900">{email}</span>
                        </p>
                    </div>

                    <div className="space-y-6">
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            disabled={isLoading}
                            error={!!error}
                        />

                        {error && (
                            <p className="text-center text-sm text-red-500">{error}</p>
                        )}

                        {isLoading && (
                            <div className="flex items-center justify-center gap-2 text-gray-500">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Verifying...
                            </div>
                        )}

                        <div className="text-center">
                            <p className="text-sm text-gray-500 mb-2">
                                Didn&apos;t receive the code?
                            </p>
                            <button
                                onClick={handleResend}
                                disabled={countdown > 0 || isLoading}
                                className={cn(
                                    "text-sm font-medium transition-colors",
                                    countdown > 0
                                        ? "text-gray-400 cursor-not-allowed"
                                        : "text-primary hover:text-primary-600"
                                )}
                            >
                                {countdown > 0 ? `Resend in ${countdown}s` : "Resend code"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Success Step */}
                <div
                    className={cn(
                        "transition-all duration-300 ease-out",
                        step === "success"
                            ? "translate-x-0 opacity-100"
                            : "translate-x-full opacity-0 absolute inset-0"
                    )}
                >
                    <div className="text-center py-8">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
                            <svg
                                className="w-10 h-10 text-green-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2.5}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                    className="animate-check-mark"
                                    style={{
                                        strokeDasharray: 50,
                                        strokeDashoffset: 0,
                                    }}
                                />
                            </svg>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                            You&apos;re all set!
                        </h1>
                        <p className="text-gray-500">
                            Redirecting you now...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
