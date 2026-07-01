import { useState, useEffect } from "preact/hooks";
import type { RegisteredEvent, AccountRecord } from "@/shared/types";

interface StorageState {
  events: Record<string, RegisteredEvent>;
  lastSynced: number;
  account: AccountRecord | null;
  onboardingCompleted: boolean;
}

async function loadFromStorage(): Promise<StorageState> {
  try {
    const result = await browser.storage.local.get([
      "events",
      "lastSynced",
      "account",
      "onboardingCompleted",
    ]);
    return {
      events: (result.events || {}) as Record<string, RegisteredEvent>,
      lastSynced: (result.lastSynced as number) || 0,
      account: (result.account || null) as AccountRecord | null,
      onboardingCompleted:
        result.onboardingCompleted !== undefined
          ? Boolean(result.onboardingCompleted)
          : false,
    };
  } catch (err) {
    console.error("Failed to fetch storage:", err);
    return {
      events: {},
      lastSynced: 0,
      account: null,
      onboardingCompleted: false,
    };
  }
}

export function useEventsStorage() {
  const [state, setState] = useState<StorageState>({
    events: {},
    lastSynced: 0,
    account: null,
    onboardingCompleted: false,
  });

  useEffect(() => {
    let mounted = true;

    loadFromStorage().then((loaded) => {
      if (mounted) setState(loaded);
    });

    const handleStorageChange = (
      changes: Record<string, any>,
      areaName: string,
    ) => {
      if (areaName !== "local") return;
      if (changes.events || changes.lastSynced || changes.account) {
        loadFromStorage().then((loaded) => setState(loaded));
        return;
      }
      if (changes.onboardingCompleted) {
        browser.storage.local.get(["onboardingCompleted"]).then((res) => {
          setState((prev) => ({
            ...prev,
            onboardingCompleted: Boolean(res.onboardingCompleted),
          }));
        });
      }
    };

    browser.storage.onChanged.addListener(handleStorageChange);
    return () => {
      mounted = false;
      browser.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  const clearData = async () => {
    try {
      await browser.storage.local.clear();
      setState({
        events: {},
        lastSynced: 0,
        account: null,
        onboardingCompleted: false,
      });
    } catch (err) {
      console.error("Failed to clear storage:", err);
    }
  };

  return { ...state, clearData };
}
