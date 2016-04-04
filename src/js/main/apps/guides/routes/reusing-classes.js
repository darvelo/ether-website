import { ScrollRoute } from 'utils';
import template from '../templates/reusing-classes';

class ReusingClassesRoute extends ScrollRoute {
    expectedAddresses() {
        return [':guides.reusingclasses'];
    }
    addressesHandlers() {
        return [function(){}];
    }
    expectedOutlets() {
        return ['reusingclasses'];
    }

    init() {
        let outlet = this.outlets.reusingclasses;
        outlet.innerHTML = template();
    }

    render() {
        super.render();
        this.sendTo(':guides.sidebar', 'setActiveLink', this.expectedAddresses());
    }
}

export default ReusingClassesRoute;
