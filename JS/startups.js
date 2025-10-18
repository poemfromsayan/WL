// startups.js - Page initialization and animations
class StartupsPage {
    constructor() {
        this.init();
    }

    init() {
        this.animateEntrance();
        console.log('Startups page initialized');
    }

    animateEntrance() {
        const page = document.querySelector('.startupsPage');
        if (page) {
            // Add entrance animation
            page.classList.add('animate__animated', 'animate__fadeIn');
            
            page.addEventListener('animationend', () => {
                page.classList.remove('animate__animated', 'animate__fadeIn');
                page.classList.add('loaded');
            }, { once: true });
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    new StartupsPage();
});