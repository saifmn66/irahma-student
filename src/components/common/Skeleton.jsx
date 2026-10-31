import React from 'react';

export function Skeleton({ className = '', style = {} }) {
  return (
    <div
      className={`animate-pulse bg-slate-200/80 dark:bg-slate-700/50 rounded-md ${className}`}
      style={style}
    />
  );
}

export function TableSkeleton({ rows = 6, cols = 5 }) {
  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-8 w-24 rounded-lg" />
      </div>
      <div className="divide-y divide-slate-100">
        {Array.from({ length: rows }).map((_, rIdx) => (
          <div key={rIdx} className="p-4 flex items-center gap-4">
            <Skeleton className="w-9 h-9 rounded-full shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-1/5" />
            </div>
            {Array.from({ length: cols - 2 }).map((_, cIdx) => (
              <div key={cIdx} className="hidden sm:block">
                <Skeleton className="h-4 w-20 rounded-md" />
              </div>
            ))}
            <div className="flex items-center gap-2 shrink-0">
              <Skeleton className="w-7 h-7 rounded-lg" />
              <Skeleton className="w-7 h-7 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StatCardSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between animate-pulse"
        >
          <div className="space-y-2.5 flex-1">
            <Skeleton className="h-3.5 w-24" />
            <Skeleton className="h-7 w-16" />
            <Skeleton className="h-3 w-32" />
          </div>
          <Skeleton className="w-12 h-12 rounded-xl shrink-0" />
        </div>
      ))}
    </div>
  );
}

export function TimetableSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4 animate-pulse">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-8 w-32 rounded-xl" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-3 pt-2">
        {Array.from({ length: 6 }).map((_, dayIdx) => (
          <div key={dayIdx} className="space-y-3">
            <Skeleton className="h-8 w-full rounded-xl" />
            <div className="space-y-2.5">
              {Array.from({ length: 3 }).map((_, slotIdx) => (
                <div
                  key={slotIdx}
                  className="p-3 rounded-xl border border-slate-100 bg-slate-50 space-y-2"
                >
                  <Skeleton className="h-3.5 w-3/4" />
                  <Skeleton className="h-2.5 w-1/2" />
                  <Skeleton className="h-4 w-16 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-3.5 w-24" />
        </div>
        <Skeleton className="h-8 w-24 rounded-lg" />
      </div>
      <div className="h-64 flex items-end justify-between gap-3 pt-8 pb-2">
        {Array.from({ length: 8 }).map((_, idx) => (
          <Skeleton
            key={idx}
            className="w-full rounded-t-lg"
            style={{ height: `${25 + (idx * 9) % 70}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export default Skeleton;
