// crisis.js - Page initialization
class CrisisPage {
    constructor() {
        this.init();
    }

    init() {
        this.animateEntrance();
        console.log('Crisis page initialized');
    }

    animateEntrance() {
        const page = document.querySelector('.crisisPage');
        if (page) {
            setTimeout(() => {
                page.classList.add('loaded');
            }, 100);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    new CrisisPage();
});