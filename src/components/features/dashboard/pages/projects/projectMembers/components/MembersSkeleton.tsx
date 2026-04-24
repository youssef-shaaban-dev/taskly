export const MembersSkeleton = ({ count }: { count: number }) => {
  return (
    <div className="bg-white rounded-lg border border-slate-100 overflow-hidden shadow-sm">
      <div className="p-6 md:p-8">
        <div className="space-y-4">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 py-4 border-b border-slate-50 last:border-0">
              <div className="w-10 h-10 rounded-full bg-slate-100 animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-100 rounded w-1/4 animate-pulse" />
                <div className="h-3 bg-slate-100 rounded w-1/3 animate-pulse" />
              </div>
              <div className="w-20 h-6 bg-slate-100 rounded-full animate-pulse" />
              <div className="w-24 h-4 bg-slate-100 rounded animate-pulse hidden md:block" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
