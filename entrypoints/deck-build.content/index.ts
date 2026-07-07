import { getCountryCode } from "@/shared/url";
import { showToast } from "@/shared/toast";
import { injectEnterSearch } from "./enter-search";
import { injectImportDeck } from "./import-deck";
import "@/assets/toast.content.css";

export default defineContentScript({
  matches: ["*://asia.pokemon-card.com/*/deck-build/*"],
  excludeMatches: [
    "*://asia.pokemon-card.com/*/deck-build/recipe/*",
    "*://asia.pokemon-card.com/*/deck-build/code/*",
  ],
  runAt: "document_idle",
  world: "MAIN",
  async main() {
    const country = getCountryCode(window.location.pathname);
    if (!country) {
      return;
    }

    injectImportDeck();
    injectEnterSearch();
    showToast(`Extra features enabled!`);
  },
});
