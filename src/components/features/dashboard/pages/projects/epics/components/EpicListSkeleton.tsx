export const EpicListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 flex flex-col h-[280px] animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="h-6 w-16 bg-slate-100 rounded-md" />
            <div className="h-6 w-12 bg-slate-100 rounded-full" />
          </div>
          <div className="space-y-3 mb-6">
            <div className="h-5 w-full bg-slate-100 rounded-md" />
            <div className="h-5 w-4/5 bg-slate-100 rounded-md" />
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-slate-100 shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="h-2 w-12 bg-slate-50 rounded" />
              <div className="h-3 w-24 bg-slate-100 rounded" />
            </div>
          </div>
          <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
            <div className="h-3 w-32 bg-slate-50 rounded" />
            <div className="h-3 w-20 bg-slate-50 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};
