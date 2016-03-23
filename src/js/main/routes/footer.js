import { Route } from 'ether';
import template from '../templates/footer';

class FooterRoute extends Route {
    expectedAddresses() {
        return [':.footer'];
    }
    addressesHandlers() {
        return [function(){}];
    }
    expectedOutlets() {
        return ['footer'];
    }

    init() {
        this.outlets.footer.innerHTML = template();
    }
}

export default FooterRoute;
