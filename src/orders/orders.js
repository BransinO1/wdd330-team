import { loadHeaderFooter } from "../js/utils.mjs";
import { checkLogin } from "../js/auth.mjs";
import { getOrders } from "../js/externalServices.mjs";
import { initLoginButton } from "../js/loginButton.js";
initLoginButton();


async function main() {
  await loadHeaderFooter();

  const token = checkLogin();
  if (!token) {
    window.location.href = "/login/index.html";
    return;
  }

  try {
    const orders = await getOrders(token);
    displayOrders(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    const list = document.querySelector(".order-list");
    if (list) {
      list.innerHTML = "<p>Failed to load orders. Please log in again.</p>";
    }
  }
}
main();


function renderOrders(orders) {
  const list = document.querySelector(".order-list");
  if (!orders || orders.length === 0) {
    list.innerHTML = "<p>No orders found.</p>";
    return;
  }

  list.innerHTML = orders.map(order => {
    const itemCount = order.items ? order.items.length : 0;
    const orderTotal = parseFloat(order.orderTotal || 0).toFixed(2);
    return `
      <li>
        <strong>Order #${order.id}</strong><br>
        ${itemCount} item${itemCount !== 1 ? "s" : ""}<br>
        Total: $${orderTotal}
      </li>
    `;
  }).join("");
}

main();