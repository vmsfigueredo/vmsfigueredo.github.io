const lastUpdated = document.querySelector('#lastUpdated');
lastUpdated.textContent = `Last Updated: ${document.lastModified}`

const footerYear = document.querySelector('#footerYear');
footerYear.textContent = new Date().getFullYear();