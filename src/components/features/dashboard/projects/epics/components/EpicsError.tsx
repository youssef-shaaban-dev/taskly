import { WifiOffIcon, RefreshIcon } from "@/components/icons";

interface EpicsErrorProps {
  message?: string;
  onRetry: () => void;
}

export const EpicsError = ({ message, onRetry }: EpicsErrorProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="w-20 h-20 rounded-3xl bg-red-50 flex items-center justify-center mb-6 border border-red-100">
        <WifiOffIcon className="text-red-500" size={32} />
      </div>
      
      <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-2 text-center">
        Something went wrong
      </h2>
      <p className="text-slate-500 text-sm md:text-[15px] max-w-sm text-center leading-relaxed mb-8 font-medium">
        {message || "We're having trouble retrieving your project epics right now. Please try again in a moment."}
      </p>

      <button 
        onClick={onRetry}
        className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        <RefreshIcon size={16} />
        Retry Connection
      </button>
    </div>
  );
};
