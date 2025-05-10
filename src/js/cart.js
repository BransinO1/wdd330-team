import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];

  if (cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  document.querySelector(".cart-total").innerHTML = computeTotal()
  return newItem;
}

function computeTotal() {
  // Get cart items from local storage
  const cartItems = getLocalStorage("so-cart") || [];
  
  // If cart is empty, return $0.00
  if (cartItems.length === 0) {
    return "$0.00";
  }
  
  // Calculate total by adding up all item prices
  const total = cartItems.reduce((sum, item) => {
    // Get the price from the FinalPrice property
    const price = parseFloat(item.FinalPrice);
    return sum + price;
  }, 0);
  
  // Format the total to 2 decimal places and add $ sign
  return `$${total.toFixed(2)}`;
}

renderCartContents();
