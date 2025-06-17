function hideBreadcrumb() {
    const breadcrumb = document.getElementById('breadcrumb');
    if (breadcrumb) {
        breadcrumb.classList.add('hidden');
    }
}

function showBreadcrumb(content) {
    const breadcrumb = document.getElementById('breadcrumb');
    const breadcrumbContent = document.getElementById('breadcrumb-content');
    
    if (breadcrumb && breadcrumbContent) {
        breadcrumbContent.innerHTML = content;
        breadcrumb.classList.remove('hidden');
    }
}

function createBreadcrumbForProductList(category, itemCount) {
    return `<span class="breadcrumb-current">${category} <span class="breadcrumb-separator">→</span> (${itemCount} items)</span>`;
}

function createBreadcrumbForProductDetail(category, productName = '') {
    if (productName) {
        return `
            <a href="/product-list.html?category=${encodeURIComponent(category)}" class="breadcrumb-item">${category}</a>
            <span class="breadcrumb-separator">→</span>
            <span class="breadcrumb-current">${productName}</span>
        `;
    } else {
        return `<span class="breadcrumb-current">${category}</span>`;
    }
}

// Page-specific initialization functions
function initHomePage() {
    hideBreadcrumb();
}

function initProductListPage(category, itemCount) {
    const breadcrumbContent = createBreadcrumbForProductList(category, itemCount);
    showBreadcrumb(breadcrumbContent);
}

function initProductDetailPage(category, productName = '') {
    const breadcrumbContent = createBreadcrumbForProductDetail(category, productName);
    showBreadcrumb(breadcrumbContent);
}

// Export functions if using modules
export { 
    hideBreadcrumb, 
    showBreadcrumb, 
    initHomePage, 
    initProductListPage, 
    initProductDetailPage 
};