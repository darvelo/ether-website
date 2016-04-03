import { ScrollApp, highlightCode } from 'utils';
import IndexRoute from './routes/index';
import template from './templates/index';

class GettingStartedApp extends ScrollApp {
    expectedAddresses() {
        return [':gs'];
    }
    addressesHandlers() {
        return [function(){}];
    }
    expectedOutlets() {
        return ['gs'];
    }
    mount() {
        return {
            '': IndexRoute.addresses(':gs.index'),
        };
    }

    addHighlightedClass() {
        this.outlets.gs.el.classList.add('highlighted');
    }

    init() {
        let hrefs = {
            'reusingClassesGuide': this.linkTo(':guides.reusingclasses'),
            'sharedPropsDocs': this.linkTo(':docs.shared'),
            'rootAppDocs': this.linkTo(':docs.rootapp'),
            'renderCycleGuide': this.linkTo(':guides.rendercycle'),
            'guides': this.linkTo(':guides.index'),
            'docs': this.linkTo(':docs.index'),
        };
        let outlet = this.outlets.gs;
        outlet.innerHTML = template({hrefs});
        if (window.Worker) {
            this.highlighted = highlightCode(outlet).then(() => {
                this.addHighlightedClass();
            });
        } else {
            this.highlighted = null;
            this.addHighlightedClass();
        }
    }

    render() {
        super.render();
        this.sendTo(':.navbar', 'setActiveLink', this.expectedAddresses());
        return this.highlighted;
    }
}

export default GettingStartedApp;
