// consultations.js - Calendly integration and page initialization
class ConsultationsPage {
    constructor() {
        this.calendlyLoaded = false;
        this.calendlyRetries = 0;
        this.maxRetries = 5;
        this.loadingTimeout = null;
        this.init();
    }

    init() {
        this.animateEntrance();
        this.initCalendly();
        this.setupLoadingTimeout();
        console.log('Consultations page initialized');
    }

    animateEntrance() {
        const page = document.querySelector('.consultationsPage');
        if (page) {
            page.classList.add('loaded');
        }
    }

    setupLoadingTimeout() {
        // Set timeout for 5 minutes (300,000 milliseconds)
        this.loadingTimeout = setTimeout(() => {
            // Only show fallback if Calendly hasn't loaded yet
            if (!this.calendlyLoaded) {
                this.showFallback();
            }
        }, 300000); // 5 minutes = 300,000 ms
    }

    initCalendly() {
        // Check if Calendly is already loaded
        if (typeof Calendly !== 'undefined' && Calendly.initInlineWidgets) {
            this.initializeCalendlyWidget();
        } else {
            // Wait for Calendly to load, then initialize
            this.waitForCalendly();
        }
    }

    waitForCalendly() {
        if (this.calendlyRetries < this.maxRetries) {
            this.calendlyRetries++;
            
            if (typeof Calendly !== 'undefined' && Calendly.initInlineWidgets) {
                this.initializeCalendlyWidget();
            } else {
                // Try again after delay
                setTimeout(() => this.waitForCalendly(), 500 * this.calendlyRetries);
            }
        } else {
            // Max retries reached, but DON'T show fallback immediately
            // Let the 5-minute timeout handle it
            console.log('Calendly retries exhausted, waiting for timeout');
        }
    }

    initializeCalendlyWidget() {
        try {
            Calendly.initInlineWidgets();
            this.calendlyLoaded = true;
            
            // Clear the 5-minute timeout since Calendly loaded successfully
            if (this.loadingTimeout) {
                clearTimeout(this.loadingTimeout);
            }
            
            // Hide fallback message if it was shown
            const fallback = document.querySelector('.calendly-fallback');
            if (fallback) {
                fallback.classList.add('hidden');
            }
            
            console.log('Calendly widget initialized successfully');
        } catch (error) {
            console.error('Calendly initialization failed:', error);
            // Don't show fallback immediately, let timeout handle it
        }
    }

    showFallback() {
        const fallback = document.querySelector('.calendly-fallback');
        if (fallback) {
            fallback.classList.remove('hidden');
            
            // Add direct link as fallback
            if (!document.querySelector('.calendly-direct-link')) {
                const directLink = document.createElement('a');
                directLink.href = "https://calendly.com/may-whitelabel/discovery-call";
                directLink.target = "_blank";
                directLink.rel = "noopener";
                directLink.innerText = "Click here to book directly on Calendly";
                directLink.className = "calendly-direct-link";
                directLink.style.display = "block";
                directLink.style.marginTop = "10px";
                directLink.style.color = "#0069ff";
                directLink.style.textDecoration = "underline";
                fallback.appendChild(directLink);
            }
        }
    }

    // Optional: Method to update consultant info if needed
    updateConsultantInfo(newName, newTitle) {
        const nameElement = document.querySelector('.consultant-name');
        const titleElement = document.querySelector('.consultant-title');
        
        if (nameElement) nameElement.textContent = newName;
        if (titleElement) titleElement.textContent = newTitle;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    new ConsultationsPage();
});