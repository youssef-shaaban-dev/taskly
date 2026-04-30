
interface EpicTasksErrorProps {
  message?: string;
}

export const EpicTasksError = ({ message = "Failed to load tasks" }: EpicTasksErrorProps) => {
  return (
    <div className="bg-red-50 text-error p-4 rounded-xl text-sm font-semibold text-center border border-red-100">
      {message}
    </div>
  );
};
