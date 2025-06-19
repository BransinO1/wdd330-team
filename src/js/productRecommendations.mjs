import { getProductsByCategory } from "./externalServices.mjs";

export async function displayProductRecommendations(currentProductId, category) {
  try {
    // Get all products in the same category
    const allProducts = await getProductsByCategory(category);
    
    // Filter out the current product
    const otherProducts = allProducts.filter(product => product.Id !== currentProductId);
    
    // Randomly select 2-3 products
    const recommendationCount = Math.floor(Math.random() * 2) + 2; // 2 or 3
    const recommendations = getRandomProducts(otherProducts, recommendationCount);
    
    // Display recommendations
    renderRecommendations(recommendations);
  } catch (error) {
    console.error("Error displaying product recommendations:", error);
  }
}

function getRandomProducts(products, count) {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, products.length));
}

function renderRecommendations(products) {
  if (products.length === 0) return;
  
  // Create recommendations section
  const recommendationsSection = createRecommendationsSection();
  
  // Add each product
  products.forEach(product => {
    const productCard = createProductCard(product);
    recommendationsSection.querySelector('.recommendations-grid').appendChild(productCard);
  });
  
  // Insert after the main product section
  const mainSection = document.querySelector('.product-detail');
  mainSection.parentNode.insertBefore(recommendationsSection, mainSection.nextSibling);
}

function createRecommendationsSection() {
  const section = document.createElement('section');
  section.className = 'product-recommendations';
  section.innerHTML = `
    <div class="recommendations-container">
      <h3 class="recommendations-title">You might also like</h3>
      <div class="recommendations-grid"></div>
    </div>
  `;
  return section;
}

function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'recommendation-card';
  
  const productUrl = `../product_pages/index.html?product=${product.Id}`;
  const imageUrl = product.Images?.PrimaryMedium || product.Images?.PrimaryLarge || product.Images?.PrimarySmall || '';
  const price = product.FinalPrice || product.SuggestedRetailPrice || 0;
  const productName = product.NameWithoutBrand || product.Name || 'Unknown Product';
  
  card.innerHTML = `
    <a href="${productUrl}" class="recommendation-link">
      <div class="recommendation-image">
        <img src="${imageUrl}" alt="${productName}" loading="lazy">
      </div>
      <div class="recommendation-info">
        <h4 class="recommendation-name">${productName}</h4>
        <p class="recommendation-price">${price.toFixed(2)}</p>
      </div>
    </a>
  `;
  
  return card;
}