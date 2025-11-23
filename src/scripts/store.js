export const Store = {
    getBookmarks() {
        const bookmarks = localStorage.getItem('job_bookmarks');
        return bookmarks ? JSON.parse(bookmarks) : [];
    },

    addBookmark(job) {
        const bookmarks = this.getBookmarks();
        if (!bookmarks.some(b => b.job_id === job.job_id)) {
            bookmarks.push(job);
            localStorage.setItem('job_bookmarks', JSON.stringify(bookmarks));
            return true;
        }
        return false;
    },

    removeBookmark(jobId) {
        const bookmarks = this.getBookmarks();
        const newBookmarks = bookmarks.filter(b => b.job_id !== jobId);
        localStorage.setItem('job_bookmarks', JSON.stringify(newBookmarks));
    },

    isBookmarked(jobId) {
        const bookmarks = this.getBookmarks();
        return bookmarks.some(b => b.job_id === jobId);
    },

    getRequestCount() {
        return parseInt(localStorage.getItem('api_request_count') || '0');
    },

    incrementRequestCount() {
        const current = this.getRequestCount();
        localStorage.setItem('api_request_count', (current + 1).toString());
        // Dispatch event for UI updates
        window.dispatchEvent(new CustomEvent('requestCountUpdated', { detail: current + 1 }));
    }
};
