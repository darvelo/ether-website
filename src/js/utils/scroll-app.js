import { App } from 'ether';

class ScrollApp extends App {
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

export default ScrollApp;
