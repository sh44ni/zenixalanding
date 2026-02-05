import { Metadata } from "next";
import { Building2, MapPin, Award, Users, Globe, Calendar, Briefcase, Target } from "lucide-react";

export const metadata: Metadata = {
    title: "About Us - Zenixa by Projekts Vision",
    description: "Zenixa is a product of Projekts Vision (Private) Limited, a registered software company in Pakistan serving clients in 6 countries since 2019.",
};

const stats = [
    { value: "6+", label: "Years of Experience", subLabel: "Since 2019" },
    { value: "30+", label: "Projects Delivered", subLabel: "Across Industries" },
    { value: "4", label: "Products Built", subLabel: "Ready to Deploy" },
    { value: "6", label: "Countries Served", subLabel: "PK + GCC + Global" },
];

const timeline = [
    {
        year: "2019",
        title: "Founded",
        description: "Started operations from Karachi with first client Al Ghawali"
    },
    {
        year: "2020",
        title: "Expansion",
        description: "Expanded to GCC region, clients in Oman & Saudi Arabia"
    },
    {
        year: "2021+",
        title: "Growth",
        description: "First in-house product launched, team expansion"
    },
];

export default function AboutPage() {
    return (
        <div className="pt-20 pb-20 bg-white">
            <div className="container-custom max-w-4xl">
                {/* Header */}
                <div className="text-center mb-16">
                    <p className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wide">About Us</p>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">The Team Behind Zenixa</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Zenixa is a product by Projekts Vision (Private) Limited — a registered software company building solutions that actually work.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center p-6 bg-gray-50 rounded-xl border border-gray-100">
                            <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                            <p className="text-sm font-medium text-gray-700">{stat.label}</p>
                            <p className="text-xs text-gray-500">{stat.subLabel}</p>
                        </div>
                    ))}
                </div>

                {/* Company Info Cards */}
                <div className="grid md:grid-cols-2 gap-6 mb-16">
                    <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl border border-gray-100">
                        <Building2 className="w-8 h-8 text-gray-900 shrink-0" />
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Registered Company</h3>
                            <p className="text-gray-600 text-sm mb-2">
                                Projekts Vision (Private) Limited
                            </p>
                            <p className="text-sm">
                                <span className="text-gray-500">SECP Registration:</span>{" "}
                                <span className="font-mono text-gray-900">#0381859</span>
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl border border-gray-100">
                        <MapPin className="w-8 h-8 text-gray-900 shrink-0" />
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Office Location</h3>
                            <p className="text-gray-600 text-sm">
                                Anum Estate, Suite 611<br />
                                Shahrah-e-Faisal, Karachi
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl border border-gray-100">
                        <Calendar className="w-8 h-8 text-gray-900 shrink-0" />
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Founded</h3>
                            <p className="text-gray-600 text-sm">
                                2019 — 6+ years of building software that works
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl border border-gray-100">
                        <Globe className="w-8 h-8 text-gray-900 shrink-0" />
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Countries Served</h3>
                            <p className="text-gray-600 text-sm">
                                Pakistan, Oman, Saudi Arabia, Jordan, USA, Switzerland
                            </p>
                        </div>
                    </div>
                </div>

                {/* Our Story */}
                <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Story</h2>
                    <div className="prose prose-gray max-w-none">
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Projekts Vision was founded in 2019 with a simple mission: <strong>deliver software that actually works</strong>.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Our first client was Al Ghawali Manpower — they had zero digital presence, and we built their complete digital infrastructure from scratch. Today they&apos;re one of the top housemaid suppliers in the Gulf region.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            That transformation taught us what we&apos;re really about: not just building software, but <strong>building businesses</strong>. We&apos;ve taken that approach to every project since.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Today we offer end-to-end software development, from web and mobile apps to AI automation and custom management systems.
                        </p>
                        <p className="text-lg font-semibold text-gray-900 mt-6 italic">
                            &quot;We don&apos;t just write code — we solve problems and create value.&quot;
                        </p>
                    </div>
                </div>

                {/* Journey Timeline */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Our Journey</h2>
                    <div className="space-y-0">
                        {timeline.map((item, index) => (
                            <div key={index} className="flex gap-6">
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                        {item.year}
                                    </div>
                                    {index < timeline.length - 1 && (
                                        <div className="w-0.5 h-16 bg-gray-200" />
                                    )}
                                </div>
                                <div className="pb-8">
                                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                                    <p className="text-gray-600 text-sm">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Values */}
                <div className="border-t border-gray-100 pt-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Our Values</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
                                <Target className="w-6 h-6 text-gray-900" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Results-Driven</h3>
                                <p className="text-sm text-gray-600">
                                    Measurable outcomes, not just code. Every project designed to achieve business goals.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
                                <Users className="w-6 h-6 text-gray-900" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Client-Centric</h3>
                                <p className="text-sm text-gray-600">
                                    Client&apos;s success is our success. We work as an extension of your team, not just a vendor.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Zenixa CTA */}
                <div className="mt-16 bg-gray-900 rounded-2xl p-8 text-center">
                    <h3 className="text-xl font-bold text-white mb-2">
                        Zenixa is a product by Projekts Vision
                    </h3>
                    <p className="text-gray-400 mb-6">
                        A complete e-commerce solution built by a team that&apos;s been doing this for 6+ years.
                    </p>
                    <a
                        href="https://projekts.pk"
                        target="_blank"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                    >
                        Visit Projekts Vision
                    </a>
                </div>
            </div>
        </div>
    );
}
