// global-transitions.js - Handles smooth transitions for all pages

class PageTransitions {
    constructor() {
        this.init();
    }
    
    init() {
        // Check if we're coming from another page (not a refresh)
        this.handlePageEntrance();
        
        // Set up link interception for future navigation
        this.setupLinkInterception();
    }
    
    handlePageEntrance() {
        const body = document.body;
        const loadingSpinner = document.querySelector('.page-loading');
        
        // If there's a loading spinner, fade it out and reveal page
        if (loadingSpinner) {
            setTimeout(() => {
                loadingSpinner.classList.add('fade-out');
                
                setTimeout(() => {
                    loadingSpinner.remove();
                    body.classList.add('loaded');
                }, 400);
                
            }, 300);
        } else {
            // No spinner, just fade in the page
            setTimeout(() => {
                body.classList.add('loaded');
            }, 100);
        }
    }
    
    setupLinkInterception() {
        // Intercept all internal link clicks for smooth transitions
        document.addEventListener('click', (event) => {
            const link = event.target.closest('a');
            
            if (link && link.href && this.isInternalLink(link)) {
                event.preventDefault();
                this.navigateTo(link.href);
            }
        });
    }
    
    isInternalLink(link) {
        return link.hostname === window.location.hostname && 
               !link.hash && // Don't intercept anchor links
               !link.getAttribute('target') && // Don't intercept links with targets
               !link.download; // Don't intercept download links
    }
    
    navigateTo(url) {
        // Show loading spinner
        this.showLoadingSpinner();
        
        // Fade out current page
        document.body.classList.remove('loaded');
        
        // Wait for fade out, then navigate
        setTimeout(() => {
            window.location.href = url;
        }, 500);
    }
    
    showLoadingSpinner() {
        const loadingSpinner = document.createElement('div');
        loadingSpinner.className = 'page-loading';
        loadingSpinner.innerHTML = '<div class="loading-spinner"></div>';
        document.body.appendChild(loadingSpinner);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    new PageTransitions();
});