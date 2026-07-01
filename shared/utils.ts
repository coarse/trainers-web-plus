import { COUNTRIES, STATUSES } from "@/shared/data";
import type { EventStatus } from "@/shared/types";

export function getCountryFlag(countryCode: string): string {
  const country = COUNTRIES.find((c) => c.code === countryCode);
  return country?.flag || `[${countryCode.toUpperCase()}]`;
}
export function getStatusText(status: EventStatus): string {
  return STATUSES[status] ?? status;
}
