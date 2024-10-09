export const humanizeDate = (
  date: string,
  locale: string = "en-US",
  options: Intl.DateTimeFormatOptions = {},
) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    ...options,
  });
};
