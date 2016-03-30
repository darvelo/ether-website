import { ScrollRoute } from 'utils';

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
        let h1 = document.createElement('h1');
        h1.textContent = 'Docs';
        this.outlets.index.append(h1);
    }

    render() {
        super.render();
        this.sendTo(':docs.sidebar', 'setActiveLink', this.expectedAddresses());
    }
}

export default IndexRoute;
