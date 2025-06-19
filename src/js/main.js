import { updateCartIcon } from "./superscript.js";
import { loadHeaderFooter } from "./utils.mjs";
import loadAlerts from "./alert.mjs";
import { initHomePage } from "./breadcrumb.js";
import { initLoginButton } from "./loginButton.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeaderFooter();
  updateCartIcon();
  loadAlerts();
  initLoginButton();

  // Welcome modal logic
  const modal = document.getElementById("welcome-modal");
  const closeBtn = document.getElementById("close-modal");
  if (modal && closeBtn && !localStorage.getItem("seenWelcomeModal")) {
    modal.classList.remove("hidden");
    closeBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
      localStorage.setItem("seenWelcomeModal", "true");
    });
  }

  // Newsletter form logic
  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function(e) {
      e.preventDefault();

      const emailInput = document.getElementById("email");
      const message = document.getElementById("newsletterMessage");

      if (!emailInput.value.trim()) {
        message.style.color = "red";
        message.textContent = "Please enter a valid email address.";
        return;
      }

      message.style.color = "";
      message.textContent = `Thanks for subscribing, ${emailInput.value}!`;
      emailInput.value = "";
    });
  }

  // Initialize breadcrumb
  initHomePage();
});
