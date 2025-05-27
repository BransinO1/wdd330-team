import { findProductById } from "./productData.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { updateCartIcon } from './superscript.js';


let product = {};

export default async function productDetails(productId) {
  product = await findProductById(productId);
  renderProductDetails();
  document
    .getElementById("addProductToCart")
    .addEventListener("click", () => addProductToCart(product));
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


function renderProductDetails() {
  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText = product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Image;
  document.querySelector("#productImage").alt = product.Name;
  document.querySelector("#productFinalPrice").innerText = `$${product.FinalPrice.toFixed(2)}`;
  document.querySelector("#productColorName").innerText = product.Colors?.[0]?.ColorName || "N/A";
  document.querySelector("#productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
  document.querySelector("#addProductToCart").dataset.id = product.Id;
}
