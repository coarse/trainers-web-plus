const FALLBACK_DATE_VALUE = 99999;

export const parseDateToComparable = (dateStr: string) => {
  if (!dateStr || !dateStr.includes("-")) return FALLBACK_DATE_VALUE;
  const parts = dateStr.split("-");
  let m = parseInt(parts[0], 10);
  const d = parseInt(parts[1], 10);
  if (isNaN(m) || isNaN(d)) return FALLBACK_DATE_VALUE;

  const currentMonth = new Date().getMonth() + 1;
  if (m < currentMonth) {
    m += 12;
  }
  return m * 100 + d;
};

export const getRelativeSyncedString = (lastSynced: number) => {
  if (!lastSynced) return "Never";
  const diffMs = Date.now() - lastSynced;
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  return new Date(lastSynced).toLocaleDateString();
};
