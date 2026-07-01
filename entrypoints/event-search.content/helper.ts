import type { RegisteredEvent } from "@/shared/types";

export async function getCachedEvents(): Promise<
  Record<string, RegisteredEvent>
> {
  const cachedResult = await browser.storage.local.get(["events"]);

  return (cachedResult.events || {}) as Record<string, RegisteredEvent>;
}
