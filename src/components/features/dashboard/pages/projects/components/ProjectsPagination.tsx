export const ProjectsPagination = ({ currentCount, totalCount }: { currentCount: number, totalCount: number }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mt-auto pt-6 border-t border-slate-100 gap-4">
      <p className="text-xs text-slate-500 font-medium">
        Showing <span className="font-bold text-slate-700">{currentCount}</span> of <span className="font-bold text-slate-700">{totalCount}</span> active projects
      </p>
      <div className="flex items-center gap-1">
        <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-50" disabled>
          &lt;
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-white text-sm font-bold shadow-sm">
          1
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium">
          2
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium">
          &gt;
        </button>
      </div>
    </div>
  );
};