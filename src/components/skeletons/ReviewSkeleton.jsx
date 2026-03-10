import React from "react";

const ReviewSkeleton = ({ count = 3 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-[var(--mh-border)] bg-[var(--mh-card)] p-5 shadow-[var(--mh-shadow)]"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="space-y-2">
              <div className="skeleton h-4 w-32 rounded-full" />
              <div className="skeleton h-4 w-20 rounded-full" />
            </div>
            <div className="skeleton h-4 w-24 rounded-full" />
          </div>
          <div className="mt-4 space-y-2">
            <div className="skeleton h-4 w-full rounded-full" />
            <div className="skeleton h-4 w-5/6 rounded-full" />
            <div className="skeleton h-4 w-2/3 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewSkeleton;
