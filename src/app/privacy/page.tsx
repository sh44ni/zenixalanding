import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy - Zenixa",
    description: "Privacy Policy for Zenixa e-commerce platform.",
};

export default function PrivacyPage() {
    return (
        <div className="pt-12 pb-20">
            <div className="container-custom max-w-3xl">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
                <div className="prose prose-gray max-w-none text-gray-600">
                    <p>Last updated: January 29, 2026</p>
                    <p>
                        Projekts Vision (Private) Limited (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;) operates the Zenixa website
                        and the Zenixa e-commerce platform (the &quot;Service&quot;). This page informs you of our policies
                        regarding the collection, use, and disclosure of personal data when you use our Service
                        and the choices you have associated with that data.
                    </p>
                    <h3>Information Collection and Use</h3>
                    <p>
                        We collect several different types of information for various purposes to provide and improve our Service to you:
                        <ul>
                            <li><strong>Personal Data:</strong> Name, Email, Phone number, Business name.</li>
                            <li><strong>Usage Data:</strong> How the Service is accessed and used.</li>
                        </ul>
                    </p>
                    <h3>Use of Data</h3>
                    <p>
                        Projekts Vision uses the collected data for various purposes:
                        <ul>
                            <li>To provide and maintain the Service</li>
                            <li>To notify you about changes to our Service</li>
                            <li>To provide customer care and support</li>
                            <li>To provide analysis or valuable information so that we can improve the Service</li>
                        </ul>
                    </p>
                    <h3>Data Security</h3>
                    <p>
                        The security of your data is important to us, but remember that no method of transmission over the Internet,
                        or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to
                        protect your Personal Data, we cannot guarantee its absolute security.
                    </p>
                </div>
            </div>
        </div>
    );
}
