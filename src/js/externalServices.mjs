// Previously known as productData.mjs
const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: 'servicesError', message: jsonResponse };
  }
}

// Get products by category
async function getProductsByCategory(category = "tents") {
  const response = await fetch(`${baseURL}products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

// Find product by ID
async function findProductById(id) {
  const response = await fetch(`${baseURL}product/${id}`);
  const data = await convertToJson(response);
  return data.Result;
}

// Submit checkout order
async function checkout(payload) {
  const response = await fetch(`${baseURL}checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  return convertToJson(response);
}

async function searchProducts(query) {
  const response = await fetch(`${baseURL}/products/search?q=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error("Failed to fetch search results");
  }
  const data = await response.json();
  // Adjust based on your API response shape:
  return data.Result || []; // or data.products if your API returns that
}

// Export all as one object
export default {
  getProductsByCategory,
  findProductById,
  checkout,
  searchProducts
};
