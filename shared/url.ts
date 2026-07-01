import { VALID_COUNTRIES } from "./data";
import type { CountryCode } from "./types";

export function getCountryCode(url: string): CountryCode | null {
  const country = url.split("/")[1] as CountryCode;

  if (!VALID_COUNTRIES.includes(country)) {
    return null;
  }

  return country;
}

export function getEventId(url: string): string | null {
  const match = url.match(/\/event-search\/(\d+)\/?/);
  return match ? match[1] : null;
}
