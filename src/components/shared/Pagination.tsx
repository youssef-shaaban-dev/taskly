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
  totalPages,
  totalCount,
  currentItemsCount,
  onPageChange,
  label = "items",
  className,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  // Generate page numbers
  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
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
    }
    return pages;
  };

  return (
    <div className={cn("flex flex-col sm:flex-row items-center justify-between mt-auto pt-6 border-t border-slate-100 gap-4", className)}>
      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
        Showing <span className="text-slate-600">{currentItemsCount}</span> of <span className="text-slate-600">{totalCount}</span> {label}
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-100 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronIcon size={16} direction="left" />
        </button>

        {renderPageNumbers()}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-100 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronIcon size={16} direction="right" />
        </button>
      </div>
    </div>
  );
};
