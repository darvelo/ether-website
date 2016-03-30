import { ScrollRoute } from 'utils';

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
        let h1 = document.createElement('h1');
        h1.textContent = 'Route';
        this.outlets.route.append(h1);
    }

    render() {
        super.render();
        this.sendTo(':docs.sidebar', 'setActiveLink', this.expectedAddresses());
    }
}

export default RouteRoute;
