// welcome-scripts.js

function initializeWelcomePage() {
    const logo = document.querySelector('.logo');
    
    // 1. Fade-in animation (replaces animateLogo())
    logo.style.visibility = 'visible';
    logo.classList.add('animate__animated', 'animate__fadeInDown');
    
    logo.addEventListener('animationend', () => {
        logo.classList.remove('animate__animated', 'animate__fadeInDown');
    });

    // 2. After 1 second, fade-out and redirect (replaces fadeOutToHome())
    setTimeout(() => {
        logo.classList.add('animate__animated', 'animate__fadeOut');
        
        logo.addEventListener('animationend', () => {
            logo.classList.remove('animate__animated', 'animate__fadeOut');
            // Redirect to home page (adjust path as needed)
            window.location.href = "home.html"; 
        }, { once: true });
    }, 1000);
}

// Wait for DOM to load before executing
document.addEventListener('DOMContentLoaded', initializeWelcomePage);