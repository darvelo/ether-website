import { ScrollRoute } from 'utils';
import template from '../templates/app';

class AppRoute extends ScrollRoute {
    expectedAddresses() {
        return [':docs.app'];
    }
    addressesHandlers() {
        return [function(){}];
    }
    expectedOutlets() {
        return ['app'];
    }

    init() {
        this.outlets.app.innerHTML = template();
    }

    render() {
        super.render();
        this.sendTo(':docs.sidebar', 'setActiveLink', this.expectedAddresses());
    }
}

export default AppRoute;
