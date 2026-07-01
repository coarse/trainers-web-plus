import { STATUSES } from "@/shared/data";
import { getCountryCode, getEventId } from "@/shared/url";
import { getStatusText } from "@/shared/utils";
import { getCachedEvents } from "./helper";
import "@/assets/event-search.content.css";

export default defineContentScript({
  matches: ["*://asia.pokemon-card.com/*/event-search/search/*"],
  runAt: "document_idle",
  async main() {
    const country = getCountryCode(window.location.pathname);
    if (!country) {
      return;
    }

    const events = await getCachedEvents();

    const eventLinks = document.querySelectorAll("a.eventLink");
    if (eventLinks.length === 0) return;

    eventLinks.forEach((linkEl) => {
      const eventEl = linkEl.querySelector("li.event");
      if (!eventEl) return;

      const href = linkEl.getAttribute("href") || "";
      const eventId = getEventId(href);
      if (!eventId) return;

      const eventKey = `${country}_${eventId}`;

      const eventData = events[eventKey];

      const rightCol = eventEl.querySelector(".rightColumn");
      if (!rightCol) return;

      let formatAndLeague = rightCol.querySelector(".formatAndLeague");
      if (!formatAndLeague) {
        formatAndLeague = document.createElement("p");
        formatAndLeague.className = "formatAndLeague";
        rightCol.prepend(formatAndLeague);
      }

      const existingBadgeContainer = formatAndLeague.querySelector(
        ".twp-badge-container",
      );
      if (existingBadgeContainer) existingBadgeContainer.remove();

      const badgeContainer = document.createElement("span");
      badgeContainer.className = "twp-badge-container";

      const badge = document.createElement("span");

      eventEl.classList.remove(
        ...Object.keys(STATUSES).map((s) => `twp-event-${s}`),
      );

      if (eventData) {
        badge.className = `twp-status-badge twp-${eventData.status}`;
        badge.textContent = getStatusText(eventData.status);
        eventEl.classList.add(`twp-event-${eventData.status}`);
      } else {
        badge.className = "twp-status-badge twp-not-registered";
        badge.textContent = "Not Registered";
        eventEl.classList.add("twp-event-not-registered");
      }

      badgeContainer.appendChild(badge);
      formatAndLeague.prepend(badgeContainer);
    });
  },
});
