import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service - Zenixa",
    description: "Terms of Service for Zenixa e-commerce platform.",
};

export default function TermsPage() {
    return (
        <div className="pt-12 pb-20">
            <div className="container-custom max-w-3xl">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
                <div className="prose prose-gray max-w-none text-gray-600">
                    <p>Last updated: January 29, 2026</p>
                    <p>
                        Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Zenixa
                        platform operated by Projekts Vision (Private) Limited ("us", "we", or "our").
                    </p>
                    <h3>1. Terms</h3>
                    <p>
                        By accessing the website at https://zenixa.pk, you are agreeing to be bound by these terms of service,
                        all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
                    </p>
                    <h3>2. Use License</h3>
                    <p>
                        Permission is granted to use the Zenixa software for your business operations. This is the grant of a license, not a transfer of title.
                        This license is perpetual for the version purchased, provided there is no violation of terms.
                    </p>
                    <h3>3. Disclaimer</h3>
                    <p>
                        The materials on Zenixa's website are provided on an 'as is' basis. Projekts Vision makes no warranties, expressed or implied,
                        and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability,
                        fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                    </p>
                    <h3>4. Governing Law</h3>
                    <p>
                        These terms and conditions are governed by and construed in accordance with the laws of Pakistan and you irrevocably
                        submit to the exclusive jurisdiction of the courts in that location.
                    </p>
                </div>
            </div>
        </div>
    );
}
