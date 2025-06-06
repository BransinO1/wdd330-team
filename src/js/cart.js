import { loadHeaderFooter } from "./utils.mjs";
import shoppingCart from "./shoppingCart.mjs";
import { updateCartIcon } from "./superscript.js";

async function init() {
  await loadHeaderFooter();
  updateCartIcon();
  shoppingCart();
}

init();

document.addEventListener("input", (e) => {
  if (e.target.classList.contains("quantity-input")) {
    const productId = e.target.dataset.id;
    const newQty = parseInt(e.target.value);

    if (newQty > 0) {
      let cart = JSON.parse(localStorage.getItem("so-cart")) || [];
      const index = cart.findIndex(item => item.Id === productId);
      if (index !== -1) {
        cart[index].Quantity = newQty;
        localStorage.setItem("so-cart", JSON.stringify(cart));
        // Optionally update total price, etc.
        location.reload(); // or call a function to re-render totals
      }
    }
  }
});
