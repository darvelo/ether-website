import { ScrollRoute } from 'utils';

class ReusingClassesRoute extends ScrollRoute {
    expectedAddresses() {
        return [':guides.reusingclasses'];
    }
    addressesHandlers() {
        return [function(){}];
    }
    expectedOutlets() {
        return ['reusingclasses'];
    }

    init() {
        // use the 4 cases from test/acceptance/navigation

        let h1 = document.createElement('h1');
        h1.textContent = 'Reusing Classes';
        this.outlets.reusingclasses.append(h1);
    }

    render() {
        super.render();
        this.sendTo(':guides.sidebar', 'setActiveLink', this.expectedAddresses());
    }
}

export default ReusingClassesRoute;
