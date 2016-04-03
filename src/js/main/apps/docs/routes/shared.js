import { ScrollRoute, highlightCode } from 'utils';
import template from '../templates/shared';

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

    addHighlightedClass(outlet) {
        outlet.el.classList.add('highlighted');
    }

    init() {
        let hrefs = {
            'renderCycleGuide': this.linkTo(':guides.rendercycle'),
        };
        let outlet = this.outlets.shared;
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
        this.sendTo(':docs.sidebar', 'setActiveLink', this.expectedAddresses());
        return this.highlighted;
    }
}

export default SharedRoute;
