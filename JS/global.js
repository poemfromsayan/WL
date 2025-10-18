// global.js - Funciones globales para todo el sitio

// Favicon dinámico para dark/light mode
function setFavicon() {
    const favicon = document.getElementById('favicon');
    if (!favicon) return;
    
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    favicon.href = isDark 
        ? '../../ASSETS/IMG/WLicon1.png'  // Icono para dark mode
        : '../../ASSETS/IMG/WLicon2.png'; // Icono para light mode
    
    console.log('Favicon set for:', isDark ? 'dark mode' : 'light mode');
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    setFavicon();
});

// Escuchar cambios en la preferencia de color
window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', setFavicon);