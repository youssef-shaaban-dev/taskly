export const getWeekRange = () => {
  const now = new Date();
  const startOfWeek = new Date(now);
  // Get first day (Sunday - 0)
  const day = now.getDay();
  startOfWeek.setDate(now.getDate() - day);
  
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  return {
    startDate: startOfWeek.toISOString().split("T")[0],
    endDate: endOfWeek.toISOString().split("T")[0],
  };
};

export const getDayDiff = (startStr: string, endStr: string): number => {
  const start = new Date(startStr);
  const end = new Date(endStr);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
};

export const formatShortDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
};
