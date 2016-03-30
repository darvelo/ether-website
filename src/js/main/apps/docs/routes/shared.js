import { ScrollRoute } from 'utils';

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
        let h1 = document.createElement('h1');
        h1.textContent = 'Shared Methods and Variables';
        this.outlets.shared.append(h1);
    }

    render() {
        super.render();
        this.sendTo(':docs.sidebar', 'setActiveLink', this.expectedAddresses());
    }
}

export default SharedRoute;
