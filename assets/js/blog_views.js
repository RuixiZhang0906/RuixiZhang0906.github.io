// Blog Views Counter
class BlogViewsCounter {
    constructor() {
        this.storageKey = 'blog_views';
        this.views = this.loadViews();
        this.init();
    }
    
    loadViews() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : {};
        } catch (e) {
            console.error('Error loading views:', e);
            return {};
        }
    }
    
    saveViews() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.views));
        } catch (e) {
            console.error('Error saving views:', e);
        }
    }
    
    incrementViews(url) {
        if (!this.views[url]) {
            this.views[url] = 0;
        }
        this.views[url]++;
        this.saveViews();
        this.updateDisplay(url);
    }
    
    getViews(url) {
        return this.views[url] || 0;
    }
    
    updateDisplay(url) {
        const elements = document.querySelectorAll(`[data-url="${url}"]`);
        const views = this.getViews(url);
        
        elements.forEach(element => {
            element.textContent = this.formatViews(views);
        });
    }
    
    formatViews(views) {
        if (views < 1000) {
            return views.toString();
        } else if (views < 1000000) {
            return (views / 1000).toFixed(1) + 'K';
        } else {
            return (views / 1000000).toFixed(1) + 'M';
        }
    }
    
    updateAllDisplays() {
        const elements = document.querySelectorAll('[data-url]');
        elements.forEach(element => {
            const url = element.getAttribute('data-url');
            this.updateDisplay(url);
        });
    }
    
    init() {
        // Update all view displays on page load
        this.updateAllDisplays();
        
        // Increment view count for current page if it's a blog post
        if (window.location.pathname.includes('/blogs/categories/')) {
            this.incrementViews(window.location.pathname);
        }
    }
}

// Initialize views counter when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.blogViewsCounter = new BlogViewsCounter();
});
