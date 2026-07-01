import { PublicPath } from "wxt/browser";

export default defineBackground(() => {
  console.log("Hello background!", { id: browser.runtime.id });

  const ICONS_DEFAULT: Record<number, PublicPath> = {
    16: "/icon/16.png",
    32: "/icon/32.png",
    48: "/icon/48.png",
    96: "/icon/96.png",
    128: "/icon/128.png",
  };

  const ICONS_OFF: Record<number, PublicPath> = {
    16: "/icon/16-off.png",
    32: "/icon/32-off.png",
    48: "/icon/48-off.png",
    96: "/icon/96-off.png",
    128: "/icon/128-off.png",
  };

  async function setIcon(onboardingCompleted: boolean) {
    const paths = onboardingCompleted ? ICONS_DEFAULT : ICONS_OFF;
    await browser.action.setIcon({
      path: {
        16: browser.runtime.getURL(paths[16]),
        32: browser.runtime.getURL(paths[32]),
        48: browser.runtime.getURL(paths[48]),
        96: browser.runtime.getURL(paths[96]),
        128: browser.runtime.getURL(paths[128]),
      },
    });
  }

  browser.storage.local.get("onboardingCompleted").then((result) => {
    const completed =
      result.onboardingCompleted !== undefined
        ? Boolean(result.onboardingCompleted)
        : false;
    setIcon(completed);
  });

  browser.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== "local" || !changes.onboardingCompleted) return;
    const newValue = Boolean(changes.onboardingCompleted.newValue);
    setIcon(newValue);
  });
});
