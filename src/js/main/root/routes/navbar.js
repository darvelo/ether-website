import { Route } from 'ether';
import template from '../templates/navbar';

class NavBarRoute extends Route {
    expectedAddresses() {
        return ['navbar'];
    }
    addressesHandlers() {
        return ['receive'];
    }
    expectedOutlets() {
        return ['navbar'];
    }

    init(linksData) {
        let ctx = {
            linksData,
            linkTo: this.linkTo.bind(this)
        };
        let element = this.outlets.navbar.get();
        element.innerHTML = template(ctx);
        this.listItems = Array.prototype.slice.call(element.querySelectorAll('li'));
    }

    receive(message, data) {
        switch(message) {
            case 'setActiveLink':
                this.setActiveLink(data);
                break;
            default:
                break;
        }
    }

    setActiveLink(addresses) {
        this.listItems.forEach(li => {
            let liAddr = li.getAttribute('data-address');
            if (addresses.some(addr => addr === liAddr)) {
                li.classList.add('active');
            } else {
                li.classList.remove('active');
            }
        });
    }
}

export default NavBarRoute;
