/* functions */

/* Variables */
const date = new Date();




/* Footer */
const lastUpdated = document.querySelector('#lastUpdated');
lastUpdated.textContent = `Last Updated: ${formatDate(new Date(document.lastModified), 'other')}`

const footerYear = document.querySelector('#footerYear');
footerYear.textContent = date.getFullYear();