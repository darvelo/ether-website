import { App, makeOutlet } from 'ether';
import IndexRoute from './routes/index';
import TOCRoute from './routes/toc';
import template from './templates/index';
import highlightCode from './utils/highlight-code';

class GettingStartedApp extends App {
    expectedAddresses() {
        return [':gs'];
    }
    addressesHandlers() {
        return [function(){}];
    }
    expectedOutlets() {
        return ['gs'];
    }
    createOutlets(outlets) {
        let toc = outlets.toc = makeOutlet({
            tagName: 'aside',
            classNames: ['getting-started-toc'],
            mutable: true,
        });
        outlets.gs.append(toc.el);
        return outlets;
    }
    mount() {
        return {
            '': IndexRoute.addresses(':gs.index'),
        };
    }
    mountConditionals() {
        return {
            '+:gs.index':
                TOCRoute
                    .addresses(':gs.toc')
                    .outlets('toc'),
        };
    }

    init() {
        let outlet = this.outlets.gs;
        outlet.innerHTML = template();
        if (window.Worker) {
            this.highlighted = highlightCode(outlet);
        } else {
            this.highlighted = null;
        }
        this.sendTo(':gs.toc', 'generateTOC');
    }

    render() {
        this.sendTo(':.navbar', 'setActiveLink', this.expectedAddresses());
        return this.highlighted;
    }
}

export default GettingStartedApp;
