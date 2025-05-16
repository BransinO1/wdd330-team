// Import the necessary function to get the data
import { getData } from './productData.mjs';
import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Image}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.NameWithoutBrand}</h2>
    <p class="product-card__price">$${product.FinalPrice}</p></a>
  </li>`;
}

export default async function productList(selector, category) {
  // get the element we will insert the list into from the selector
  const el = document.querySelector(selector);
  // get the list of products
  const products = await getData(category);
  //limit product list to 4 current ones W04
  const allowedProductIds = [
    "880RR",
    "985RF",
    "985PR",
    "344YJ",
  ];
  const filteredProducts = products.filter(product => allowedProductIds.includes(product.Id));
  console.log(filteredProducts);
  // render out the product list to the element
  renderListWithTemplate(productCardTemplate, el, filteredProducts);
}