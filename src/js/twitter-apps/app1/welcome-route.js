import { Route } from 'ether';

class WelcomeRoute extends Route {
    expectedAddresses() {
        return ['welcome'];
    }
    addressesHandlers() {
        return ['receive'];
    }
    expectedOutlets() {
        return ['welcome'];
    }
    expectedParams() {
        return [];
    }

    // initialization code
    init(setupVal) {
        let h1 = document.createElement('h1');
        h1.textContent = 'Welcome!';
        this.outlets.welcome.append(h1);
    }

    // addresses handlers
    receive() {

    }

    // render-cycle functions
    prerender(params, queryParams, diffs) {

    }
    deactivate() {

    }
    render(params, queryParams, diffs) {

    }
}

export default WelcomeRoute;
