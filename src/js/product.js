import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import { updateCartIcon } from "./superscript.js";

const productId = getParam("product");
productDetails(productId);

async function init() {
  await loadHeaderFooter();  // wait for header/footer to load
  updateCartIcon();          // THEN update the badge
}

init();
