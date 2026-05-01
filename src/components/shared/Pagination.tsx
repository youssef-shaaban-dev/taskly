import { cn } from "@/utils/cn";
import { ChevronIcon } from "@/components/icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  currentItemsCount: number;
  onPageChange: (page: number) => void;
  label?: string;
  className?: string;
}

export const Pagination = ({
  currentPage,
  totalPages: rawTotalPages,
  totalCount: rawTotalCount,
  currentItemsCount,
  onPageChange,
  label = "items",
  className,
}: PaginationProps) => {
  const totalPages = isNaN(rawTotalPages) ? 0 : Math.max(0, rawTotalPages);
  const totalCount = isNaN(rawTotalCount) ? 0 : Math.max(0, rawTotalCount);

  // If no items at all, don't show pagination
  if (totalCount === 0 || (totalPages <= 1 && totalCount <= currentItemsCount)) return null;

  // Generate page numbers with ellipsis
  const renderPageNumbers = () => {
    if (totalPages <= 0) return null;
    
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(renderPageButton(i));
      }
    } else {
      // Always show first page
      pages.push(renderPageButton(1));

      if (currentPage > 3) {
        pages.push(<span key="ellipsis-1" className="text-slate-400 px-1 text-xs font-bold">...</span>);
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(renderPageButton(i));
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push(<span key="ellipsis-2" className="text-slate-400 px-1 text-xs font-bold">...</span>);
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(renderPageButton(totalPages));
      }
    }
    return pages;
  };

  const renderPageButton = (i: number) => (
    <button
      key={i}
      onClick={() => onPageChange(i)}
      className={cn(
        "w-8 h-8 flex items-center justify-center rounded-md text-xs font-bold transition-all",
        currentPage === i
          ? "bg-primary text-white"
          : "border border-slate-100 text-slate-600 hover:bg-slate-50"
      )}
    >
      {i}
    </button>
  );

  return (
    <div className={cn("flex flex-col sm:flex-row items-center justify-between mt-auto pt-6 border-t border-slate-100 gap-4", className)}>
      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
        Showing <span className="text-slate-600">{currentItemsCount}</span> of <span className="text-slate-600">{totalCount}</span> {label}
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-100 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronIcon size={16} direction="left" />
        </button>

        {renderPageNumbers()}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-100 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronIcon size={16} direction="right" />
        </button>
      </div>
    </div>
  );
};
