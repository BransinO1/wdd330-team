import { jwtDecode } from "jwt-decode";
import { getLocalStorage, setLocalStorage, removeItem } from "./utils.mjs";
import { loginRequest } from "./externalServices.mjs";

const tokenKey = "so_token";

export async function login(credentials, redirect) {
  try {
    const token = await loginRequest(credentials);
    setLocalStorage("accessToken", token);
    window.location.href = redirect;
  } catch (err) {
    console.error("Login failed:", err);
    alert("Login failed. Please check your email and password.");
  }
}

export function isTokenValid(token) {
  if (!token) return false;
  const decoded = jwtDecode(token);
  const now = Date.now() / 1000;
  return decoded.exp > now;
}

export function checkLogin() {
  const token = getLocalStorage("accessToken");

  if (!token || typeof token !== "string") {
    console.warn("No token found or token is invalid type");
    return false;
  }

  try {
    const decoded = jwtDecode(token);
    const exp = decoded.exp * 1000;
    return Date.now() < exp;
  } catch (err) {
    console.error("Invalid token:", err);
    return false;
  }
}

