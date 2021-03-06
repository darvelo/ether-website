import { Route } from 'ether';

class PathbarRoute extends Route {
    expectedAddresses() {
        return ['pathbar'];
    }
    addressesHandlers() {
        return ['receive'];
    }
    expectedOutlets() {
        return ['pathbar'];
    }
    expectedParams() {
        return [];
    }

    // initialization code
    init() {
        let p = document.createElement('p');
        p.className = 'pathname';
        p.innerHTML = '<span class="prefix">pathname</span><span class="value"></span>';
        this.outlets.pathbar.appendChild(p);
        this.text = p.querySelector('.value');
    }

    // addresses handlers
    receive(url) {
        this.text.textContent = url;
    }
}

export default PathbarRoute;
