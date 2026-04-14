const LayeringCard = () => {
    return (
        <div className="bg-white border border-surface-highest rounded-xl p-6 shadow-sm flex flex-col gap-6 w-full max-w-[600px]">
            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <h2 className="text-title-md font-bold text-slate-900">The Layering Principle</h2>
                    <p className="text-body-md text-slate-500">Soft edges defined by tonal shifts.</p>
                </div>
                <span className="bg-success/20 text-success text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
                    Active Task
                </span>
            </div>

            <div className="bg-surface-low rounded-md h-[160px] flex items-center justify-center border border-slate-200/50">
                <span className="text-[12px] text-slate-400">Visual representation of nested surfaces</span>
            </div>
        </div>
    );
};
export default LayeringCard;