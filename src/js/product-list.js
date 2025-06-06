import { updateCartIcon } from "./superscript.js";
import { loadHeaderFooter, getParam } from "./utils.mjs";
import productList from "./productList.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeaderFooter();
  updateCartIcon();

  const category = getParam("category") || "tents";

  const titleElement = document.querySelector(".category-title");
  if (titleElement) {
    const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
    titleElement.textContent = `Top Products: ${capitalizedCategory}`;
  }

  productList(".product-list", category);
});
