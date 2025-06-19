import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import { updateCartIcon } from "./superscript.js";
import { displayDiscount } from "./discountManager.js";
import { initProductDetailPage } from "./breadcrumb.js";
import { displayProductRecommendations } from "./productRecommendations.mjs";
import { initLoginButton } from "./loginButton.js";

const productId = getParam("product");

async function productDiscount(productId) {
  await productDetails(productId);
  applyDiscount();
}

function applyDiscount() {
  const priceElement = document.querySelector("#productFinalPrice");
  if (!priceElement) return;

  const priceText = priceElement.textContent;
  const originalPrice = parseFloat(priceText.replace(/[^0-9.]/g, ""));
  if (isNaN(originalPrice)) return;

  displayDiscount(originalPrice, productId);
}

// Function to load recommendations after product details are loaded
async function loadRecommendations() {
  try {
    const category = getProductCategory(); 
    
    await displayProductRecommendations(productId, category);
  } catch (error) {
    console.error("Failed to load recommendations:", error);
    // Fallback to showing random products from all categories
    try {
      await displayProductRecommendationsFromAll(productId);
    } catch (fallbackError) {
      console.error("Failed to load fallback recommendations:", fallbackError);
    }
  }
}

// Helper function to get product category
function getProductCategory() {
  // Option 1: Use stored category from initProductDetailPage
  if (currentCategory) return currentCategory;
  
  // Option 2: Get from URL parameter
  const urlCategory = getParam("category");
  if (urlCategory) return urlCategory;
  
  // Option 3: Extract from breadcrumb data if available
  const breadcrumbCategory = getBreadcrumbCategory();
  if (breadcrumbCategory) return breadcrumbCategory;
  
  // Option 4: Default category or return null to use all products
  return null;
}

// Helper to extract category from breadcrumb if available
function getBreadcrumbCategory() {
  try {
    // Look for the breadcrumb link that points back to the product list
    const breadcrumbLink = document.querySelector(".breadcrumb-item");
    if (breadcrumbLink) {
      return breadcrumbLink.textContent.trim();
    }
  } catch (error) {
    console.error("Error extracting category from breadcrumb:", error);
  }
  return null;
}

// Store category globally when initializing the page
let currentCategory = null;

// Delay init until DOM is ready
document.addEventListener("DOMContentLoaded", async () => {
  await loadHeaderFooter();
  updateCartIcon();
  await productDiscount(productId);
  setTimeout(async () => {
    await loadRecommendations();
  }, 500);
  initLoginButton();
});

// Modified to store the category globally
export function initProductDetailPageWithRecommendations(category, productName = "") {
  currentCategory = category; // Store category for recommendations
  initProductDetailPage(category, productName);
}