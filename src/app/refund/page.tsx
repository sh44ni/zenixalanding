import { Metadata } from "next";
import { Clock, AlertTriangle, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Refund Policy - Zenixa",
    description: "Zenixa's refund policy - 2-hour refund window, fair terms for both parties.",
};

export default function RefundPage() {
    return (
        <div className="pt-20 pb-20 bg-white">
            <div className="container-custom max-w-3xl">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Refund Policy</h1>
                <p className="text-lg text-gray-600 mb-12">
                    We believe in fair terms for both parties. Here&apos;s exactly how refunds work at Zenixa.
                </p>

                {/* Payment Structure */}
                <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Structure</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-100">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg font-bold text-gray-700">1</div>
                            <div>
                                <p className="font-semibold text-gray-900">50% Upfront</p>
                                <p className="text-sm text-gray-500">To start the project</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-100">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg font-bold text-gray-700">2</div>
                            <div>
                                <p className="font-semibold text-gray-900">50% Before Delivery</p>
                                <p className="text-sm text-gray-500">Before going live</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Refund Rules */}
                <div className="space-y-6 mb-12">
                    <h2 className="text-xl font-bold text-gray-900">Refund Rules</h2>

                    {/* 2-Hour Window */}
                    <div className="flex gap-4 p-5 bg-green-50 rounded-xl border border-green-200">
                        <Clock className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-1">2-Hour Window — Full Refund</h3>
                            <p className="text-gray-700 text-sm">
                                You can get a <strong>full refund within 2 hours</strong> of paying the initial 50% amount. No questions asked. After 2 hours, work begins and we allocate resources to your project.
                            </p>
                        </div>
                    </div>

                    {/* Domain Processing */}
                    <div className="flex gap-4 p-5 bg-amber-50 rounded-xl border border-amber-200">
                        <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-1">After Domain Processing — No Refund</h3>
                            <p className="text-gray-700 text-sm">
                                Once we&apos;ve registered/processed your .pk domain, refunds are not available. Domain registrations are <strong>irreversible</strong> — the cost is incurred immediately and cannot be undone.
                            </p>
                        </div>
                    </div>

                    {/* No Change of Mind */}
                    <div className="flex gap-4 p-5 bg-red-50 rounded-xl border border-red-200">
                        <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-1">No &quot;Change of Mind&quot; Refunds</h3>
                            <p className="text-gray-700 text-sm">
                                Once the contract is signed and the 2-hour window has passed, we don&apos;t offer refunds because you changed your mind. We&apos;ve allocated time and resources to your project.
                            </p>
                        </div>
                    </div>

                    {/* Issue-Based Refunds */}
                    <div className="flex gap-4 p-5 bg-green-50 rounded-xl border border-green-200">
                        <CheckCircle className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-1">Issue-Based Refunds — Yes</h3>
                            <p className="text-gray-700 text-sm">
                                If we <strong>fail to deliver what was promised</strong> in the contract, or if there&apos;s a specific issue we cannot resolve, you are eligible for a refund. We stand behind our work — if we can&apos;t fix it, you get your money back.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Visual Summary */}
                <div className="bg-gray-50 rounded-xl p-6 mb-12 border border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 text-center">Quick Summary</h2>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
                        <div className="flex flex-col items-center p-4">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                            <p className="text-sm font-medium text-gray-900">Within 2 hours</p>
                            <p className="text-xs text-gray-500">Full refund OK</p>
                        </div>
                        <ArrowRight className="w-6 h-6 text-gray-300 hidden md:block" />
                        <div className="flex flex-col items-center p-4">
                            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-2">
                                <AlertTriangle className="w-6 h-6 text-amber-600" />
                            </div>
                            <p className="text-sm font-medium text-gray-900">Domain processed</p>
                            <p className="text-xs text-gray-500">No refund</p>
                        </div>
                        <ArrowRight className="w-6 h-6 text-gray-300 hidden md:block" />
                        <div className="flex flex-col items-center p-4">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                            <p className="text-sm font-medium text-gray-900">We can&apos;t fix it</p>
                            <p className="text-xs text-gray-500">Refund OK</p>
                        </div>
                    </div>
                </div>

                {/* How to Request */}
                <div className="border border-gray-200 rounded-xl p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">How to Request a Refund</h2>
                    <p className="text-gray-600 mb-4">
                        To request a refund, contact us via WhatsApp or email with your order details and the reason for the request.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            href="https://wa.me/923040260023"
                            target="_blank"
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-lg font-medium hover:bg-[#20bd5a] transition-colors"
                        >
                            WhatsApp Us
                        </Link>
                        <a
                            href="mailto:info@projekts.pk"
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                        >
                            Email: info@projekts.pk
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
