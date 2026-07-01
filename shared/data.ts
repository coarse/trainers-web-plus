import type { CountryCode, EventStatus } from "./types";

export const BASE_URL = "https://asia.pokemon-card.com";

export const STATUSES: { [key in EventStatus]: string } = {
  "not-registered": "Not Registered",
  entered: "Registered",
  elected: "Elected",
  joined: "Joined",
  declined: "Declined",
  waiting: "Waiting",
};

export const COUNTRIES: { code: CountryCode; label: string; flag: string }[] = [
  { code: "ph", label: "Philippines", flag: "🇵🇭" },
  { code: "sg", label: "Singapore", flag: "🇸🇬" },
  { code: "my", label: "Malaysia", flag: "🇲🇾" },
  { code: "hk", label: "Hong Kong", flag: "🇭🇰" },
  { code: "hk-en", label: "Hong Kong (EN)", flag: "🇭🇰" },
  { code: "tw", label: "Taiwan", flag: "🇹🇼" },
  { code: "th", label: "Thailand", flag: "🇹🇭" },
  { code: "id", label: "Indonesia", flag: "🇮🇩" },
] as const;

export const VALID_COUNTRIES = COUNTRIES.map((c) => c.code) as CountryCode[];

export const STATUS_FILTERS: { value: EventStatus | "all"; label: string }[] = [
  { value: "all", label: "All Statuses" },
  { value: "entered", label: "Registered" },
  { value: "elected", label: "Elected" },
  { value: "declined", label: "Declined" },
];
