import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Refund Policy - Zenixa",
    description: "Refund Policy for Zenixa e-commerce platform.",
};

export default function RefundPage() {
    return (
        <div className="pt-12 pb-20">
            <div className="container-custom max-w-3xl">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Refund Policy</h1>
                <div className="prose prose-gray max-w-none text-gray-600">
                    <p>
                        At Zenixa (by Projekts Vision), we want you to be completely satisfied with your purchase.
                        Because our product is digital software with source code access, we have a specific refund policy.
                    </p>
                    <h3>Refund Eligibility</h3>
                    <p>
                        We offer a full refund within <strong>14 days</strong> of your purchase if:
                        <ul>
                            <li>The software is defective and not functioning as described.</li>
                            <li>We are unable to resolve specific technical issues that prevent you from using the software.</li>
                        </ul>
                    </p>
                    <h3>Non-refundable Circumstances</h3>
                    <p>
                        Refunds are not granted if:
                        <ul>
                            <li>You simply change your mind after the source code has been delivered.</li>
                            <li>You lack the meaningful skills to use the product (although we provide support).</li>
                            <li>You have violated our Terms of Service.</li>
                        </ul>
                    </p>
                    <h3>How to Request a Refund</h3>
                    <p>
                        To request a refund, please contact us at <a href="mailto:info@projekts.pk" className="text-gray-900 underline">info@projekts.pk</a> with your
                        order details and the reason for the request. We will review your request and process it within 5-7 business days.
                    </p>
                </div>
            </div>
        </div>
    );
}
