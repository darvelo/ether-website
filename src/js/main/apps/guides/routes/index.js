import { Route } from 'ether';

class IndexRoute extends Route {
    expectedAddresses() {
        return [':guides.index'];
    }
    addressesHandlers() {
        return [function(){}];
    }
    expectedOutlets() {
        return [];
    }
}

export default IndexRoute;
