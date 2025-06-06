import externalServices from "./externalServices.mjs";
import { renderListWithTemplate } from './utils.mjs';
import { calculateDiscount } from './discountManager.js';
import { renderResponsiveImage } from "./utils.mjs";

function productCardTemplate(product) {
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

  console.log("Images:", product.Images);
  const imageHtml = renderResponsiveImage(product.Images, product.Name);

  return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
      ${imageHtml}
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">${priceHtml}</p>
    </a>
  </li>`;
}

export default async function productList(selector, category) {
  const el = document.querySelector(selector);
  const products = await externalServices.getProductsByCategory (category);

  renderListWithTemplate(productCardTemplate, el, products);
}
