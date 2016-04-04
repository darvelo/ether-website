import { ScrollRoute } from 'utils';
import template from '../templates/index';

class IndexRoute extends ScrollRoute {
    expectedAddresses() {
        return [':guides.index'];
    }
    addressesHandlers() {
        return [function(){}];
    }
    expectedOutlets() {
        return ['index'];
    }

    init() {
        let outlet = this.outlets.index;
        outlet.innerHTML = template();
    }

    render() {
        super.render();
        this.sendTo(':guides.sidebar', 'setActiveLink', this.expectedAddresses());
    }
}

export default IndexRoute;
