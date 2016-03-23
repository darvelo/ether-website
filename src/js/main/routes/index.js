import { Route } from 'ether';
import template from '../templates/index';

class IndexRoute extends Route {
    expectedAddresses() {
        return [':.index'];
    }
    addressesHandlers() {
        return [function(){}];
    }
    expectedOutlets() {
        return ['index'];
    }

    init() {
        this.outlets.index.innerHTML = template();
    }

    render() {
        this.sendTo(':.navbar', 'setActiveLink', this.expectedAddresses());
    }
}

export default IndexRoute;
