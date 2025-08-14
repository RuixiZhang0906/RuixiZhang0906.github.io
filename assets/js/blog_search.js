// Blog Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('blog-search');
    const searchButton = searchInput?.nextElementSibling?.querySelector('button');
    
    if (!searchInput) return;
    
    // Search functionality
    function performSearch(query) {
        if (!query || query.length < 2) {
            // Show all posts if query is too short
            showAllPosts();
            return;
        }
        
        // Simple client-side search
        const posts = document.querySelectorAll('.blog-item, .blog-card');
        let foundCount = 0;
        
        posts.forEach(post => {
            const title = post.querySelector('h5, h6')?.textContent?.toLowerCase() || '';
            const content = post.querySelector('p')?.textContent?.toLowerCase() || '';
            const tags = Array.from(post.querySelectorAll('.badge')).map(badge => badge.textContent.toLowerCase());
            
            const isMatch = title.includes(query.toLowerCase()) || 
                           content.includes(query.toLowerCase()) ||
                           tags.some(tag => tag.includes(query.toLowerCase()));
            
            if (isMatch) {
                post.style.display = 'block';
                post.style.opacity = '1';
                foundCount++;
            } else {
                post.style.display = 'none';
                post.style.opacity = '0.5';
            }
        });
        
        // Show search results message
        showSearchResults(foundCount, query);
    }
    
    function showAllPosts() {
        const posts = document.querySelectorAll('.blog-item, .blog-card');
        posts.forEach(post => {
            post.style.display = 'block';
            post.style.opacity = '1';
        });
        
        // Hide search results message
        hideSearchResults();
    }
    
    function showSearchResults(count, query) {
        let messageEl = document.getElementById('search-results-message');
        if (!messageEl) {
            messageEl = document.createElement('div');
            messageEl.id = 'search-results-message';
            messageEl.className = 'alert alert-info mt-3';
            searchInput.parentElement.parentElement.appendChild(messageEl);
        }
        
        messageEl.innerHTML = `
            <i class="fas fa-search"></i>
            Found ${count} result${count !== 1 ? 's' : ''} for "${query}"
        `;
        messageEl.style.display = 'block';
    }
    
    function hideSearchResults() {
        const messageEl = document.getElementById('search-results-message');
        if (messageEl) {
            messageEl.style.display = 'none';
        }
    }
    
    // Event listeners
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.trim();
        performSearch(query);
    });
    
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const query = searchInput.value.trim();
            performSearch(query);
        });
    }
    
    // Enter key support
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = e.target.value.trim();
            performSearch(query);
        }
    });
    
    // Clear search on escape
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            searchInput.value = '';
            showAllPosts();
        }
    });
});

// Reading progress bar
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.blog-content')) {
        // Create progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        document.body.appendChild(progressBar);
        
        // Update progress on scroll
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            progressBar.style.width = scrollPercent + '%';
        });
    }
});

// Social sharing functions (if not already defined)
if (typeof shareOnTwitter === 'undefined') {
    window.shareOnTwitter = function() {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(document.title);
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
    };
}

if (typeof shareOnLinkedIn === 'undefined') {
    window.shareOnLinkedIn = function() {
        const url = encodeURIComponent(window.location.href);
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    };
}
