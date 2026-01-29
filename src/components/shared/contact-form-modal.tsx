"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, MessageCircle, Send, User, Mail, Phone, Building2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  businessName: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactFormModal({ open, onOpenChange }: ContactFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Form submitted:", data);

    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
      variant: "success",
    });

    reset();
    setIsSubmitting(false);
    onOpenChange(false);
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Hi! I'm interested in Zenixa e-commerce platform. Can you tell me more?"
    );
    window.open(`https://wa.me/923000000000?text=${message}`, "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <div className="bg-gradient-to-br from-primary to-primary-600 p-6 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">
              Let&apos;s Build Your Store
            </DialogTitle>
            <DialogDescription className="text-primary-100 mt-2">
              Fill out the form below and our team will reach out within 24 hours.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-700">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                id="name"
                placeholder="Your full name"
                className="pl-10"
                error={!!errors.name}
                {...register("name")}
              />
            </div>
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700">
                Email <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10"
                  error={!!errors.email}
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-slate-700">
                Phone <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+92 300 0000000"
                  className="pl-10"
                  error={!!errors.phone}
                  {...register("phone")}
                />
              </div>
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessName" className="text-slate-700">
              Business Name (Optional)
            </Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                id="businessName"
                placeholder="Your business name"
                className="pl-10"
                {...register("businessName")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-slate-700">
              Message <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="message"
              placeholder="Tell us about your business and what you're looking for..."
              error={!!errors.message}
              {...register("message")}
            />
            {errors.message && (
              <p className="text-sm text-red-500">{errors.message.message}</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              type="submit"
              className="flex-1"
              disabled={isSubmitting}
              loading={isSubmitting}
              rightIcon={!isSubmitting && <Send className="h-4 w-4" />}
            >
              Send Message
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1 border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700"
              onClick={handleWhatsAppClick}
              leftIcon={<MessageCircle className="h-4 w-4" />}
            >
              WhatsApp Us
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
