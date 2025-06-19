import { loadHeaderFooter } from "./utils.mjs";
import { initLoginButton } from "./loginButton.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeaderFooter();
  initLoginButton();
});
