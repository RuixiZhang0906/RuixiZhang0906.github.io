// Blog Archive Page Dynamic Content Loading
document.addEventListener('DOMContentLoaded', function() {
    // Handle archive page with year filter
    if (window.location.pathname.includes('/archive')) {
        handleArchivePage();
    }
});

// Handle archive page
function handleArchivePage() {
    const urlParams = new URLSearchParams(window.location.search);
    const year = urlParams.get('year');
    
    // Update page title based on year filter
    if (year) {
        document.title = `Archive: ${year} - Blog`;
        // Update the page heading to show the selected year
        const headingEl = document.querySelector('h2');
        if (headingEl) {
            headingEl.innerHTML = `<i class="fas fa-archive"></i> Blog Archive: ${year}`;
        }
        
        // Show only posts from the selected year
        filterPostsByYear(year);
    }
}

// Filter posts by year
function filterPostsByYear(year) {
    // Get all timeline-year elements
    const yearElements = document.querySelectorAll('.timeline-year');
    
    yearElements.forEach(element => {
        const yearHeading = element.querySelector('h3');
        if (yearHeading) {
            const yearText = yearHeading.textContent.trim();
            if (yearText !== year) {
                // Hide years that don't match the filter
                element.style.display = 'none';
            } else {
                // Show the matching year
                element.style.display = 'block';
            }
        }
    });
}

// Load blog posts data on page load
function loadBlogPostsData() {
    return new Promise((resolve, reject) => {
        // Create a script to load posts data
        const script = document.createElement('script');
        script.src = '/posts.json';
        script.onload = function() {
            window.blogPostsData = window.posts || [];
            resolve(window.blogPostsData);
        };
        script.onerror = function() {
            console.log('Posts data not available, using fallback');
            reject([]);
        };
        document.head.appendChild(script);
    });
}