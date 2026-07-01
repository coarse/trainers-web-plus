export function getRegisterButton() {
  return document.querySelector(
    'button.modalOpen[data-target="#eventDetailEntryModal"]',
  ) as HTMLButtonElement | null;
}

export function createActionButton(
  label: string,
  className: string,
): HTMLButtonElement {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = `button arrow ${className}`;
  btn.textContent = label;
  return btn;
}
