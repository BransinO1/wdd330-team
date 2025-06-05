// Import the necessary function to get the data
import { getData } from './productData.mjs';
import { renderListWithTemplate } from './utils.mjs';
import { calculateDiscount } from './discountManager.js';

function productCardTemplate(product) {
   // Calculate discount for this product
  const discountResult = calculateDiscount(product.FinalPrice, product.Id);
  
  let priceHtml;
  if (discountResult.hasDiscount) {
    priceHtml = `
      <div class="discount-display">
        <span class="discounted-price">$${discountResult.discountedPrice.toFixed(2)}</span>
        <span class="discount-badge">${discountResult.percentage}% OFF</span>
      </div>
    `;
  } else {
    priceHtml = `$${discountResult.originalPrice.toFixed(2)}`;
  }
  return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Image}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.NameWithoutBrand}</h2>
    <p class="product-card__price">${priceHtml}</p></a>
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