export class Router {
    constructor(routes) {
        this.routes = routes;
        this.root = document.getElementById('main-content');
        window.addEventListener('hashchange', () => this.loadRoute());
        this.loadRoute();
    }

    async loadRoute() {
        const hash = window.location.hash.slice(1) || '/';
        const route = this.routes[hash] || this.routes['/404'];

        if (route) {
            this.root.innerHTML = await route.render();

            // Toggle home-page class for styling
            if (hash === '/' || hash === '') {
                this.root.classList.add('home-page');
            } else {
                this.root.classList.remove('home-page');
            }

            if (route.afterRender) await route.afterRender();
        }
    }
}
