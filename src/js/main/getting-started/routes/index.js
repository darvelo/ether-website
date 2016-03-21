import { Route } from 'ether';

class GettingStartedIndexRoute extends Route {
    expectedAddresses() {
        return ['gettingStartedIndex'];
    }
    addressesHandlers() {
        return [function(){}];
    }
    expectedOutlets() {
        return ['gettingStarted'];
    }
    render() {
        let h1 = document.createElement('h1');
        h1.textContent = 'Getting Started Index';
        this.outlets.gettingStarted.append(h1);
        let link = document.createElement('a');
        link.href = this.linkTo('index');
        link.textContent = 'To Root';
        this.outlets.gettingStarted.append(link);
        this.sendTo('navbar', 'setActiveLink', this.expectedAddresses());
    }
}

export default GettingStartedIndexRoute;
