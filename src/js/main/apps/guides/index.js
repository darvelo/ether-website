import { App, makeOutlet } from 'ether';
import IndexRoute from './routes/index';

class GuidesApp extends App {
    expectedAddresses() {
        return [':guides'];
    }
    addressesHandlers() {
        return [function(){}];
    }
    expectedOutlets() {
        return ['guides'];
    }

    // the render cycle
    //     use the 4 cases from test/acceptance/navigation
    // reusing apps and routes
    //

    mount() {
        return {
            '': IndexRoute.addresses(':guides.index'),
        };
    }

    deactivate() {
        if ('scrollRestoration' in window.history) {
            this.scrollTop = window.scrollY;
        } else {
            this.scrollTop = 0;
        }
    }

    render() {
        this.sendTo(':.navbar', 'setActiveLink', this.expectedAddresses());
        window.scrollTo(0, this.scrollTop);
    }
}

export default GuidesApp;
