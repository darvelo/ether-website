import { Route } from 'ether';
import template from '../templates/index';

class GettingStartedIndexRoute extends Route {
    expectedAddresses() {
        return [':gs.index'];
    }
    addressesHandlers() {
        return [function(){}];
    }
    expectedOutlets() {
        return ['gs'];
    }

    init() {
        let outlet = this.outlets.gs;
        outlet.innerHTML = template();
    }

    render() {
        this.sendTo(':.navbar', 'setActiveLink', this.expectedAddresses());
    }
}

export default GettingStartedIndexRoute;
