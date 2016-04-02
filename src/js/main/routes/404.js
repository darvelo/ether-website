import { ScrollRoute } from 'utils';
import template from '../templates/404';

class The404Route extends ScrollRoute {
    expectedAddresses() {
        return [':.404'];
    }
    addressesHandlers() {
        return [function(){}];
    }
    expectedOutlets() {
        return ['the404'];
    }

    init() {
        let outlet = this.outlets.the404;
        outlet.innerHTML = template();
    }

    render() {
        super.render();
        this.sendTo(':.navbar', 'setActiveLink', null);
    }
}

export default The404Route;
