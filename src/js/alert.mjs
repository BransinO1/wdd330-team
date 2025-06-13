export default async function loadAlerts(jsonPath = "/json/alerts.json") {
  try {
    const response = await fetch(jsonPath);
    if (!response.ok) throw new Error("Failed to load alerts.");

    const alerts = await response.json();

    if (alerts.length > 0) {
      const section = document.createElement("section");
      section.classList.add("alert-list");

      alerts.forEach(alert => {
        const alertElement = document.createElement("p");
        alertElement.textContent = alert.message;
        alertElement.style.backgroundColor = alert.background || "black";
        alertElement.style.color = alert.color || "white";
        alertElement.style.padding = "1em";
        alertElement.style.marginBottom = "0.5em";
        alertElement.style.borderRadius = "5px";

        section.appendChild(alertElement);
      });

      const main = document.querySelector("main");
      if (main) {
        main.prepend(section);
      } else {
        console.warn("Main element not found to prepend alerts.");
      }
    }
  } catch (error) {
    console.error("Error loading alerts:", error);
  }
}
