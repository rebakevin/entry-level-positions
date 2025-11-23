export const loadComponent = async (path) => {
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Failed to load component: ${path}`);
        return await response.text();
    } catch (error) {
        console.error(error);
        return '<div class="error">Error loading component</div>';
    }
};
