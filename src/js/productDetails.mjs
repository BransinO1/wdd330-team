import { findProductById } from "./productData.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { updateCartIcon } from './superscript.js';


let product = {};

export default async function productDetails(productId) {
  const product = await findProductById(productId);
  if (!product) {
    showProductNotFoundMessage();
    return;
  }
  renderProductDetails(product);
  document
    .getElementById("addProductToCart")
    .addEventListener("click", () => addProductToCart(product));
}

function showProductNotFoundMessage() {
  const container = document.querySelector(".product-detail");

  if (container) {
    container.innerHTML = `
      <h2>Product Not Found</h2>
      <p>The item you're looking for doesn't seem to exist.</p>
    `;
  }

  // Hide the Add to Cart button if it's in the DOM
  const addButton = document.getElementById("addProductToCart");
  if (addButton) {
    addButton.style.display = "none";
  }
}

function addProductToCart(productToAdd) {
  const cart = getLocalStorage("so-cart") || [];
  const existingProductIndex = cart.findIndex(item => item.Id === productToAdd.Id);
  if (existingProductIndex > -1) {
    cart[existingProductIndex].Quantity += 1;
  } else {
    productToAdd.Quantity = 1;
    cart.push(productToAdd);
  }
  setLocalStorage("so-cart", cart);
  updateCartIcon();
}
const baseURL = import.meta.env.VITE_SERVER_URL;

function renderProductDetails(product) {
  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText = product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Images?.PrimaryLarge || "images/placeholder.jpg";
  document.querySelector("#productImage").alt = product.Name;
  document.querySelector("#productFinalPrice").innerText = `$${product.FinalPrice.toFixed(2)}`;
  document.querySelector("#productColorName").innerText = product.Colors?.[0]?.ColorName || "N/A";
  document.querySelector("#productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
  document.querySelector("#addProductToCart").dataset.id = product.Id;
}
