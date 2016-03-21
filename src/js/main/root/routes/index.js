import { Route } from 'ether';

class IndexRoute extends Route {
    expectedAddresses() {
        return ['index'];
    }
    addressesHandlers() {
        return [function(){}];
    }
    expectedOutlets() {
        return ['index'];
    }

    render() {
        let h1 = document.createElement('h1');
        h1.textContent = 'Hello, world!';
        this.outlets.index.append(h1);
        let link = document.createElement('a');
        link.href = this.linkTo('gettingStartedIndex');
        link.textContent = 'To Getting Started';
        this.outlets.index.append(link);
        this.sendTo('navbar', 'setActiveLink', this.expectedAddresses());
    }
}

export default IndexRoute;
