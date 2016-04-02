import { ScrollRoute } from 'utils';
import template from '../templates/shared';

class SharedRoute extends ScrollRoute {
    expectedAddresses() {
        return [':docs.shared'];
    }
    addressesHandlers() {
        return [function(){}];
    }
    expectedOutlets() {
        return ['shared'];
    }

    init() {
        this.outlets.shared.innerHTML = template();
    }

    render() {
        super.render();
        this.sendTo(':docs.sidebar', 'setActiveLink', this.expectedAddresses());
    }
}

export default SharedRoute;
