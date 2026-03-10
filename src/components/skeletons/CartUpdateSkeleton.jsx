import React from "react";

const CartUpdateSkeleton = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={index}
          className="rounded-[24px] border border-[var(--mh-border)] bg-[var(--mh-card)] p-4 shadow-[var(--mh-shadow)]"
        >
          <div className="skeleton h-4 w-24 rounded-full" />
          <div className="mt-4 flex gap-4 sm:flex-col">
            <div className="skeleton h-24 w-24 rounded-2xl sm:w-full" />
            <div className="flex-1 space-y-3">
              <div className="skeleton h-5 w-3/4 rounded-full" />
              <div className="skeleton h-4 w-32 rounded-full" />
              <div className="skeleton h-10 w-40 rounded-2xl" />
            </div>
            <div className="space-y-3">
              <div className="skeleton h-5 w-20 rounded-full" />
              <div className="skeleton h-10 w-24 rounded-2xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartUpdateSkeleton;
