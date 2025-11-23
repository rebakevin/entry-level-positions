const API_KEY = '13a6f94d64msha3b555da25e50d1p1342e1jsn5cd3d2dbbd0c';
const API_HOST = 'jsearch.p.rapidapi.com';
const BASE_URL = 'https://jsearch.p.rapidapi.com/search';

export const searchJobs = async (query, filters = {}) => {
    const params = new URLSearchParams({
        query: query,
        page: '1',
        num_pages: '1',
        country: filters.country || 'us',
        date_posted: 'all',
        ...filters
    });

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': API_HOST
        }
    };

    try {
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
