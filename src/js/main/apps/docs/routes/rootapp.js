import { ScrollRoute } from 'utils';

class RootAppRoute extends ScrollRoute {
    expectedAddresses() {
        return [':docs.rootapp'];
    }
    addressesHandlers() {
        return [function(){}];
    }
    expectedOutlets() {
        return ['rootapp'];
    }

    init() {
        let h1 = document.createElement('h1');
        h1.textContent = 'RootApp';
        this.outlets.rootapp.append(h1);
    }

    render() {
        super.render();
        this.sendTo(':docs.sidebar', 'setActiveLink', this.expectedAddresses());
    }
}

export default RootAppRoute;
