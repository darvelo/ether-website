import { Route } from 'ether';
import template from '../templates/index';
import DownloadView from '../views/download-btns';

class IndexRoute extends Route {
    expectedAddresses() {
        return [':.index'];
    }
    addressesHandlers() {
        return [function(){}];
    }
    expectedOutlets() {
        return ['index'];
    }

    init() {
        let outlet = this.outlets.index;
        outlet.innerHTML = template();
        let downloadArea = outlet.querySelector('.download-links');
        this.downloadView = new DownloadView(downloadArea);
    }

    render() {
        this.sendTo(':.navbar', 'setActiveLink', this.expectedAddresses());
    }
}

export default IndexRoute;
