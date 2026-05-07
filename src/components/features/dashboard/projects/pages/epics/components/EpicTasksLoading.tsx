
export const EpicTasksLoading = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-16 bg-slate-50 animate-pulse rounded-xl w-full"></div>
      ))}
    </div>
  );
};
