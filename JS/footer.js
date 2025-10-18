// footer.js - Only necessary functionality

class FooterController {
    constructor() {
        this.init();
    }

    init() {
        this.updateCopyrightYear();
        this.bindEvents();
    }

    updateCopyrightYear() {
        const copyrightElement = document.getElementById('copyrightYear');
        if (copyrightElement) {
            const currentYear = new Date().getFullYear();
            copyrightElement.textContent = `© ${currentYear} WhiteLabel. All rights reserved.`;
        }
    }

    bindEvents() {
        // Handle internal link clicks for smooth scrolling
        const internalLinks = document.querySelectorAll('.footer-link[href^="#"]');
        internalLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                const href = link.getAttribute('href');
                if (href && href !== '#') {
                    event.preventDefault();
                    this.scrollToSection(href);
                }
            });
        });

        // Add loading states for external links
        const externalLinks = document.querySelectorAll('.footer-link[href^="http"]');
        externalLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                // You could add analytics or loading indicators here
                console.log('Navigating to external link:', link.href);
            });
        });
    }

    scrollToSection(sectionId) {
        const targetElement = document.querySelector(sectionId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

// Initialize footer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FooterController();
});