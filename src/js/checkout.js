import { loadHeaderFooter, getLocalStorage } from "./utils.mjs";
import { renderListWithTemplate } from "./utils.mjs";
import { updateCartIcon } from "./superscript.js";
import cartItemTemplate from "./cartItemTemplate.mjs";
import checkoutProcess from "./checkoutProcess.mjs";
import { alertMessage } from "./utils.mjs";

// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  // Load header/footer and update cart icon
  loadHeaderFooter().then(() => {
    updateCartIcon();
  });

  // Initialize checkout process with cart key and display target
  checkoutProcess.init("so-cart", ".order-summary");

  // ZIP field blur event
  const zipInput = document.querySelector("input[name='zip']");
  if (zipInput) {
    zipInput.addEventListener("blur", (e) => {
      const zip = e.target.value;
      if (zip.length >= 5) {
        checkoutProcess.calculateOrderTotals(zip);
      }
    });
  }

  // Render cart items to the page
  const cart = getLocalStorage("so-cart") || [];
  const listElement = document.querySelector(".product-list");
  if (listElement) {
    renderListWithTemplate(cartItemTemplate, listElement, cart);
  }

function validateForm(form) {
  const fname = form.fname.value.trim();
  const lname = form.lname.value.trim();
  const address = form.address.value.trim();
  const zip = form.zip.value.trim();
  const ccnum = form.ccnum.value.replace(/\s+/g, ""); // Remove spaces
  const exp = form.exp.value.trim();
  const sec = form.code.value.trim(); // assuming security code field named 'code'

  if (fname.length < 2) {
    alertMessage("First name must be at least 2 characters.");
    form.fname.focus();
    return false;
  }
  if (lname.length < 2) {
    alertMessage("Last name must be at least 2 characters.");
    form.lname.focus();
    return false;
  }
  if (address.length < 5) {
    alertMessage("Address must be at least 5 characters.");
    form.address.focus();
    return false;
  }
  if (!/^\d{5}$/.test(zip)) {
    alertMessage("ZIP code must be exactly 5 digits.");
    form.zip.focus();
    return false;
  }

  // Credit card number: 13-19 digits, digits only
  if (!/^\d{13,19}$/.test(ccnum)) {
    alertMessage("Please enter a valid credit card number (13 to 19 digits).");
    form.ccnum.focus();
    return false;
  }

  // Expiration date check - assuming format MM/YY or MM/YYYY
  if (!validateExpiration(exp)) {
    alertMessage("Please enter a valid expiration date in MM/YY or MM/YYYY format, and it must be in the future.");
    form.exp.focus();
    return false;
  }

  // Security code (CVV) check - 3 or 4 digits
  if (!/^\d{3,4}$/.test(sec)) {
    alertMessage("Security code must be 3 or 4 digits.");
    form.code.focus();
    return false;
  }

  return true;
}

// Helper function to validate expiration date
function validateExpiration(exp) {
  // Accept MM/YY or MM/YYYY formats
  const regex = /^(0[1-9]|1[0-2])\/(\d{2}|\d{4})$/;
  if (!regex.test(exp)) return false;

  const parts = exp.split("/");
  let month = parseInt(parts[0], 10);
  let year = parts[1].length === 2 ? 2000 + parseInt(parts[1], 10) : parseInt(parts[1], 10);

  const now = new Date();
  const expDate = new Date(year, month - 1, 1);
  // Set to last day of the month
  expDate.setMonth(expDate.getMonth() + 1);
  expDate.setDate(0);

  return expDate >= now;
}

  // Hook up form submission
  const checkoutForm = document.querySelector("#checkoutForm");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!checkoutForm.checkValidity()) {
        alertMessage("Please fill out all required fields correctly.");
        return;
      }
      if (!validateForm(checkoutForm)) {
        return;
      }
      try {
        await checkoutProcess.checkout(e.target);
        alertMessage("Order submitted successfully!");
        localStorage.removeItem("so-cart");
        window.location.href = "/checkout/success.html";
      } catch (error) {
        alertMessage("There was an error processing your order: " + error.message);
      }
    });
  }
});
