import { loadHeaderFooter, getParam } from "../js/utils.mjs";
import { login } from "../js/auth.mjs";
import { initLoginButton } from "../js/loginButton.js";
initLoginButton();


loadHeaderFooter();

const redirect = getParam("redirect") || "/";

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  await login({ email, password }, redirect);
});
