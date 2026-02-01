"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface OTPInputProps {
    length?: number;
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    error?: boolean;
    autoFocus?: boolean;
}

export function OTPInput({
    length = 6,
    value,
    onChange,
    disabled = false,
    error = false,
    autoFocus = true,
}: OTPInputProps) {
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        // Only allow numbers
        if (!/^\d*$/.test(inputValue)) return;

        // Handle paste
        if (inputValue.length > 1) {
            const pastedValue = inputValue.slice(0, length - index);
            const newValue = value.slice(0, index) + pastedValue + value.slice(index + pastedValue.length);
            onChange(newValue.slice(0, length));

            // Focus the appropriate input after paste
            const nextIndex = Math.min(index + pastedValue.length, length - 1);
            inputRefs.current[nextIndex]?.focus();
            return;
        }

        // Single character input
        const newValue = value.slice(0, index) + inputValue + value.slice(index + 1);
        onChange(newValue);

        // Auto-advance to next input
        if (inputValue && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
            if (!value[index] && index > 0) {
                // If current input is empty, go back and clear previous
                inputRefs.current[index - 1]?.focus();
                const newValue = value.slice(0, index - 1) + value.slice(index);
                onChange(newValue);
            } else {
                // Clear current input
                const newValue = value.slice(0, index) + value.slice(index + 1);
                onChange(newValue);
            }
            e.preventDefault();
        }

        if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }

        if (e.key === "ArrowRight" && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
        onChange(pastedData);

        // Focus the last filled input or the next empty one
        const nextIndex = Math.min(pastedData.length, length - 1);
        inputRefs.current[nextIndex]?.focus();
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.select();
    };

    return (
        <div className="flex justify-center gap-2 sm:gap-3">
            {Array.from({ length }).map((_, index) => (
                <input
                    key={index}
                    ref={(el) => {
                        inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={length - index}
                    value={value[index] || ""}
                    onChange={(e) => handleChange(index, e)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    onFocus={handleFocus}
                    disabled={disabled}
                    autoFocus={autoFocus && index === 0}
                    className={cn(
                        "w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl sm:text-3xl font-bold rounded-xl border-2 transition-all duration-200",
                        "focus:outline-none focus:ring-2 focus:ring-offset-2",
                        "disabled:opacity-50 disabled:cursor-not-allowed",
                        error
                            ? "border-red-500 focus:ring-red-500 bg-red-50"
                            : "border-gray-200 focus:border-primary focus:ring-primary bg-white hover:border-gray-300"
                    )}
                    aria-label={`Digit ${index + 1}`}
                />
            ))}
        </div>
    );
}
