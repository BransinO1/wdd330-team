// Previously known as productData.mjs
const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
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

// Export all as one object
export default {
  getProductsByCategory,
  findProductById,
  checkout
};
