import { Route } from 'ether';

class TOCRoute extends Route {
    expectedAddresses() {
        return [':gs.toc'];
    }
    addressesHandlers() {
        return ['receive'];
    }
    expectedOutlets() {
        return ['toc'];
    }

    init() {

    }

    receive(message) {
        if (message === 'generateTOC') {
            this.generateTOC();
        }
    }

    generateTOC() {

    }
}

export default TOCRoute;
