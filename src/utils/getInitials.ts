export const getInitials = (name: string): string => {
  if (!name) return "US";
  const names = name.trim().split(" ");
  if (names.length >= 2) {
    return (names[0][0] + names[1][0]).toUpperCase();
  }
  return names[0].substring(0, 2).toUpperCase();
};