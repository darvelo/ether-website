import { Route } from 'ether';

class ScrollRoute extends Route {
    deactivate() {
        if ('scrollRestoration' in window.history) {
            this.scrollTop = window.scrollY;
        } else {
            this.scrollTop = 0;
        }
    }

    render() {
        window.scrollTo(0, this.scrollTop);
    }
}

export default ScrollRoute;
