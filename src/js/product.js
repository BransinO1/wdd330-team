import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import { updateCartIcon } from "./superscript.js";
import { displayDiscount } from "./discountManager.js";

const productId = getParam("product");

async function productDiscount(productId) {
  await productDetails(productId);
  applyDiscount();
}

function applyDiscount() {
  const priceElement = document.querySelector("#productFinalPrice"); // 👈 or update if needed
  if (!priceElement) return;

  const priceText = priceElement.textContent;
  const originalPrice = parseFloat(priceText.replace(/[^0-9.]/g, ""));
  if (isNaN(originalPrice)) return;

  displayDiscount(originalPrice, productId);
}

async function init() {
  await loadHeaderFooter();
  updateCartIcon();
  await productDiscount(productId);
}

init();

