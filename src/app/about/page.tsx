import { Metadata } from "next";
import { Building2, MapPin, Award, Users } from "lucide-react";

export const metadata: Metadata = {
    title: "About Us - Zenixa by Projekts Vision",
    description: "Zenixa is a product of Projekts Vision (Private) Limited, a registered software company in Pakistan.",
};

export default function AboutPage() {
    return (
        <div className="pt-20 pb-20">
            <div className="container-custom max-w-4xl">
                <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">About Us</h1>

                <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm mb-12">
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        Zenixa is the flagship e-commerce product of <strong className="text-gray-900">Projekts Vision (Private) Limited</strong>,
                        a software development company dedicated to empowering Pakistani businesses.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Founded with the mission to make Selling Online accessible to everyone, we realized that
                        monthly subscriptions were a major barrier for local businesses. Zenixa solves this
                        by offering a complete, premium e-commerce platform for a simple one-time price.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl">
                        <Building2 className="w-8 h-8 text-gray-900 shrink-0" />
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Registered Company</h3>
                            <p className="text-gray-600 text-sm">
                                Projekts Vision (Private) Limited is registered with SECP.
                                <br />
                                <span className="font-mono text-gray-500">Registration No: 0381859</span>
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl">
                        <MapPin className="w-8 h-8 text-gray-900 shrink-0" />
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Located in Karachi</h3>
                            <p className="text-gray-600 text-sm">
                                We are proudly based in Karachi, serving clients across Pakistan and the GCC region.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Values</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                                <Award className="w-5 h-5 text-gray-900" />
                            </div>
                            <h3 className="font-semibold mb-2">Ownership</h3>
                            <p className="text-sm text-gray-600">We believe you should own your business data and code, not rent it.</p>
                        </div>
                        <div>
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                                <Users className="w-5 h-5 text-gray-900" />
                            </div>
                            <h3 className="font-semibold mb-2">Local Support</h3>
                            <p className="text-sm text-gray-600">We understand the local market, integrated local payments, and logistics.</p>
                        </div>
                        <div>
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                                <Building2 className="w-5 h-5 text-gray-900" />
                            </div>
                            <h3 className="font-semibold mb-2">Transparency</h3>
                            <p className="text-sm text-gray-600">No hidden fees, no surprise charges. What you see is what you pay.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
