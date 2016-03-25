import { Route } from 'ether';
import template from '../templates/index';

class GettingStartedIndexRoute extends Route {
    expectedAddresses() {
        return [':gs.index'];
    }
    addressesHandlers() {
        return [function(){}];
    }
    expectedOutlets() {
        return ['content'];
    }

    highlightCode(outlet) {
        return new Promise(resolve => {
            let slice = Array.prototype.slice;
            let worker = new Worker('/public/vendor/scripts/highlight-worker.js');
            let types = {
                html: {
                    done: false,
                    blocks: slice.call(outlet.querySelectorAll('pre code.html')),
                },
                js: {
                    done: false,
                    blocks: slice.call(outlet.querySelectorAll('pre code.js')),
                }
            };

            function allDone() {
                return Object.keys(types).every(type => types[type].done);
            }

            worker.onmessage = function onmessage(event) {
                let t = types[event.data.type];
                let blocks = event.data.blocks;
                t.blocks.forEach((block, i) => {
                    block.innerHTML = blocks[i];
                });
                t.done = true;
                if (allDone()) {
                    worker.terminate();
                    resolve();
                }
            };

            Object.keys(types).forEach(type => {
                worker.postMessage({
                    type,
                    blocks: types[type].blocks.map(block => block.innerHTML)
                });
            });
        });
    }

    init() {
        let outlet = this.outlets.content;
        outlet.innerHTML = template();
        if (window.Worker) {
            this.highlighted = this.highlightCode(outlet);
        } else {
            this.highlighted = null;
        }
        this.sendTo(':gs.toc', 'generateTOC');
    }

    prerender() {
        return this.highlighted;
    }

    render() {
        this.sendTo(':.navbar', 'setActiveLink', this.expectedAddresses());
    }
}

export default GettingStartedIndexRoute;
