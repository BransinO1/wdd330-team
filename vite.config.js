import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  server: {
    port: 8080,
  },

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        product: resolve(__dirname, "src/product_pages/index.html"),
        productList: resolve(__dirname, "src/product-list/index.html"),
        login: resolve(__dirname, "src/login/index.html"),
        orders: resolve(__dirname, "src/orders/index.html"),
      },
    },
  },
});
