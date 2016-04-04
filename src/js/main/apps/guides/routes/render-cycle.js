import { ScrollRoute, highlightCode } from 'utils';
import template from '../templates/render-cycle';

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

    addHighlightedClass(outlet) {
        outlet.el.classList.add('highlighted');
    }

    init() {
        let hrefs = {
            rootAppDocs: this.linkTo(':docs.rootapp'),
            sharedMethods: this.linkTo(':docs.shared'),
        };
        let outlet = this.outlets.rendercycle;
        outlet.innerHTML = template({hrefs});
        if (window.Worker) {
            this.highlighted = highlightCode(outlet).then(() => {
                this.addHighlightedClass(outlet);
            });
        } else {
            this.highlighted = null;
            this.addHighlightedClass(outlet);
        }
    }

    render() {
        super.render();
        this.sendTo(':guides.sidebar', 'setActiveLink', this.expectedAddresses());
        return this.highlighted;
    }
}

export default RenderCycleRoute;
