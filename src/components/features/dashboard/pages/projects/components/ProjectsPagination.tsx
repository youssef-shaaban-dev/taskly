interface ProjectsPaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  currentItemsCount: number;
  onPageChange: (page: number) => void;
}

export const ProjectsPagination = ({
  currentPage,
  totalPages,
  totalCount,
  currentItemsCount,
  onPageChange
}: ProjectsPaginationProps) => {
  
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mt-auto pt-6 border-t border-slate-100 gap-4">
      <p className="text-xs text-slate-500 font-medium">
        Showing <span className="font-bold text-slate-700">{currentItemsCount}</span> of <span className="font-bold text-slate-700">{totalCount}</span> active projects
      </p>
      
      <div className="flex items-center gap-1">
        <button 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          &lt;
        </button>

        {pages.map((page) => (
          <button 
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 flex items-center justify-center rounded text-sm transition-colors ${
              currentPage === page 
                ? "bg-primary text-white font-bold shadow-sm" 
                : "border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium" 
            }`}
          >
            {page}
          </button>
        ))}

        <button 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};