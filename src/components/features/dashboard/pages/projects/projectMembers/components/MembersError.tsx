export const MembersError = ({ error, onRetry }: { error: string; onRetry: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 bg-white rounded-lg border border-slate-100 shadow-sm text-center">
      <div className="w-12 h-12 bg-error/10 text-error rounded-full flex items-center justify-center mb-4 text-xl">
        ⚠
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">Something went wrong</h3>
      <p className="text-sm text-slate-500 max-w-xs mb-6">{error}</p>
      <button
        onClick={onRetry}
        className="bg-primary text-white px-6 py-2 rounded-md text-sm font-bold hover:opacity-90 transition-opacity"
      >
        Retry Connection
      </button>
    </div>
  );
};
