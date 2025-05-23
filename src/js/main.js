import productList from "./productList.mjs";
import { updateCartIcon } from "./superscript.js";
import { loadHeaderFooter } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  // Load header/footer first
  await loadHeaderFooter();

  // Then render product list and update cart icon
  productList(".product-list", "tents");
  updateCartIcon();
});
