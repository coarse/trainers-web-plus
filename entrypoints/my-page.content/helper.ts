import { STATUSES } from "@/shared/data";
import type {
  AccountRecord,
  CountryCode,
  EventStatus,
  RegisteredEvent,
} from "@/shared/types";

export function extractAccountInfo(): Omit<AccountRecord, "country"> | null {
  const playerIdEl =
    document.querySelector("li.playerId") ||
    document.querySelector(".spOnly li.playerId");
  const rawPlayerIdText = playerIdEl?.textContent?.trim() || "";
  const playerId = rawPlayerIdText.replace(/^Player ID\s*:\s*/i, "").trim();

  if (!playerId) return null;

  const nicknameEl =
    document.querySelector("li.nickname") ||
    document.querySelector(".spOnly li.nickname");
  const nickname = nicknameEl?.textContent?.replace(/\s+/g, " ").trim() || "";

  return { playerId, nickname };
}

export function buildAccount(
  accountInfo: Omit<AccountRecord, "country">,
  country: CountryCode,
): AccountRecord {
  return { ...accountInfo, country };
}

export async function getCachedAccount(): Promise<AccountRecord | null> {
  const cachedResult = await browser.storage.local.get(["account"]);

  return (cachedResult.account as AccountRecord) || null;
}

export function accountsAreEqual(
  account1: AccountRecord,
  account2: AccountRecord,
) {
  // We only check for player id because different countries have different player id structures
  return account1.playerId === account2.playerId;
}

export function parseEventElement(
  el: Element,
): Omit<RegisteredEvent, "country"> | null {
  const linkEl = el.querySelector('a[href*="/event-search/"]');
  if (!linkEl) return null;

  const href = linkEl.getAttribute("href") || "";
  const idMatch = href.match(/\/event-search\/(\d+)/);
  if (!idMatch) return null;

  const eventId = idMatch[1];
  const statusEl = el.querySelector(".eventStatus");
  const rawStatus = statusEl?.textContent?.trim().toLowerCase() || "entered";
  const isValid = Object.keys(STATUSES).includes(rawStatus);
  if (!isValid) {
    console.warn(
      `Trainers Web Plus: Invalid event status "${rawStatus}" for event ${eventId}. Defaulting to "entered".`,
    );
  }
  const status = (isValid ? rawStatus : "entered") as EventStatus;

  const title =
    el.querySelector(".eventTitle")?.textContent?.replace(/\s+/g, " ").trim() ||
    "";

  const dateEl =
    el.querySelector(".eventDate span") || el.querySelector(".eventDate");
  const date = dateEl?.textContent?.trim() || "";

  const time = el.querySelector(".eventTime")?.textContent?.trim() || "";
  const organizer =
    el.querySelector(".organizer")?.textContent?.replace(/\s+/g, " ").trim() ||
    "";
  const place =
    el.querySelector(".place")?.textContent?.replace(/\s+/g, " ").trim() || "";

  return {
    id: eventId,
    status: status,
    title: title,
    date: date,
    time: time,
    organizer: organizer,
    place: place,
    url: href,
    lastSynced: Date.now(),
  };
}

export function getEvents(
  country: CountryCode,
  myEventsSection: Element,
): Record<string, RegisteredEvent> {
  const elements = myEventsSection.querySelectorAll(".event");
  const eventsList = Array.from(elements, parseEventElement).filter(
    (item) => item !== null,
  );

  return Object.fromEntries(
    eventsList.map((event) => [
      `${country}_${event.id}`,
      {
        ...event,
        country,
      },
    ]),
  );
}
