import { loadHeaderFooter } from "./utils.mjs";
import shoppingCart from "./shoppingCart.mjs";
import { updateCartIcon } from "./superscript.js";

async function init() {
  await loadHeaderFooter();   // wait for header/footer to load
  updateCartIcon();           // update the cart badge
  shoppingCart();             // render cart contents
}

init();
