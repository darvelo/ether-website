import { ScrollRoute } from 'utils';
import template from '../templates/route';

class RouteRoute extends ScrollRoute {
    expectedAddresses() {
        return [':docs.route'];
    }
    addressesHandlers() {
        return [function(){}];
    }
    expectedOutlets() {
        return ['route'];
    }

    init() {
        this.outlets.route.innerHTML = template();
    }

    render() {
        super.render();
        this.sendTo(':docs.sidebar', 'setActiveLink', this.expectedAddresses());
    }
}

export default RouteRoute;
