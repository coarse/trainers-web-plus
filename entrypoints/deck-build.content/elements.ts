export const modal = document.createElement("div");
modal.id = "importDeckModal";
modal.className = "cardDetailModal";

export const modalWrapper = document.createElement("div");
modalWrapper.className = "modalWrapper";

export const modalWindow = document.createElement("div");
modalWindow.className = "modalWindow";

export const topClose = document.createElement("div");
topClose.className = "close";

export const closeButton = document.createElement("button");
closeButton.className = "closeButton";
closeButton.textContent = "close";

export const modalBody = document.createElement("div");
modalBody.className = "modalBody";

export const decklist = document.createElement("textarea");
decklist.id = "decklist";
decklist.placeholder = "Paste your TCG Live decklist here";
decklist.style.marginBottom = "16px";
decklist.rows = 10;
decklist.cols = 50;

export const submitButton = document.createElement("button");
submitButton.className = "button";
submitButton.textContent = "Import Deck";

export const bottomClose = document.createElement("div");
bottomClose.className = "bottomClose";

export const bottomCloseButton = document.createElement("button");
bottomCloseButton.className = "bottomCloseButton button secondary";
bottomCloseButton.textContent = "Close";

export const container = document.createElement("div");
container.className = "deckMenuZone";

export const importButton = document.createElement("button");
importButton.className = "button secondary";
importButton.textContent = "Import Deck";

topClose.appendChild(closeButton);

modalBody.appendChild(decklist);
modalBody.appendChild(submitButton);

bottomClose.appendChild(bottomCloseButton);

modalWindow.appendChild(topClose);
modalWindow.appendChild(modalBody);
modalWindow.appendChild(bottomClose);

modalWrapper.appendChild(modalWindow);
modal.appendChild(modalWrapper);
