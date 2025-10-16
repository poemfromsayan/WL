// headerLoader.js - Loads the header HTML into the page
document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
});

function loadHeader() {
    const headerContainer = document.getElementById('headerContainer');
    if (!headerContainer) return;

    fetch('components/header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Header HTML not found');
            }
            return response.text();
        })
        .then(html => {
            headerContainer.innerHTML = html;
            // HeaderController will auto-initialize via its DOMContentLoaded listener
        })
        .catch(error => {
            console.error('Error loading header:', error);
            headerContainer.innerHTML = '<p>Header loading failed</p>';
        });
}