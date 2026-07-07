function handleEnterSearch(event: KeyboardEvent) {
  if (event.key === "Enter") {
    const searchButton =
      document.querySelector<HTMLButtonElement>("#searchCardButton");
    searchButton?.click();
  }
}

export function injectEnterSearch() {
  document.addEventListener("keydown", handleEnterSearch);
  document
    .getElementById("freeword")
    ?.addEventListener("keydown", handleEnterSearch);
}
