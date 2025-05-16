import productList from './productList.mjs';

// Call productList with the correct parameters
document.addEventListener('DOMContentLoaded', () => {
    // For example, render products of category 'tents' in the element with class 'product-list'
    productList('.product-list', 'tents');
});
