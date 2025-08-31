/**
 * Lazy Loading Utility
 * Optimizes page load performance by deferring loading of off-screen images and iframes
 */

class LazyLoader {
    constructor(options = {}) {
        // Default options
        this.options = {
            rootMargin: '200px 0px',
            threshold: 0.1,
            loadingClass: 'lazy-loading',
            loadedClass: 'lazy-loaded',
            errorClass: 'lazy-error',
            ...options
        };
        
        // Elements to lazy load
        this.images = [];
        this.iframes = [];
        
        // Observer instance
        this.observer = null;
        
        // Initialize
        this.init();
    }
    
    init() {
        // Check if IntersectionObserver is supported
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(this.onIntersection.bind(this), {
                rootMargin: this.options.rootMargin,
                threshold: this.options.threshold
            });
            
            // Find all elements to lazy load
            this.findElements();
            
            // Observe elements
            this.observeElements();
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            this.loadAllElements();
        }
        
        // Add event listener for dynamic content
        this.setupMutationObserver();
    }
    
    findElements() {
        // Find images with data-src or data-srcset attributes
        this.images = Array.from(document.querySelectorAll('img[data-src], img[data-srcset], source[data-srcset]'));
        
        // Find iframes with data-src attribute
        this.iframes = Array.from(document.querySelectorAll('iframe[data-src]'));
    }
    
    observeElements() {
        // Observe images
        this.images.forEach(image => {
            if (this.observer && !image.classList.contains(this.options.loadedClass)) {
                this.observer.observe(image);
                image.classList.add(this.options.loadingClass);
            }
        });
        
        // Observe iframes
        this.iframes.forEach(iframe => {
            if (this.observer && !iframe.classList.contains(this.options.loadedClass)) {
                this.observer.observe(iframe);
                iframe.classList.add(this.options.loadingClass);
            }
        });
    }
    
    onIntersection(entries) {
        entries.forEach(entry => {
            // Load element when it enters the viewport
            if (entry.isIntersecting) {
                this.loadElement(entry.target);
                this.observer.unobserve(entry.target);
            }
        });
    }
    
    loadElement(element) {
        // Remove loading class
        element.classList.remove(this.options.loadingClass);
        
        if (element.tagName.toLowerCase() === 'iframe') {
            this.loadIframe(element);
        } else {
            this.loadImage(element);
        }
    }
    
    loadImage(image) {
        const src = image.getAttribute('data-src');
        const srcset = image.getAttribute('data-srcset');
        const sizes = image.getAttribute('data-sizes');
        
        // Add load and error event listeners
        image.addEventListener('load', () => {
            image.classList.add(this.options.loadedClass);
        });
        
        image.addEventListener('error', () => {
            image.classList.add(this.options.errorClass);
        });
        
        // Set attributes
        if (sizes) {
            image.sizes = sizes;
        }
        
        if (srcset) {
            image.srcset = srcset;
        }
        
        if (src) {
            image.src = src;
        }
        
        // Remove data attributes to prevent potential reloading
        image.removeAttribute('data-src');
        image.removeAttribute('data-srcset');
        image.removeAttribute('data-sizes');
    }
    
    loadIframe(iframe) {
        const src = iframe.getAttribute('data-src');
        
        // Add load and error event listeners
        iframe.addEventListener('load', () => {
            iframe.classList.add(this.options.loadedClass);
        });
        
        iframe.addEventListener('error', () => {
            iframe.classList.add(this.options.errorClass);
        });
        
        // Set src attribute
        if (src) {
            iframe.src = src;
        }
        
        // Remove data attribute
        iframe.removeAttribute('data-src');
    }
    
    loadAllElements() {
        // Load all images immediately (fallback)
        this.images.forEach(image => this.loadImage(image));
        
        // Load all iframes immediately (fallback)
        this.iframes.forEach(iframe => this.loadIframe(iframe));
    }
    
    setupMutationObserver() {
        // Create a MutationObserver to watch for new lazy load elements
        const observer = new MutationObserver(mutations => {
            let needsUpdate = false;
            
            mutations.forEach(mutation => {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    for (const node of mutation.addedNodes) {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            // Check if the added node or its children have lazy load attributes
                            if ((node.hasAttribute && (node.hasAttribute('data-src') || node.hasAttribute('data-srcset'))) || 
                                (node.querySelector && node.querySelector('[data-src], [data-srcset]'))) {
                                needsUpdate = true;
                                break;
                            }
                        }
                    }
                }
            });
            
            if (needsUpdate) {
                this.findElements();
                this.observeElements();
            }
        });
        
        // Start observing the document with the configured parameters
        observer.observe(document.body, { childList: true, subtree: true });
    }
    
    // Public method to refresh lazy loading (useful after dynamic content changes)
    refresh() {
        this.findElements();
        this.observeElements();
    }
}

// Initialize lazy loading when DOM is loaded
let lazyLoader;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLazyLoader);
} else {
    initLazyLoader();
}

function initLazyLoader() {
    lazyLoader = new LazyLoader();
    window.lazyLoader = lazyLoader; // Make it globally accessible
}