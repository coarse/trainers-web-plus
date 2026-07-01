export function showToast(message: string) {
  const existingToast = document.querySelector(".twp-toast");
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement("div");
  toast.className = "twp-toast";

  const icon = document.createElement("div");
  icon.className = "twp-toast-icon";
  icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1146.88 1146.88"><style>.a{fill:#fff}.b{fill:#e40615}</style><path class="a" d="m61.4 624.4h255q10 45 33 84 24 38 58 66 34 28 76 44 43 16 90 16 47 0 90-16 42-16 76-44 34-28 58-66 23-38 32-83l1-2h255q-11 98-54 182-44 85-112.5 147-68.5 62-156.5 97-89 36-188 36 0 0-1 0 0 0-0.5 0-0.5 0-0.5 0-99 0-188-35-88-36-156.5-97.5-68.5-61.5-112.5-145.5-43-84-54-180zm339-51q0 0 0-1 0-71 50.5-122 50.5-51 122.5-51 71 0 122 51 51 51 51 122 0 72-50.5 122.5-50.5 50.5-122.5 50.5-72 0-122.5-50-50.5-50-50.5-122z"/><path class="b" d="m572.4 61.4q0 0 0.5 0 0.5 0 1.5 0 99 0 188 35 88 36 156 97.5 68 61.5 112 145.5 44 84 54 180l1 3h-255q-10-45-33-83-24-39-58-67-34-28-76-44-43-15-90-15-47 0-90 15-43 16-76.5 44-33.5 28-57.5 66-23 38-33 83v2h-255q10-98 54-182 44-84 112-146.5 68-62.5 157-97.5 88-36 188-36z"/></svg>`;

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
