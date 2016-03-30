import { ScrollRoute } from 'utils';

class BestPracticesRoute extends ScrollRoute {
    expectedAddresses() {
        return [':guides.bestpractices'];
    }
    addressesHandlers() {
        return [function(){}];
    }
    expectedOutlets() {
        return ['bestpractices'];
    }

    init() {
        // choosing addresses for apps and routes

        let h1 = document.createElement('h1');
        h1.textContent = 'Best Practices';
        this.outlets.bestpractices.append(h1);
    }

    render() {
        super.render();
        this.sendTo(':guides.sidebar', 'setActiveLink', this.expectedAddresses());
    }
}

export default BestPracticesRoute;
