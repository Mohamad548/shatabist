// src/utils/time.ts
export function getTimeAgo(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSec < 60) return "چند لحظه پیش";
  if (diffMin < 60) return `${diffMin} دقیقه پیش`;
  if (diffHours < 24) return `${diffHours} ساعت پیش`;
  if (diffDays === 1) return "دیروز";
  return `${diffDays} روز پیش`;
}
