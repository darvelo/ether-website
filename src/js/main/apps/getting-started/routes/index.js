import { Route } from 'ether';

class GettingStartedIndexRoute extends Route {
    expectedAddresses() {
        return [':gs.index'];
    }
    addressesHandlers() {
        return [function(){}];
    }
    expectedOutlets() {
        return [];
    }
}

export default GettingStartedIndexRoute;
