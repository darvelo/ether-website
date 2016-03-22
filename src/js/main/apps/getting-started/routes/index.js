import { Route } from 'ether';

class GettingStartedIndexRoute extends Route {
    expectedAddresses() {
        return [':gs.index'];
    }
    addressesHandlers() {
        return [function(){}];
    }
    expectedOutlets() {
        return ['gs'];
    }
    render() {
        let h1 = document.createElement('h1');
        h1.textContent = 'Getting Started Index';
        this.outlets.gs.append(h1);
        let link = document.createElement('a');
        link.href = this.linkTo(':.index');
        link.textContent = 'To Root';
        this.outlets.gs.append(link);
        this.sendTo(':.navbar', 'setActiveLink', this.expectedAddresses());
    }
}

export default GettingStartedIndexRoute;
