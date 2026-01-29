"use client";

import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-slate-200", className)}
      {...props}
    />
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <Skeleton className="h-48 w-full rounded-lg mb-4" />
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}

function SkeletonTestimonial() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-4 mb-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
}

function SkeletonPricing() {
  return (
    <div className="rounded-2xl border-2 border-slate-200 bg-white p-8 shadow-sm">
      <Skeleton className="h-8 w-1/2 mb-2" />
      <Skeleton className="h-12 w-3/4 mb-4" />
      <Skeleton className="h-4 w-full mb-6" />
      <div className="space-y-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-4 flex-1" />
          </div>
        ))}
      </div>
      <Skeleton className="h-14 w-full mt-8 rounded-lg" />
    </div>
  );
}

export { Skeleton, SkeletonCard, SkeletonTestimonial, SkeletonPricing };
