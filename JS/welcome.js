// welcome.js - Simplified without loading spinner

class WelcomeAnimation {
    constructor() {
        this.logo = document.querySelector('.logo');
        this.welcomePage = document.querySelector('.welcomePage');
        this.animationTimeout = null;
        
        this.init();
    }
    
    init() {
        if (!this.logo) {
            this.redirectWithDelay(1500);
            return;
        }
        
        this.logo.style.visibility = 'visible';
        this.startAnimationSequence();
    }
    
    startAnimationSequence() {
        this.fadeInLogo();
    }
    
    fadeInLogo() {
        setTimeout(() => {
            this.logo.classList.add('fade-in');
            
            setTimeout(() => {
                this.fadeOutLogo();
            }, 1600);
            
        }, 100);
    }
    
    fadeOutLogo() {
        this.logo.classList.remove('fade-in');
        this.logo.classList.add('fade-out');
        
        setTimeout(() => {
            this.fadeOutPage();
        }, 600);
    }
    
    fadeOutPage() {
        if (this.welcomePage) {
            this.welcomePage.classList.add('fade-out');
        }
        
        // Direct redirect without loading spinner
        setTimeout(() => {
            this.redirectToHome();
        }, 600);
    }
    
    redirectToHome() {
        if (this.animationTimeout) {
            clearTimeout(this.animationTimeout);
        }
        window.location.href = "home.html";
    }
    
    redirectWithDelay(delay) {
        this.animationTimeout = setTimeout(() => {
            this.redirectToHome();
        }, delay);
    }
    
    destroy() {
        if (this.animationTimeout) {
            clearTimeout(this.animationTimeout);
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    new WelcomeAnimation();
});

// Fallback
setTimeout(() => {
    if (window.location.pathname.includes('welcome.html')) {
        window.location.href = "home.html";
    }
}, 8000);