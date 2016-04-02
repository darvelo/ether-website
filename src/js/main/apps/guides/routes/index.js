import { ScrollRoute } from 'utils';

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
        let h1 = document.createElement('h1');
        h1.textContent = 'Overview';
        this.outlets.index.appendChild(h1);
    }

    render() {
        super.render();
        this.sendTo(':guides.sidebar', 'setActiveLink', this.expectedAddresses());
    }
}

export default IndexRoute;
