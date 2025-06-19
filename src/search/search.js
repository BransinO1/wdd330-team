import { loadHeaderFooter, getParam } from "../js/utils.mjs";
import { renderListWithTemplate } from "../js/utils.mjs";
import productListTemplate from "../js/productList.mjs";
import externalServices from "../js/externalServices.mjs";
import { initLoginButton } from "../js/loginButton.js";


document.addEventListener("DOMContentLoaded", async () => {
  await loadHeaderFooter();
  initLoginButton();

  const query = getParam("q");
  if (!query) {
    document.querySelector(".product-list").innerHTML = "<p>Please enter a search term.</p>";
    return;
  }

  try {
    const products = await externalServices.searchProducts(query);

    if (products.length === 0) {
      document.querySelector(".product-list").innerHTML = "<p>No products found.</p>";
    } else {
      renderListWithTemplate(productListTemplate, document.querySelector(".product-list"), products);
    }
  } catch (err) {
    document.querySelector(".product-list").innerHTML = "<p>Error retrieving products.</p>";
    console.error("Search error:", err);
  }
});