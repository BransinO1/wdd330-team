// loginButton.js
export function initLoginButton() {
  const loginBtn = document.getElementById("login-button");
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      window.location.href = "/login/index.html?redirect=/orders/";
    });
  }
}
