import { updateCartIcon } from "./superscript.js";
import { loadHeaderFooter } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeaderFooter();
  updateCartIcon();
});
