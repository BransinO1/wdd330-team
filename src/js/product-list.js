import { updateCartIcon } from "./superscript.js";
import { loadHeaderFooter, getParam } from "./utils.mjs";
import productList from "./productList.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeaderFooter();
  updateCartIcon();

  const category = getParam("category") || "tents";

  const titleElement = document.querySelector(".category-title");
  if (titleElement) {
    titleElement.textContent = `Top ${category.replace("-", "")} Products`;
  }

  productList(".product-list", category);
});
