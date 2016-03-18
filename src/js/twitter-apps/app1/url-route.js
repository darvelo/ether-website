import { Route } from 'ether';
class URLRoute extends Route {
    expectedAddresses() {
        return ['url'];
    }
    addressesHandlers() {
        return ['receive'];
    }
    expectedOutlets() {
        return ['url'];
    }
    expectedParams() {
        return [];
    }

    // initialization code
    init() {
        this.h1 = document.createElement('h1');
        this.outlets.url.append(this.h1);
    }

    // addresses handlers
    receive(url) {
        this.h1.textContent = `pathname is: ${url}`;
    }
}

export default URLRoute;
