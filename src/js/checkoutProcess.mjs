import externalServices from "./externalServices.mjs";

let checkoutProcess = {
  cart: [],
  total: 0,
  itemCount: 0,
  tax: 0,
  shipping: 0,
  orderTotal: 0,
  outputSelector: "",

  init(localStorageKey, outputSelector) {
    this.cart = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    this.outputSelector = outputSelector;
    this.calculateSubtotal();
  },

  calculateSubtotal() {
    this.itemCount = this.cart.reduce((acc, item) => acc + (item.Quantity || 1), 0);
    this.total = this.cart.reduce((acc, item) => acc + item.FinalPrice * (item.Quantity || 1), 0);
    document.querySelector("#subtotal").textContent = `$${this.total.toFixed(2)}`;
    document.querySelector("#item-count").textContent = this.itemCount;
  },

  calculateOrderTotals(zip) {
    this.shipping = 10 + (this.itemCount - 1) * 2;
    this.tax = this.total * 0.06;
    this.orderTotal = this.total + this.shipping + this.tax;

    document.querySelector("#shipping").textContent = `$${this.shipping.toFixed(2)}`;
    document.querySelector("#tax").textContent = `$${this.tax.toFixed(2)}`;
    document.querySelector("#order-total").textContent = `$${this.orderTotal.toFixed(2)}`;
  },

  packageItems() {
    return this.cart.map(item => ({
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: item.Quantity || 1
    }));
  },

  async checkout(form) {
    const formData = new FormData(form);
    const order = {
      orderDate: new Date().toISOString(),
      fname: formData.get("fname"),
      lname: formData.get("lname"),
      street: formData.get("address"),
      city: formData.get("city"),
      state: formData.get("state"),
      zip: formData.get("zip"),
      cardNumber: formData.get("ccnum"),
      expiration: formData.get("exp"),
      code: formData.get("code"),
      items: this.packageItems(),
      orderTotal: this.orderTotal.toFixed(2),
      shipping: this.shipping,
      tax: this.tax.toFixed(2)
    };

    const response = await externalServices.checkout(order);
    return response;
  }
};

export default checkoutProcess;
