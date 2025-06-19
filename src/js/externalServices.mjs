const baseURL = import.meta.env.VITE_SERVER_URL;

// --- Helper to convert fetch response to JSON with error handling ---
async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: "servicesError", message: jsonResponse };
  }
}

// --- Product-related services ---
async function getProductsByCategory(category = "tents") {
  const response = await fetch(`${baseURL}products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

async function findProductById(id) {
  const response = await fetch(`${baseURL}product/${id}`);
  const data = await convertToJson(response);
  return data.Result;
}

async function checkout(payload) {
  const response = await fetch(`${baseURL}checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return convertToJson(response);
}

async function searchProducts(query) {
  const response = await fetch(`${baseURL}products/search?q=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error("Failed to fetch search results");
  }
  const data = await response.json();
  return data.Result || [];
}

// --- Auth & Order services (hardcoded base URL for now) ---
const authBase = "http://server-nodejs.cit.byui.edu:3000";

async function loginRequest(creds) {
  const response = await fetch(`${authBase}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(creds),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data);
  return data.accessToken;
}

async function getOrders(token) {
  if (!token) throw new Error("No token provided");
  const response = await fetch("http://server-nodejs.cit.byui.edu:3000/orders", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (!response.ok) {
    throw new Error("Unauthorized or failed to fetch orders.");
  }
  return await response.json();
}


// --- Exports ---
export default {
  getProductsByCategory,
  findProductById,
  checkout,
  searchProducts,
  loginRequest,
  getOrders,
};

export {
  getProductsByCategory,
  findProductById,
  checkout,
  searchProducts,
  loginRequest,
  getOrders,
};
