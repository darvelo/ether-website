import { ScrollRoute } from 'utils';
import template from '../templates/index';

class IndexRoute extends ScrollRoute {
    expectedAddresses() {
        return [':docs.index'];
    }
    addressesHandlers() {
        return [function(){}];
    }
    expectedOutlets() {
        return ['index'];
    }

    init() {
        this.outlets.index.innerHTML = template();
    }

    render() {
        super.render();
        this.sendTo(':docs.sidebar', 'setActiveLink', this.expectedAddresses());
    }
}

export default IndexRoute;
