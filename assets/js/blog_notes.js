// Blog Notes Page Dynamic Content Loading
document.addEventListener('DOMContentLoaded', function() {
    handleNotesPage();
});

// Handle notes page
function handleNotesPage() {
    // Define the notes categories structure
    const notesCategories = [
        {
            name: "Computer Science",
            slug: "computer-science",
            icon: "fas fa-laptop-code",
            subcategories: [
                { name: "Algorithms", slug: "algorithms" },
                { name: "Machine Learning", slug: "machine-learning" },
                { name: "Software Engineering", slug: "software-engineering" },
                { name: "Systems", slug: "systems" }
            ]
        },
        {
            name: "Mathematics",
            slug: "mathematics",
            icon: "fas fa-calculator",
            subcategories: [
                { name: "Calculus", slug: "calculus" },
                { name: "Discrete Math", slug: "discrete-math" },
                { name: "Linear Algebra", slug: "linear-algebra" },
                { name: "Statistics", slug: "statistics" }
            ]
        },
        {
            name: "Machine Learning",
            slug: "machine-learning",
            icon: "fas fa-robot",
            subcategories: [
                { name: "Supervised Learning", slug: "supervised-learning" },
                { name: "Unsupervised Learning", slug: "unsupervised-learning" },
                { name: "Reinforcement Learning", slug: "reinforcement-learning" },
                { name: "Deep Learning", slug: "deep-learning" }
            ]
        },
        {
            name: "Large Language Models",
            slug: "large-language-models",
            icon: "fas fa-language",
            subcategories: [
                { name: "Transformers", slug: "transformers" },
                { name: "LLMs", slug: "llms" },
                { name: "Vision Models", slug: "vision-models" },
                { name: "Multimodal Models", slug: "multimodal-models" }
            ]
        }
    ];
    
    // Render categories in sidebar
    renderNotesCategories(notesCategories);
    
    // Load all notes initially
    loadNotesByCategory(null);
}

// Render notes categories in sidebar
function renderNotesCategories(categories) {
    const container = document.getElementById('notes-categories');
    if (!container) return;
    
    const categoriesHtml = categories.map(category => `
        <div class="mb-2">
            <div class="d-flex justify-content-between align-items-center p-2 bg-light rounded cursor-pointer" 
                 data-toggle="collapse" data-target="#${category.slug}-subcategories">
                <div>
                    <i class="${category.icon}"></i>
                    ${category.name}
                </div>
                <i class="fas fa-chevron-down"></i>
            </div>
            <div id="${category.slug}-subcategories" class="collapse mt-1">
                ${category.subcategories.map(sub => `
                    <a href="javascript:void(0)" 
                       class="list-group-item list-group-item-action subcategory-item" 
                       data-category="${category.slug}" 
                       data-subcategory="${sub.slug}">
                        ${sub.name}
                    </a>
                `).join('')}
            </div>
        </div>
    `).join('');
    
    container.innerHTML = categoriesHtml;
    
    // Add event listeners to subcategory items
    document.querySelectorAll('.subcategory-item').forEach(item => {
        item.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            const subcategory = this.getAttribute('data-subcategory');
            loadNotesByCategory(`${category}/${subcategory}`);
        });
    });
}

// Load notes by category
function loadNotesByCategory(categoryPath) {
    // Get all notes from the global variable
    const allNotes = getBlogPosts();
    
    // Filter notes by category
    let filteredNotes = allNotes;
    if (categoryPath) {
        filteredNotes = allNotes.filter(note => 
            note.category === 'notes' && note.subcategory.startsWith(categoryPath)
        );
    } else {
        // Show all notes in the notes category
        filteredNotes = allNotes.filter(note => note.category === 'notes');
    }
    
    // Sort notes by date in descending order (newest first)
    filteredNotes.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Update notes count
    const notesCountEl = document.getElementById('notes-count');
    if (notesCountEl) {
        notesCountEl.textContent = `${filteredNotes.length} note${filteredNotes.length !== 1 ? 's' : ''}`;
    }
    
    // Display notes
    displayNotes(filteredNotes, 'notes-list');
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
        // Re-run the notes page handler after data is loaded
        handleNotesPage();
    };
    script.onerror = function() {
        console.log('Posts data not available, using fallback');
    };
    document.head.appendChild(script);
});

// Display notes in container
function displayNotes(notes, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (notes.length === 0) {
        container.innerHTML = `
            <div class="bg-white shadow-sm rounded-lg p-4 text-center">
                <i class="fas fa-inbox fa-3x text-muted mb-3"></i>
                <h4 class="text-muted">No notes found</h4>
                <p class="text-muted">Check back later for new content!</p>
                <a href="/blogs" class="btn btn-primary">Back to All Posts</a>
            </div>
        `;
        return;
    }
    
    const notesHtml = notes.map(note => `
        <div class="mb-3">
            <div class="card border-0 shadow-sm blog-item">
                <div class="row no-gutters">
                    ${note.cover ? `
                    <div class="col-md-3">
                        <img src="${note.cover}" class="card-img h-100" alt="${note.title}" style="object-fit: cover;">
                    </div>
                    <div class="col-md-9">
                    ` : `
                    <div class="col">
                    `}
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <div>
                                    ${note.tags ? note.tags.slice(0, 3).map(tag => 
                                        `<span class="badge badge-primary badge-sm mr-1">${tag}</span>`
                                    ).join('') : ''}
                                </div>
                                <small class="text-muted">
                                    ${new Date(note.date).toLocaleDateString('en-US', { 
                                        year: 'numeric', 
                                        month: 'short', 
                                        day: 'numeric' 
                                    })}
                                </small>
                            </div>
                            
                            <h5 class="card-title">
                                <a href="${note.url}" class="text-dark text-decoration-none">
                                    ${note.title}
                                </a>
                            </h5>
                            
                            <p class="card-text text-muted">
                                ${note.excerpt || ''}
                            </p>
                            
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="text-muted small">
                                    <i class="fas fa-clock"></i>
                                    ${note.reading_time || 5} min read
                                    <span class="mx-2">•</span>
                                    <i class="fas fa-folder"></i>
                                    ${note.category ? note.category.charAt(0).toUpperCase() + note.category.slice(1) : ''}
                                    ${note.subcategory ? ` / ${note.subcategory}` : ''}
                                    <span class="mx-2">•</span>
                                    <i class="fas fa-eye"></i>
                                    <span class="blog-views" data-url="${note.url}">-</span>
                                </div>
                                
                                <a href="${note.url}" class="btn btn-sm btn-outline-primary">
                                    Read Note <i class="fas fa-arrow-right ml-1"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = notesHtml;
}