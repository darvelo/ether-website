import { ScrollRoute } from 'utils';
import template from '../templates/outlet';

class OutletRoute extends ScrollRoute {
    expectedAddresses() {
        return [':docs.outlet'];
    }
    addressesHandlers() {
        return [function(){}];
    }
    expectedOutlets() {
        return ['outlet'];
    }

    init() {
        this.outlets.outlet.innerHTML = template();
    }

    render() {
        super.render();
        this.sendTo(':docs.sidebar', 'setActiveLink', this.expectedAddresses());
    }
}

export default OutletRoute;
