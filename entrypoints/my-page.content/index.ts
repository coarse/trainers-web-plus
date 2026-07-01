import { getCountryCode } from "@/shared/url";
import { showToast } from "@/shared/toast";
import {
  accountsAreEqual,
  buildAccount,
  extractAccountInfo,
  getCachedAccount,
  getEvents,
} from "./helper";
import "@/assets/toast.content.css";

export default defineContentScript({
  matches: [
    "*://asia.pokemon-card.com/*/mypage/",
    "*://asia.pokemon-card.com/*/mypage/*",
  ],
  runAt: "document_idle",
  async main() {
    const country = getCountryCode(window.location.pathname);
    if (!country) {
      return;
    }

    const myEventsSection = document.querySelector(".myEvents");
    if (!myEventsSection) {
      return;
    }

    const accountInfo = extractAccountInfo();
    if (!accountInfo) {
      return;
    }
    const account = buildAccount(accountInfo, country);
    const cachedAccount = await getCachedAccount();
    if (cachedAccount && !accountsAreEqual(account, cachedAccount)) {
      await browser.storage.local.remove(["events", "account", "lastSynced"]);
    }

    const events = getEvents(country, myEventsSection);
    const numberOfEvents = Object.keys(events).length;

    await browser.storage.local.set({
      events,
      lastSynced: Date.now(),
      account,
      onboardingCompleted: true,
    });
    showToast(
      `Synced ${numberOfEvents} event${numberOfEvents > 1 ? "s" : ""}.`,
    );
  },
});
