// map.js - WITH DEBUGGING
class MapComponent {
    constructor(containerId) {
        console.log('🔍 MapComponent constructor called for:', containerId);
        
        this.container = document.getElementById(containerId);
        this.map = null;
        this.marker = null;
        this.isLeafletLoaded = false;
        this.defaultLocation = { lat: 26.168958, lng: -80.252714 };
        this.observer = null;
        
        if (this.container) {
            console.log('✅ Map container found');
            this.init();
        } else {
            console.error('❌ Map container not found:', containerId);
        }
    }

    init() {
        console.log('🔧 Setting up IntersectionObserver...');
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                console.log('👀 Intersection observed - isIntersecting:', entry.isIntersecting);
                if (entry.isIntersecting) {
                    console.log('🎯 Map is visible! Loading Leaflet...');
                    this.renderMap(this.defaultLocation);
                    this.observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        this.observer.observe(this.container);
        console.log('✅ IntersectionObserver setup complete');
    }

    renderMap(location) {
        console.log('🗺️ renderMap called, Leaflet loaded:', this.isLeafletLoaded);
        
        if (this.isLeafletLoaded) {
            this.initMap(location);
            return;
        }

        console.log('📦 Loading Leaflet resources...');
        this.loadLeafletResources()
            .then(() => {
                console.log('✅ Leaflet resources loaded successfully');
                this.isLeafletLoaded = true;
                this.initMap(location);
            })
            .catch(error => {
                console.error('❌ Failed to load Leaflet:', error);
                this.showError();
            });
    }

    loadLeafletResources() {
        return new Promise((resolve, reject) => {
            // Check if Leaflet CSS is already loaded
            if (document.querySelector('link[href*="leaflet"]')) {
                console.log('✅ Leaflet CSS already loaded');
                this.checkLeafletJS(resolve, reject);
                return;
            }

            console.log('📥 Loading Leaflet CSS...');
            // Load Leaflet CSS
            const cssLink = document.createElement('link');
            cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            cssLink.rel = 'stylesheet';
            cssLink.onload = () => {
                console.log('✅ Leaflet CSS loaded');
                this.checkLeafletJS(resolve, reject);
            };
            cssLink.onerror = () => {
                console.error('❌ Failed to load Leaflet CSS');
                reject(new Error('Failed to load Leaflet CSS'));
            };
            document.head.appendChild(cssLink);
        });
    }

    checkLeafletJS(resolve, reject) {
        // Check if Leaflet JS is already loaded
        if (typeof L !== 'undefined') {
            console.log('✅ Leaflet JS already loaded');
            resolve();
            return;
        }

        console.log('📥 Loading Leaflet JS...');
        // Load Leaflet JS
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.onload = () => {
            console.log('✅ Leaflet JS loaded successfully');
            // Wait a bit for Leaflet to initialize
            setTimeout(resolve, 100);
        };
        script.onerror = () => {
            console.error('❌ Failed to load Leaflet JS');
            reject(new Error('Failed to load Leaflet JS'));
        };
        document.head.appendChild(script);
    }

    initMap(location) {
        console.log('🗺️ Initializing Leaflet map...');
        try {
            // Remove placeholder
            const placeholder = this.container.querySelector('.map-placeholder');
            if (placeholder) {
                placeholder.style.display = 'none';
                console.log('✅ Placeholder hidden');
            }

            // Initialize map
            this.map = L.map(this.container).setView([location.lat, location.lng], 13);
            console.log('✅ Leaflet map created');

            // Add OpenStreetMap tiles
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                maxZoom: 19,
            }).addTo(this.map);

            // Add marker
            const customIcon = L.icon({
                iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41]
            });

            this.marker = L.marker([location.lat, location.lng], { 
                icon: customIcon 
            })
            .addTo(this.map)
            .bindPopup("White Label Headquarters")
            .openPopup();

            // Add loaded class
            this.container.classList.add('loaded');
            console.log('🎉 Map initialization complete!');

        } catch (error) {
            console.error('❌ Error initializing map:', error);
            this.showError();
        }
    }

    updateLocation(newLocation) {
        if (this.map && this.marker) {
            this.map.setView([newLocation.lat, newLocation.lng]);
            this.marker.setLatLng([newLocation.lat, newLocation.lng]);
        }
    }

    showError() {
        const placeholder = this.container.querySelector('.map-placeholder');
        if (placeholder) {
            placeholder.innerHTML = '<p>Error loading map</p>';
            placeholder.style.display = 'flex';
        }
    }

    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        if (this.map) {
            this.map.remove();
            this.map = null;
        }
    }
}

// Initialize map when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOMContentLoaded - Initializing MapComponent...');
    new MapComponent('mapContainer');
});