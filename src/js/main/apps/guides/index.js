import { makeOutlet } from 'ether';
import { ScrollApp } from 'utils';
import IndexRoute from './routes/index';

class GuidesApp extends ScrollApp {
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

    render() {
        super.render();
        this.sendTo(':.navbar', 'setActiveLink', this.expectedAddresses());
    }
}

export default GuidesApp;
