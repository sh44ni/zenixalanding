"use client";

import { ContactForm } from "@/components/shared/contact-form";
import { Mail, Phone, MapPin } from "lucide-react";

export function ContactClient() {
    return (
        <div className="pt-12 pb-20">
            <div className="container-custom max-w-5xl">
                <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">Contact Us</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto text-center mb-16">
                    Ready to start your online business? Get in touch with us.
                </p>

                <div className="grid md:grid-cols-3 gap-12">
                    {/* Contact Info */}
                    <div className="md:col-span-1 space-y-8">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Phone className="w-5 h-5" /> Phone & WhatsApp
                            </h3>
                            <p className="text-gray-600 mb-1">Call or WhatsApp us anytime.</p>
                            <a href="https://wa.me/923040260023" className="text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors">
                                +92 304 026 0023
                            </a>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Mail className="w-5 h-5" /> Email
                            </h3>
                            <p className="text-gray-600 mb-1">For general inquiries.</p>
                            <a href="mailto:info@projekts.pk" className="text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors">
                                info@projekts.pk
                            </a>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <MapPin className="w-5 h-5" /> Office
                            </h3>
                            <p className="text-gray-600">
                                Karachi, Pakistan
                            </p>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="md:col-span-2 bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                        <h3 className="text-xl font-semibold mb-6">Send us a message</h3>
                        <ContactForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
