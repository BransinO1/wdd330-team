import { calculateDiscount } from './discountManager.js';

export default function cartItemTemplate(item) {
  const itemQuantity = item.Quantity || 1;
  const discount = calculateDiscount(item.FinalPrice, item.Id);
  
  let priceHtml;
  if (discount.hasDiscount) {
    priceHtml = `
      <p class="cart-card__price">
        <span class="original-price" style="text-decoration: line-through;">$${(item.FinalPrice * itemQuantity).toFixed(2)}</span><br>
        <span class="discounted-price">$${(discount.discountedPrice * itemQuantity).toFixed(2)}</span>
        <span class="discount-badge">${discount.percentage}% OFF</span>
      </p>
    `;
  } else {
    priceHtml = `<p class="cart-card__price">$${(item.FinalPrice * itemQuantity).toFixed(2)}</p>`;
  }

  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${item.Image || item.Images?.PrimarySmall || 'images/placeholder.jpg'}" alt="${item.Name}" />
      </a>
      <div class="cart-card__info">
        <a href="#"><h2 class="card__name">${item.Name}</h2></a>
        <p class="cart-card__color">${item.Colors[0]?.ColorName || "No color"}</p>
      </div>
      <div class="cart-card__right">
        <label for="qty-${item.Id}">Qty:</label>
        <input 
          type="number" 
          class="quantity-input" 
          id="qty-${item.Id}" 
          data-id="${item.Id}" 
          value="${itemQuantity}" 
          min="1"
        />
        ${priceHtml}
        <button class="remove-item" data-id="${item.Id}">Remove</button>
      </div>
    </li>
  `;
}