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
  // Get the current price from the page
  const priceElement = document.querySelector('.product-card__price');
  if (!priceElement) return;
  
  // Extract price
  const priceText = priceElement.textContent;
  const originalPrice = parseFloat(priceText.replace(/[^0-9.]/g, ''));
  
  if (isNaN(originalPrice)) return;
  
  // Display the discount
  displayDiscount(originalPrice, productId);
}

async function init() {
  await loadHeaderFooter();  // wait for header/footer to load
  updateCartIcon();     // THEN update the badge
  await productDiscount(productId);     
}

init();
