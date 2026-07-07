import { getDeckDataFromText } from "./parser";
import {
  modal,
  closeButton,
  decklist,
  submitButton,
  bottomCloseButton,
  container,
  importButton,
} from "./elements";
import { showToast } from "@/shared/toast";

closeButton.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.classList.remove("modalOpening");
});

submitButton.addEventListener("click", handleSubmit);

bottomCloseButton.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.classList.remove("modalOpening");
});

importButton.addEventListener("click", () => {
  modal.style.display = "block";
  document.body.classList.add("modalOpening");
});

function serializeData(
  deckData: { cardId: string; cardName: string; count: string }[],
): URLSearchParams {
  const params = new URLSearchParams();
  deckData.forEach((card, i) => {
    params.append(`deckData[${i}][cardId]`, card.cardId);
    params.append(`deckData[${i}][cardName]`, card.cardName);
    params.append(`deckData[${i}][count]`, card.count);
  });
  return params;
}

async function handleSubmit() {
  const decklistValue = decklist.value.trim();
  if (!decklistValue) {
    alert("Please paste your decklist.");
    return;
  }

  const deckData = getDeckDataFromText(decklistValue);
  console.log("Decklist imported:", deckData);

  const validateUrl = (
    document.querySelector("#getDeckCodeButton") as HTMLElement
  ).dataset.url!;

  const res = await fetch(validateUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: serializeData(deckData),
  });
  const { success } = await res.json();

  if (success.errors.length > 0) {
    console.error("Errors:", success.errors);
    return;
  }

  showToast(`Import success! Redirecting to decklist page...`);

  modal.style.display = "none";
  document.body.classList.remove("modalOpening");
  const json = JSON.stringify(deckData);
  (document.getElementById("formDeckList") as HTMLInputElement).value = json;
  (document.getElementById("deckData") as HTMLInputElement).value = json;
  (document.querySelector("#registerDeckForm") as HTMLFormElement).submit();
}

export function injectImportDeck() {
  const deckZone = document.querySelector("#deckZone");
  if (!deckZone) {
    return;
  }

  const flexWrapper = document.querySelector(".flexWrapper");
  if (!flexWrapper) {
    return;
  }

  flexWrapper.appendChild(modal);

  container.appendChild(importButton);
  deckZone.prepend(container);
}
