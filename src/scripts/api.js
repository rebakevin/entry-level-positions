import { Store } from './store.js';
import { API_KEY, API_HOST, BASE_URL } from './config.js';

export const searchJobs = async (query, filters = {}) => {
    // Map filters to API parameters
    const queryParams = {
        query: query,
        page: '1',
        num_pages: '1',
        country: filters.country || 'us',
        date_posted: filters.date_posted || 'all',
    };

    // Handle optional parameters
    if (filters.job_requirements) {
        queryParams.job_requirements = filters.job_requirements;
    }

    if (filters.work_from_home) {
        queryParams.work_from_home = 'true';
    }

    if (filters.employment_types) {
        queryParams.employment_types = filters.employment_types;
    }

    const params = new URLSearchParams(queryParams);

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': API_HOST
        }
    };

    try {
        // Increment usage count before request
        Store.incrementRequestCount();

        const response = await fetch(`${BASE_URL}?${params.toString()}`, options);
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Search failed:', error);
        throw error;
    }
};
