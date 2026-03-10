import React from "react";

const ProductPageSkeleton = () => {
  return (
    <div className="mx-auto max-w-[1440px] px-16 pb-16 pt-6 md-lg:px-10 md:px-6 sm:px-4">
      <div className="rounded-[28px] border border-[var(--mh-border)] bg-[var(--mh-card)] p-6 shadow-[var(--mh-shadow)]">
        <div className="skeleton h-4 w-24 rounded-full" />
        <div className="mt-4 grid grid-cols-12 gap-8 md-lg:grid-cols-1">
          <div className="col-span-5">
            <div className="skeleton aspect-square w-full rounded-[28px]" />
            <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="skeleton aspect-square rounded-2xl" />
              ))}
            </div>
          </div>
          <div className="col-span-7 space-y-5">
            <div className="skeleton h-5 w-32 rounded-full" />
            <div className="skeleton h-10 w-3/4 rounded-full" />
            <div className="flex gap-2">
              <div className="skeleton h-5 w-28 rounded-full" />
              <div className="skeleton h-5 w-20 rounded-full" />
            </div>
            <div className="rounded-3xl border border-[var(--mh-border)] p-5">
              <div className="flex gap-3">
                <div className="skeleton h-10 w-28 rounded-full" />
                <div className="skeleton h-8 w-20 rounded-full" />
                <div className="skeleton h-8 w-16 rounded-full" />
              </div>
            </div>
            <div className="grid grid-cols-[130px_minmax(0,1fr)_56px] gap-3 sm:grid-cols-1">
              <div className="skeleton h-14 rounded-2xl" />
              <div className="skeleton h-14 rounded-2xl" />
              <div className="skeleton h-14 rounded-2xl" />
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-1">
              <div className="skeleton h-14 rounded-2xl" />
              <div className="skeleton h-14 rounded-2xl" />
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-1">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="skeleton h-14 rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPageSkeleton;
