import { getCountryCode, getEventId } from "@/shared/url";
import type {
  AccountRecord,
  CountryCode,
  RegisteredEvent,
} from "@/shared/types";
import { showToast } from "@/shared/toast";
import { createActionButton, getRegisterButton } from "./helper";
import "@/assets/toast.content.css";
import "@/assets/event-detail.content.css";

const activeObservers: MutationObserver[] = [];

function cleanupObservers() {
  activeObservers.forEach((obs) => obs.disconnect());
  activeObservers.length = 0;
}

window.addEventListener("beforeunload", cleanupObservers);

const AUTO_REGISTER_CLICK_DELAY = 300;
const DEFAULT_WAIT_TIMEOUT = 3000;

export default defineContentScript({
  matches: ["*://asia.pokemon-card.com/*/event-search/*"],
  excludeMatches: ["*://asia.pokemon-card.com/*/event-search/search/*"],
  runAt: "document_idle",
  async main() {
    const country = getCountryCode(window.location.pathname);
    if (!country) {
      return;
    }

    const eventId = getEventId(window.location.pathname);
    if (!eventId) {
      return;
    }

    const lotterySchedule = document.querySelector(".lotterySchedule");
    if (!lotterySchedule) return;

    const existingWrapper = document.querySelector("div.twp-btn-wrapper");
    if (existingWrapper) return;

    const registerBtn = getRegisterButton();
    if (!registerBtn) return;

    const wrapper = document.createElement("div");
    wrapper.className = "twp-btn-wrapper";

    const autoBtn = createActionButton("Auto Register", "twp-auto-register");

    const pageButtons: HTMLButtonElement[] = [autoBtn, registerBtn];

    function disableAll() {
      pageButtons.forEach((b) => {
        b.disabled = true;
      });
    }

    function enableAll() {
      pageButtons.forEach((b) => {
        b.disabled = false;
      });
    }

    autoBtn.addEventListener("click", () =>
      runAutoRegister(autoBtn, disableAll, enableAll),
    );
    registerBtn.addEventListener("click", () =>
      openRegistrationModal(disableAll, enableAll),
    );

    wrapper.appendChild(autoBtn);
    wrapper.appendChild(registerBtn);

    lotterySchedule.after(wrapper);

    const sidebarColumn = document.querySelector(
      "article.sidebarColumn",
    ) as HTMLElement | null;
    if (sidebarColumn) {
      const sidebarBtns = createSidebarButtons(
        pageButtons,
        disableAll,
        enableAll,
      );
      sidebarColumn.prepend(sidebarBtns);
    }

    startRegistrationObserver(eventId, country);
  },
});

function startRegistrationObserver(eventId: string, country: CountryCode) {
  const completeEl = document.getElementById("eventDetailEntryComplete");
  if (!completeEl) return;

  let observed = false;
  const observer = new MutationObserver((mutations) => {
    if (observed) return;
    for (const mutation of mutations) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        const cls = completeEl.getAttribute("class") || "";
        if (!cls.includes("hide")) {
          observed = true;
          observer.disconnect();
          activeObservers.splice(activeObservers.indexOf(observer), 1);
          syncRegistration(eventId, country).catch(console.error);
        }
      }
    }
  });

  activeObservers.push(observer);
  observer.observe(completeEl, { attributes: true });
}

async function syncRegistration(eventId: string, country: CountryCode) {
  const result = await browser.storage.local.get(["events", "account"]);
  const events = (result.events || {}) as Record<string, RegisteredEvent>;

  const account = result.account ? (result.account as AccountRecord) : null;
  if (!account) {
    return;
  }

  const eventEl = document.querySelector(".detailHeader");
  if (!eventEl) return;

  const titleEl = eventEl.querySelector(".seriesName");
  const dateEl = eventEl.querySelector(".eventDate time");
  const title = titleEl?.textContent?.replace(/\s+/g, " ").trim() || "";
  const date = dateEl?.textContent?.trim() || "";

  const eventKey = `${country}_${eventId}`;
  events[eventKey] = {
    id: eventId,
    country,
    status: "entered",
    title,
    date,
    time: "",
    organizer: "",
    place: "",
    url: window.location.pathname,
    lastSynced: Date.now(),
  };

  await browser.storage.local.set({
    events,
    lastSynced: Date.now(),
  });
  showToast(`Registered for event ${eventId}`);
}

async function runAutoRegister(
  btn: HTMLButtonElement,
  disableAll: () => void,
  enableAll: () => void,
) {
  disableAll();
  btn.textContent = "Registering...";

  try {
    const modalOpenBtn = getRegisterButton();
    if (!modalOpenBtn) throw new Error("Register button not found");
    modalOpenBtn.click();

    await waitForElement("#eventDetailEntryModal");

    const receiveCheckbox = document.getElementById(
      "receiveNoticeFlg",
    ) as HTMLInputElement | null;
    if (receiveCheckbox && receiveCheckbox.checked) {
      receiveCheckbox.checked = false;
      receiveCheckbox.dispatchEvent(new Event("change", { bubbles: true }));
    }

    const agreementCheckbox = document.getElementById(
      "agreementFlg",
    ) as HTMLInputElement | null;
    if (agreementCheckbox && !agreementCheckbox.checked) {
      agreementCheckbox.checked = true;
      agreementCheckbox.dispatchEvent(new Event("change", { bubbles: true }));
    }

    await waitForElement("#entryButton");

    const entryButton = document.getElementById(
      "entryButton",
    ) as HTMLElement | null;
    if (!entryButton) throw new Error("Entry button not found");
    entryButton.click();

    await sleep(AUTO_REGISTER_CLICK_DELAY);

    btn.textContent = "Registered!";
  } catch (err) {
    console.error("Trainers Web Plus: Auto-register failed:", err);
    btn.textContent = "Register Failed";
    setTimeout(() => {
      enableAll();
      btn.textContent = "Auto Register";
    }, 2000);
  }
}

function createSidebarButtons(
  pageButtons: HTMLButtonElement[],
  disableAll: () => void,
  enableAll: () => void,
) {
  const container = document.createElement("div");
  container.className = "twp-sidebar-btns";

  const autoBtn = createActionButton("Auto Register", "twp-auto-register");
  pageButtons.push(autoBtn);
  autoBtn.addEventListener("click", () =>
    runAutoRegister(autoBtn, disableAll, enableAll),
  );

  container.appendChild(autoBtn);
  return container;
}

function openRegistrationModal(disableAll: () => void, enableAll: () => void) {
  disableAll();
  const modalOpenBtn = getRegisterButton();
  if (modalOpenBtn) modalOpenBtn.click();
  setTimeout(enableAll, 500);
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function waitForElement(
  selector: string,
  timeout = DEFAULT_WAIT_TIMEOUT,
): Promise<HTMLElement | null> {
  const el = document.querySelector(selector);
  if (el) return Promise.resolve(el as HTMLElement);

  return new Promise((resolve) => {
    const start = Date.now();
    const observer = new MutationObserver((mutations, obs) => {
      const found = document.querySelector(selector);
      if (found || Date.now() - start > timeout) {
        obs.disconnect();
        resolve(found as HTMLElement | null);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => {
      observer.disconnect();
      resolve(null);
    }, timeout);
  });
}
