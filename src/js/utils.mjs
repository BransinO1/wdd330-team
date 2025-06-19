// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localStorage
export function getLocalStorage(key) {
  const storedData = localStorage.getItem(key);
  try {
    return storedData ? JSON.parse(storedData) : []; // Return empty array if no data exists
  } catch (error) {
    console.error(`Error parsing localStorage data for ${key}:`, error);
    return []; // Return empty array if parsing fails
  }
}

// save data to localStorage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// W03 URL Parameter
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

//W04 Render List
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlString.join(""));
}

//W05 Dynamic Header/Footer
// Function to load an HTML template from the given path
export function loadTemplate(path) {
    return async function () {
        const res = await fetch(path);
        if (res.ok) {
            const html = await res.text();
            return html;
        }
    };
}

// Export the functions used in the project
export const headerTemplateFn = loadTemplate("/partials/header.html");
export const footerTemplateFn = loadTemplate("/partials/footer.html");

// Function to load and insert the header and footer into the page
export async function loadHeaderFooter() {
    const headerEl = document.getElementById("main-header");
    const footerEl = document.getElementById("main-footer");

    const headerHTML = await headerTemplateFn();
    const footerHTML = await footerTemplateFn();

    headerEl.innerHTML = headerHTML;
    footerEl.innerHTML = footerHTML;
}

export function renderResponsiveImage(imageObj, altText = "", imgId = "productImage") {
  return `
    <picture>
      <source media="(min-width: 1024px)" srcset="${imageObj.PrimaryLarge}">
      <source media="(min-width: 600px)" srcset="${imageObj.PrimaryMedium}">
      <img
        id="${imgId}"
        src="${imageObj.PrimarySmall}"
        alt="${altText}"
      />
    </picture>
  `;
}

export function alertMessage(message, scroll = true) {
  const alert = document.createElement("div");
  alert.classList.add("alert-box");
  alert.innerHTML = `<p>${message}</p>`;
  
  const main = document.querySelector("main");
  main.prepend(alert);

  if (scroll) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  setTimeout(() => alert.remove(), 5000);
}

export function removeItem(key) {
  localStorage.removeItem(key);
}
