import { ScrollRoute } from 'utils';

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
        let h1 = document.createElement('h1');
        h1.textContent = 'App';
        this.outlets.app.append(h1);
    }

    render() {
        super.render();
        this.sendTo(':docs.sidebar', 'setActiveLink', this.expectedAddresses());
    }
}

export default AppRoute;
