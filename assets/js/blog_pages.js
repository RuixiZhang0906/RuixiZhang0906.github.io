// Blog Pages Dynamic Content Loading
document.addEventListener('DOMContentLoaded', function() {
    // Handle category page
    if (window.location.pathname.includes('/category')) {
        handleCategoryPage();
    }
    
    // Handle tag page
    if (window.location.pathname.includes('/tag')) {
        handleTagPage();
    }
});

// Handle category page
function handleCategoryPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    if (!category) {
        showError('Category parameter is missing');
        return;
    }
    
    // Update page title and category name
    document.title = `Category: ${category} - Blog`;
    const categoryNameEl = document.querySelector('.category-name');
    if (categoryNameEl) {
        categoryNameEl.textContent = category;
    }
    
    // Filter posts by category (simplified for now)
    const posts = getBlogPosts();
    const categoryPosts = posts.filter(post => post.category === category);
    
    // Sort posts by date in descending order (newest first)
    categoryPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Update post count
    const postCountEl = document.getElementById('post-count');
    if (postCountEl) {
        postCountEl.textContent = `${categoryPosts.length} post${categoryPosts.length !== 1 ? 's' : ''}`;
    }
    
    // Display posts
    displayPosts(categoryPosts, 'category-posts');
}

// Handle tag page
function handleTagPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const tag = urlParams.get('tag');
    
    if (!tag) {
        showError('Tag parameter is missing');
        return;
    }
    
    // Update page title and tag name
    document.title = `Tag: ${tag} - Blog`;
    const tagNameEl = document.querySelector('.tag-name');
    if (tagNameEl) {
        tagNameEl.textContent = tag;
    }
    
    // Filter posts by tag
    const posts = getBlogPosts();
    const tagPosts = posts.filter(post => 
        post.tags && post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
    
    // Sort posts by date in descending order (newest first)
    tagPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Update post count
    const postCountEl = document.getElementById('post-count');
    if (postCountEl) {
        postCountEl.textContent = `${tagPosts.length} post${tagPosts.length !== 1 ? 's' : ''}`;
    }
    
    // Display posts
    displayPosts(tagPosts, 'tag-posts');
}

// Get blog posts from server-side data
function getBlogPosts() {
    // Get posts from the global variable set by Jekyll
    return window.blogPostsData || [];
}

// Load blog posts data on page load
document.addEventListener('DOMContentLoaded', function() {
    // Create a script to load posts data
    const script = document.createElement('script');
    script.src = '/posts.json';
    script.onload = function() {
        window.blogPostsData = window.posts || [];
        // Re-run the page handlers after data is loaded
        if (window.location.pathname.includes('/category')) {
            handleCategoryPage();
        }
        if (window.location.pathname.includes('/tag')) {
            handleTagPage();
        }
    };
    script.onerror = function() {
        console.log('Posts data not available, using fallback');
    };
    document.head.appendChild(script);
});

// Display posts in container
function displayPosts(posts, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (posts.length === 0) {
        container.innerHTML = `
            <div class="bg-white shadow-sm rounded-lg p-4 text-center">
                <i class="fas fa-inbox fa-3x text-muted mb-3"></i>
                <h4 class="text-muted">No posts found</h4>
                <p class="text-muted">Check back later for new content!</p>
                <a href="/blogs" class="btn btn-primary">Back to All Posts</a>
            </div>
        `;
        return;
    }
    
    const postsHtml = posts.map(post => `
        <div class="mb-3">
            <div class="card border-0 shadow-sm blog-item">
                <div class="row no-gutters">
                    ${post.cover ? `
                    <div class="col-md-3">
                        <img src="${post.cover}" class="card-img h-100" alt="${post.title}" style="object-fit: cover;">
                    </div>
                    <div class="col-md-9">
                    ` : `
                    <div class="col">
                    `}
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <div>
                                    ${post.tags ? post.tags.slice(0, 3).map(tag => 
                                        `<span class="badge badge-primary badge-sm mr-1">${tag}</span>`
                                    ).join('') : ''}
                                </div>
                                <small class="text-muted">
                                    ${new Date(post.date).toLocaleDateString('en-US', { 
                                        year: 'numeric', 
                                        month: 'short', 
                                        day: 'numeric' 
                                    })}
                                </small>
                            </div>
                            
                            <h5 class="card-title">
                                <a href="${post.url}" class="text-dark text-decoration-none">
                                    ${post.title}
                                </a>
                            </h5>
                            
                            <p class="card-text text-muted">
                                ${post.excerpt || ''}
                            </p>
                            
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="text-muted small">
                                    <i class="fas fa-clock"></i>
                                    ${post.reading_time || 5} min read
                                    <span class="mx-2">•</span>
                                    <i class="fas fa-folder"></i>
                                    ${post.category ? post.category.charAt(0).toUpperCase() + post.category.slice(1) : ''}
                                    <span class="mx-2">•</span>
                                    <i class="fas fa-eye"></i>
                                    <span class="blog-views" data-url="${post.url}">-</span>
                                </div>
                                
                                <a href="${post.url}" class="btn btn-sm btn-outline-primary">
                                    Read More <i class="fas fa-arrow-right ml-1"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = postsHtml;
}

// Show error message
function showError(message) {
    const container = document.getElementById('category-posts') || document.getElementById('tag-posts');
    if (container) {
        container.innerHTML = `
            <div class="bg-white shadow-sm rounded-lg p-4 text-center">
                <i class="fas fa-exclamation-triangle fa-3x text-warning mb-3"></i>
                <h4 class="text-warning">Error</h4>
                <p class="text-muted">${message}</p>
                <a href="/blogs" class="btn btn-primary">Back to All Posts</a>
            </div>
        `;
    }
}
