export const getTimestamp = (timestamp: Date) => {
  const year: number = timestamp.getFullYear();
  const month: string = timestamp.toLocaleString("default", { month: "long" });
  const date: number = timestamp.getDate();
  const dayOfWeek: string = timestamp.toLocaleString("default", {
    weekday: "long",
  });
  const time: string = timestamp.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return { year, month, date, dayOfWeek, time };
};
