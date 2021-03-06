import { ScrollRoute } from 'utils';
import template from '../templates/rootapp';

class RootAppRoute extends ScrollRoute {
    expectedAddresses() {
        return [':docs.rootapp'];
    }
    addressesHandlers() {
        return [function(){}];
    }
    expectedOutlets() {
        return ['rootapp'];
    }

    init() {
        this.outlets.rootapp.innerHTML = template();
    }

    render() {
        super.render();
        this.sendTo(':docs.sidebar', 'setActiveLink', this.expectedAddresses());
    }
}

export default RootAppRoute;
