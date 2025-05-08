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
