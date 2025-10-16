// header.js - Only necessary functionality

class HeaderController {
    constructor() {
        this.init();
    }

    init() {
        this.menuButton = document.querySelector('.header-menu-button');
        this.menu = document.querySelector('.menu');
        
        if (this.menuButton && this.menu) {
            this.bindEvents();
        }
    }

    bindEvents() {
        // Menu toggle
        this.menuButton.addEventListener('click', () => {
            this.toggleMenu();
        });

        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            if (!event.target.closest('.header')) {
                this.hideMenu();
            }
        });

        // Menu item clicks - smooth scrolling to sections
        const menuLinks = document.querySelectorAll('.menu-link');
        menuLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const targetId = link.getAttribute('href');
                this.navigateToSection(targetId);
                this.hideMenu();
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.hideMenu();
            }
        });
    }

    toggleMenu() {
        if (this.menu.classList.contains('show')) {
            this.hideMenu();
        } else {
            this.showMenu();
        }
    }

    showMenu() {
        this.menu.classList.remove('hidden', 'hide');
        this.menu.classList.add('show');
    }

    hideMenu() {
        if (this.menu.classList.contains('show')) {
            this.menu.classList.remove('show');
            this.menu.classList.add('hide');
            
            // Remove hide class after animation completes
            setTimeout(() => {
                this.menu.classList.remove('hide');
                this.menu.classList.add('hidden');
            }, 500);
        }
    }

    navigateToSection(sectionId) {
        const targetElement = document.querySelector(sectionId);
        if (targetElement) {
            // Smooth scroll to section
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            console.warn(`Section ${sectionId} not found`);
            // Fallback: You can implement page navigation here if needed
        }
    }
}

// Initialize header when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HeaderController();
});