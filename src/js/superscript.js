export function updateCartIcon() {
  const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
  const totalQuantity = cartItems.reduce((total, item) => total + (item.Quantity || 0), 0);

  const cartItemCount = document.querySelector(".cart-item-count");
  
  if (cartItemCount) {
    if (totalQuantity > 0) {
      cartItemCount.textContent = totalQuantity;
      cartItemCount.style.display = "inline";
    } else {
      cartItemCount.style.display = "none";
    }
  }
}




export function computeTotalQuantity(cartItems) {
  if (cartItems.length === 0) return 0;

  return cartItems.reduce((sum, item) => {
    const quantity = item.Quantity || 1;
    return sum + quantity;
  }, 0);
}