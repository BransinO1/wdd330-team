import { getLocalStorage, renderListWithTemplate, setLocalStorage } from "./utils.mjs";
import { updateCartIcon } from './superscript.js';

// Default export for the shopping cart
export default function shoppingCart() {
  renderCartContents();
}

// Function to render the cart contents
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const outputEl = document.querySelector(".product-list");

  // If there are no items in the cart, display a message
  if (cartItems.length === 0) {
    outputEl.innerHTML = "<p>Your cart is empty.</p>";
    document.querySelector(".cart-total").innerHTML = "$0.00"; // Ensure the total is $0 when empty
    return;
  }

  // Group items by product and render the cart
  const groupedCartItems = groupItemsByProduct(cartItems);
  renderListWithTemplate(cartItemTemplate, outputEl, groupedCartItems);  // This function is now properly imported

  // Update the total
  document.querySelector(".cart-total").innerHTML = computeTotal(cartItems);

  // Attach event listeners for remove buttons after rendering
  attachRemoveItemListeners();
}

// Function to group items by product and calculate total quantities
function groupItemsByProduct(cartItems) {
  const groupedItems = {};

  cartItems.forEach(item => {
    if (groupedItems[item.Id]) {
      // If the item already exists, add to the quantity
      groupedItems[item.Id].Quantity += item.Quantity;
    } else {
      // If it's a new item, add it to the groupedItems with an initial quantity
      groupedItems[item.Id] = { ...item, Quantity: item.Quantity || 1 };
    }
  });

  return Object.values(groupedItems); // Convert to an array
}

// Template for each grouped cart item
function cartItemTemplate(item) {
  const itemQuantity = item.Quantity || 1;
  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}" />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0]?.ColorName || "No color"}</p>
      <p class="cart-card__quantity">Qty: ${itemQuantity}</p>
      <p class="cart-card__price">$${(item.FinalPrice * itemQuantity).toFixed(2)}</p>
      <button class="remove-item" data-id="${item.Id}">Remove</button> <!-- Add Remove button -->
    </li>
  `;
}

// Function to calculate the total price
function computeTotal(cartItems) {
  if (cartItems.length === 0) return "$0.00";

  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.FinalPrice);
    const quantity = item.Quantity || 1;
    return sum + price * quantity;
  }, 0);

  return `$${total.toFixed(2)}`;
}

// Function to remove an item from the cart
function removeItemFromCart(productId) {
  let cartItems = getLocalStorage("so-cart") || [];

  const itemIndex = cartItems.findIndex(item => item.Id === productId);
  if (itemIndex > -1) {
    if (cartItems[itemIndex].Quantity > 1) {
      cartItems[itemIndex].Quantity -= 1;  // Decrease quantity if greater than 1
    } else {
      cartItems.splice(itemIndex, 1);  // Remove the item completely
    }
    
    // Save the updated cart to localStorage
    setLocalStorage("so-cart", cartItems);
    renderCartContents();
    updateCartIcon();
  }
}

// Attach event listeners to the remove buttons
function attachRemoveItemListeners() {
  const removeButtons = document.querySelectorAll(".remove-item");
  removeButtons.forEach(button => {
    button.addEventListener("click", (event) => {
      const productId = event.target.dataset.id;
      console.log("Remove button clicked for product ID:", productId);  // Log productId
      removeItemFromCart(productId); // Remove the item from the cart
    });
  });
}
