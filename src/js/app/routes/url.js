import { Route } from 'ether';

class URLRoute extends Route {
    expectedAddresses() {
        return ['url'];
    }
    addressesHandlers() {
        return ['receive'];
    }
    expectedOutlets() {
        return ['url'];
    }
    expectedParams() {
        return [];
    }

    // initialization code
    init() {
        let p = document.createElement('p');
        p.className = 'pathname';
        p.innerHTML = '<span class="prefix">pathname</span><span class="value"></span>';
        this.outlets.url.append(p);
        this.text = p.querySelector('.value');
    }

    // addresses handlers
    receive(url) {
        this.text.textContent = url;
    }
}

export default URLRoute;
