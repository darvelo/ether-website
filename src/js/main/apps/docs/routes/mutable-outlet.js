import { ScrollRoute } from 'utils';
import template from '../templates/mutable-outlet';

class MutableOutletRoute extends ScrollRoute {
    expectedAddresses() {
        return [':docs.mutableoutlet'];
    }
    addressesHandlers() {
        return [function(){}];
    }
    expectedOutlets() {
        return ['mutableoutlet'];
    }

    init() {
        this.outlets.mutableoutlet.innerHTML = template();
    }

    render() {
        super.render();
        this.sendTo(':docs.sidebar', 'setActiveLink', this.expectedAddresses());
    }
}

export default MutableOutletRoute;
