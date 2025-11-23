import { Router } from './router.js';
import { searchJobs } from './api.js';
import { Store } from './store.js';
import { loadComponent } from './componentLoader.js';

// --- Components ---

const Header = {
    render: async () => await loadComponent('src/components/header.html')
};

const Footer = {
    render: async () => await loadComponent('src/components/footer.html')
};

// Helper to render job card from template
const renderJobCard = async (job, template) => {
    const isBookmarked = Store.isBookmarked(job.job_id);
    let html = template;

    // Replace placeholders
    html = html.replace(/{{job_title}}/g, job.job_title || 'No Title');
    html = html.replace(/{{job_id}}/g, job.job_id);
    html = html.replace(/{{bookmark_label}}/g, isBookmarked ? 'Remove bookmark' : 'Bookmark job');
    html = html.replace(/{{bookmark_icon}}/g, isBookmarked ? '★' : '☆');
    html = html.replace(/{{employer_name}}/g, job.employer_name || 'Unknown Company');
    html = html.replace(/{{location}}/g, `${job.job_city || ''}, ${job.job_country || ''}`);
    html = html.replace(/{{job_type}}/g, job.job_is_remote ? '🌐 Remote' : '🏢 On-site');
    html = html.replace(/{{job_description}}/g, job.job_description ? job.job_description.substring(0, 150) + '...' : 'No description available.');
    html = html.replace(/{{posted_date}}/g, new Date(job.job_posted_at_datetime_utc).toLocaleDateString());
    html = html.replace(/{{job_apply_link}}/g, job.job_apply_link || '#');

    return html;
};

// --- Pages ---

const Home = {
    render: async () => await loadComponent('src/components/home.html')
};

const Search = {
    state: {
        jobs: [],
        filters: {
            query: 'Software Engineer',
            job_requirements: 'entry_level',
            remote_jobs_only: false,
            date_posted: 'all'
        },
        cardTemplate: null
    },

    render: async () => await loadComponent('src/components/search.html'),

    afterRender: async () => {
        const form = document.getElementById('search-form');
        const resultsContainer = document.getElementById('results-container');
        const statusMessage = document.getElementById('status-message');

        // Pre-load template
        if (!Search.state.cardTemplate) {
            Search.state.cardTemplate = await loadComponent('src/components/job-card.html');
        }

        // Bind events
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                await Search.performSearch();
            });
        }

        // Initial search if empty
        if (Search.state.jobs.length === 0) {
            await Search.performSearch();
        } else {
            await Search.renderJobs();
        }
    },

    performSearch: async () => {
        const query = document.getElementById('query').value;
        const level = document.getElementById('level').value;
        const date = document.getElementById('date').value;
        const remote = document.getElementById('remote').checked;
        const resultsContainer = document.getElementById('results-container');
        const statusMessage = document.getElementById('status-message');

        statusMessage.innerHTML = '<div class="status-message">Loading jobs...</div>';
        resultsContainer.innerHTML = '';

        try {
            const filters = {
                job_requirements: level,
                date_posted: date,
                remote_jobs_only: remote
            };

            const jobs = await searchJobs(query, filters);
            Search.state.jobs = jobs;
            await Search.renderJobs();
            statusMessage.innerHTML = '';

            if (jobs.length === 0) {
                statusMessage.innerHTML = '<div class="status-message status-error">No jobs found matching your criteria.</div>';
            }

        } catch (error) {
            console.error(error);
            statusMessage.innerHTML = '<div class="status-message status-error">Failed to fetch jobs. Please try again later.</div>';
        }
    },

    renderJobs: async () => {
        const resultsContainer = document.getElementById('results-container');
        if (!Search.state.cardTemplate) {
            Search.state.cardTemplate = await loadComponent('src/components/job-card.html');
        }

        const jobsHtmlPromises = Search.state.jobs.map(job => renderJobCard(job, Search.state.cardTemplate));
        const jobsHtml = await Promise.all(jobsHtmlPromises);

        resultsContainer.innerHTML = jobsHtml.join('');

        // Add event listeners for bookmarks
        document.querySelectorAll('.bookmark-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const jobId = e.target.dataset.id;
                const job = Search.state.jobs.find(j => j.job_id === jobId);

                if (Store.isBookmarked(jobId)) {
                    Store.removeBookmark(jobId);
                    e.target.textContent = '☆';
                    e.target.ariaLabel = 'Bookmark job';
                } else {
                    Store.addBookmark(job);
                    e.target.textContent = '★';
                    e.target.ariaLabel = 'Remove bookmark';
                }
            });
        });
    }
};

const Bookmarks = {
    render: async () => await loadComponent('src/components/bookmarks.html'),

    afterRender: async () => {
        const container = document.getElementById('bookmarks-container');
        const bookmarks = Store.getBookmarks();
        const cardTemplate = await loadComponent('src/components/job-card.html');

        if (bookmarks.length === 0) {
            container.innerHTML = '<p>No saved jobs yet.</p>';
            return;
        }

        const jobsHtmlPromises = bookmarks.map(job => renderJobCard(job, cardTemplate));
        const jobsHtml = await Promise.all(jobsHtmlPromises);

        container.innerHTML = jobsHtml.join('');

        // Re-bind bookmark buttons (to remove)
        document.querySelectorAll('.bookmark-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const jobId = e.target.dataset.id;
                Store.removeBookmark(jobId);
                // Re-render
                Bookmarks.afterRender();
            });
        });
    }
};

const About = {
    render: async () => await loadComponent('src/components/about.html')
};

const NotFound = {
    render: async () => await loadComponent('src/components/404.html')
};

const routes = {
    '/': Home,
    '/search': Search,
    '/bookmarks': Bookmarks,
    '/about': About,
    '/404': NotFound
};

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    // Render static layout
    document.getElementById('main-header').innerHTML = await Header.render();
    document.getElementById('main-footer').innerHTML = await Footer.render();

    // Initialize Usage Tracker
    const updateTracker = (count) => {
        const tracker = document.getElementById('usage-tracker');
        const countSpan = document.getElementById('request-count');
        if (tracker && countSpan) {
            countSpan.textContent = count;
            if (count >= 200) {
                tracker.classList.add('limit-reached');
            } else if (count >= 180) {
                tracker.classList.add('limit-near');
            }
        }
    };

    // Set initial value
    updateTracker(Store.getRequestCount());

    // Listen for updates
    window.addEventListener('requestCountUpdated', (e) => {
        updateTracker(e.detail);
    });

    // Start router
    new Router(routes);
});
