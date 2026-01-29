import { FeaturesSection } from "@/components/sections/features-section";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Features - Zenixa E-commerce Platform",
    description: "Explore the powerful features of Zenixa including store management, payments, analytics, and more.",
};

export default function FeaturesPage() {
    return (
        <div className="pt-12">
            <div className="container-custom mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                    Powerful Features
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Everything you need to run a successful online business in Pakistan.
                </p>
            </div>
            <FeaturesSection />
        </div>
    );
}
