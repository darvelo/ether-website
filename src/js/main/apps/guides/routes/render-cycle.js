import { ScrollRoute } from 'utils';

class RenderCycleRoute extends ScrollRoute {
    expectedAddresses() {
        return [':guides.rendercycle'];
    }
    addressesHandlers() {
        return [function(){}];
    }
    expectedOutlets() {
        return ['rendercycle'];
    }

    init() {
        // use the 4 cases from test/acceptance/navigation

        let h1 = document.createElement('h1');
        h1.textContent = 'The Render Cycle';
        this.outlets.rendercycle.append(h1);
    }

    render() {
        super.render();
        this.sendTo(':guides.sidebar', 'setActiveLink', this.expectedAddresses());
    }
}

export default RenderCycleRoute;
