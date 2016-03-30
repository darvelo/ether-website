import { Route } from 'ether';
import template from '../templates/sidebar';

class SidebarRoute extends Route {
    expectedAddresses() {
        return [':guides.sidebar'];
    }
    addressesHandlers() {
        return ['receive'];
    }
    expectedOutlets() {
        return ['sidebar'];
    }

    init(linksData) {
        let ctx = {
            linksData,
            linkTo: this.linkTo.bind(this)
        };
        let outlet = this.outlets.sidebar;
        outlet.innerHTML = template(ctx);
        this.listItems = Array.prototype.slice.call(outlet.querySelectorAll('li'));
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

export default SidebarRoute;
