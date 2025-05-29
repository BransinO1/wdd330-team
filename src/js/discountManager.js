// Store discounts in memory
const discounts = {
  "985PR": {
    percentage: 15,
    label: "Spring Sale"
  },
  "344YJ": {
    percentage: 10,
    label: "Spring Sale"
  },
  "880RR": {
    percentage: 10,
    label: "Flash Sale"
  }
};

// Create a discount
function createDiscount(productId, percentage, label) {
  discounts[productId] = {
    percentage: percentage,
    label: label
  };
}

// Calculate discounted price
function calculateDiscount(originalPrice, productId) {
  const discount = discounts[productId];
  if (!discount) return { hasDiscount: false, originalPrice };
  
  const savings = originalPrice * (discount.percentage / 100);
  const discountedPrice = originalPrice - savings;
  
  return {
    hasDiscount: true,
    originalPrice,
    discountedPrice,
    savings,
    percentage: discount.percentage,
    label: discount.label
  };
}

// Display discount on the page
function displayDiscount(originalPrice, productId) {
  const priceElement = document.querySelector(".product-card__price");
  if (!priceElement) return;
  
  const result = calculateDiscount(originalPrice, productId);
  
  if (result.hasDiscount) {
    priceElement.innerHTML = `
      <div class="discount-display">
        <span class="original-price">$${result.originalPrice.toFixed(2)}</span>
        <span class="discounted-price">($${result.discountedPrice.toFixed(2)})</span>
        <span class="discount-badge">${result.percentage}% OFF</span>
        <span class="savings">You save $${result.savings.toFixed(2)}!</span>
      </div>
    `;
  } else {
    priceElement.innerHTML = `$${result.originalPrice.toFixed(2)}`;
  }
}

// Export functions
export { createDiscount, displayDiscount, calculateDiscount };