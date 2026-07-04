import pokeballToastSvg from "@/assets/pokeball-toast.svg?url";

export function showToast(message: string) {
  const existingToast = document.querySelector(".twp-toast");
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement("div");
  toast.className = "twp-toast";

  const icon = document.createElement("img");
  icon.className = "twp-toast-icon";
  icon.src = pokeballToastSvg;
  icon.alt = "";

  const content = document.createElement("div");
  content.className = "twp-toast-content";

  const desc = document.createElement("span");
  desc.className = "twp-toast-desc";
  desc.textContent = message;

  content.appendChild(desc);
  toast.appendChild(icon);
  toast.appendChild(content);

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("twp-toast-fadeout");
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 4000);
}
