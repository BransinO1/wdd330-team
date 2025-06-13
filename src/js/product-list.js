// import { updateCartIcon } from "./superscript.js";
// import { loadHeaderFooter, getParam } from "./utils.mjs";
// import productList from "./productList.mjs";

// document.addEventListener("DOMContentLoaded", async () => {
//   await loadHeaderFooter();
//   updateCartIcon();

//   const category = getParam("category") || "tents";

//   const titleElement = document.querySelector(".category-title");
//   if (titleElement) {
//     const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
//     titleElement.textContent = `Top Products: ${capitalizedCategory}`;
//   }

//   productList(".product-list", category);
// });

import { updateCartIcon } from "./superscript.js";
import { loadHeaderFooter, getParam } from "./utils.mjs";
import productList from "./productList.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeaderFooter();
  updateCartIcon();

  const category = getParam("category") || "tents";
  const sortSelect = document.getElementById("sort-select");
  let sortBy = getParam("sort") || "name-asc";  // ✅ Updated to match dropdown values

  // Set the dropdown to the current sort option
  if (sortSelect) {
    sortSelect.value = sortBy;
  }

  const titleElement = document.querySelector(".category-title");
  if (titleElement) {
    const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
    titleElement.textContent = `Top Products: ${capitalizedCategory}`;
  }

  // Load the initial product list
  await productList(".product-list", category, sortBy);

  // Handle sort changes
  sortSelect?.addEventListener("change", async (e) => {
    sortBy = e.target.value;
    await productList(".product-list", category, sortBy);
    // Update the URL without reloading
    const newUrl = new URL(window.location);
    newUrl.searchParams.set("sort", sortBy);
    window.history.replaceState({}, "", newUrl);
  });
  document.querySelector(".product-list").addEventListener("click", async (e) => {
  if (e.target.classList.contains("quick-view-btn")) {
    const productId = e.target.getAttribute("data-product-id");
    const modal = document.getElementById("quick-view-modal");
    const modalContent = document.getElementById("modal-product-details");

    // Fetch product details (reuse your externalServices.getProductById)
    const product = await import("./externalServices.mjs").then(mod => mod.default.findProductById(productId));

    const imageUrl = product.Images && product.Images.PrimaryLarge
      ? product.Images.PrimaryLarge
      : "default-image.jpg";  // fallback if no image

    modalContent.innerHTML = `
      <h2>${product.Name}</h2>
      <div>${product.DescriptionHtmlSimple || "<p>No description available.</p>"}</div>
      <img src="${imageUrl}" alt="${product.Name}">
      <p>Price: $${product.FinalPrice}</p>
      <button id="buy-now-btn" class="buy-now-btn" data-product-id="${productId}">Buy Now</button>
    `;
    modal.classList.remove("hidden");
    modalContent.querySelector("#buy-now-btn").addEventListener("click", () => {
    const id = productId;
    const productPageUrl = `http://localhost:8080/product_pages/index.html?product=${id}`;
    window.location.href = productPageUrl;
});

  }
});

// For quick view modal
document.getElementById("close-quickview").addEventListener("click", () => {
  document.getElementById("quick-view-modal").classList.add("hidden");
});
});
