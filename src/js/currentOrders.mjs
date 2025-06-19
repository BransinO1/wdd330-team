import { getOrders } from "./externalServices.mjs";
import { getLocalStorage, alertMessage } from "./utils.mjs";

async function initOrdersPage() {
  const token = getLocalStorage("accessToken");

  if (!token) {
    alertMessage("Please log in to view your orders.");
    return;
  }

  try {
    const orders = await getOrders(token);

    if (!orders || !Array.isArray(orders) || orders.length === 0) {
      alertMessage("No orders found.");
      return;
    }

    displayOrders(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    alertMessage("Error fetching your orders. Make sure you're logged in.");
  }
}

function displayOrders(orders) {
  const container = document.querySelector("#orders-list");
  container.innerHTML = "";

  orders.forEach(order => {
    const orderElement = document.createElement("div");
    orderElement.classList.add("order");

    const orderDate = new Date(order.orderDate).toLocaleDateString();

    const itemsHtml = order.items.map(item => 
      `<li>${item.quantity} × ${item.name} ($${item.price.toFixed(2)})</li>`
    ).join("");

    orderElement.innerHTML = `
    <h3>Order Date: ${orderDate}</h3>
    <p><strong>Total:</strong> $${parseFloat(order.orderTotal || 0).toFixed(2)}</p>
    <p><strong>Shipping:</strong> $${parseFloat(order.shipping || 0).toFixed(2)}</p>
    <p><strong>Tax:</strong> $${parseFloat(order.tax || 0).toFixed(2)}</p>
    <ul><strong>Items:</strong> ${itemsHtml}</ul>
    <hr />
    `;


    container.appendChild(orderElement);
  });
}

// Initialize the orders page when the DOM is ready
document.addEventListener("DOMContentLoaded", initOrdersPage);
