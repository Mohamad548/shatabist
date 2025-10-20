export function toLocalDateString(date: string | number): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("fa-IR", options);
}

export function toLocalDateStringShort(date: string | number) {
  return new Date(date).toLocaleDateString("fa-IR");
}


export function toLocalTimeString(date: string | number): string {
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(date).toLocaleTimeString("fa-IR", options);
}
