import { loadHeaderFooter, getLocalStorage } from "./utils.mjs";
import { renderListWithTemplate } from "./utils.mjs";
import { updateCartIcon } from "./superscript.js";
import cartItemTemplate from "./cartItemTemplate.mjs";
import checkoutProcess from "./checkoutProcess.mjs";

// Load header/footer and update cart icon
loadHeaderFooter().then(() => {
  updateCartIcon();
});


// Initialize checkout process with cart key and display target
checkoutProcess.init("so-cart", ".order-summary");
document.querySelector("input[name='zip']").addEventListener("blur", (e) => {
  const zip = e.target.value;
  if (zip.length >= 5) {
    checkoutProcess.calculateOrderTotals(zip);
  }
});

// Render cart items to the page
const cart = getLocalStorage("so-cart") || [];
const listElement = document.querySelector(".product-list");
if (listElement) {
  renderListWithTemplate(cartItemTemplate, listElement, cart);
}

// Hook up form submission
document.querySelector("#checkoutForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  if (form.checkValidity()) {
    await checkoutProcess.checkout(form);
    alert("Order submitted successfully!");
    localStorage.removeItem("so-cart");
    window.location.href = "/thankyou.html";
  } else {
    alert("Please fill out all required fields.");
  }
});
