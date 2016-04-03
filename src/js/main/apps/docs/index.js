import { App, makeOutlet } from 'ether';

// routes
import SidebarRoute from './routes/sidebar';
import IndexRoute from './routes/index';
import RootAppRoute from './routes/rootapp';
import AppRoute from './routes/app';
import RouteRoute from './routes/route';
import OutletRoute from './routes/outlet';
import MutableOutletRoute from './routes/mutable-outlet';
import SharedRoute from './routes/shared';

function addSidebarLinksData() {
    return [
        {
            text: 'Overview',
            address: ':docs.index',
        },
        {
            text: 'RootApp',
            address: ':docs.rootapp',
        },
        {
            text: 'App',
            address: ':docs.app',
        },
        {
            text: 'Route',
            address: ':docs.route',
        },
        {
            text: 'Outlet',
            address: ':docs.outlet',
        },
        {
            text: 'MutableOutlet',
            address: ':docs.mutableoutlet',
        },
        {
            text: 'Shared Methods and Properties',
            address: ':docs.shared',
        }
    ];
}

class DocsApp extends App {
    expectedAddresses() {
        return [':docs'];
    }
    addressesHandlers() {
        return [function(){}];
    }
    expectedOutlets() {
        return ['docs'];
    }
    createOutlets(outlets) {
        outlets.docs = makeOutlet({
            el: outlets.docs.el,
            append: [
                outlets.sidebar = makeOutlet({
                    tagName: 'nav',
                    classNames: ['docs-nav'],
                    mutable: true,
                }),
                outlets.index = makeOutlet({
                    tagName: 'article',
                    classNames: ['docs-article'],
                    mutable: true,
                }),
                outlets.rootapp = makeOutlet({
                    tagName: 'article',
                    classNames: ['docs-article'],
                    mutable: true,
                }),
                outlets.app = makeOutlet({
                    tagName: 'article',
                    classNames: ['docs-article'],
                    mutable: true,
                }),
                outlets.route = makeOutlet({
                    tagName: 'article',
                    classNames: ['docs-article'],
                    mutable: true,
                }),
                outlets.outlet = makeOutlet({
                    tagName: 'article',
                    classNames: ['docs-article'],
                    mutable: true,
                }),
                outlets.mutableoutlet = makeOutlet({
                    tagName: 'article',
                    classNames: ['docs-article'],
                    mutable: true,
                }),
                outlets.shared = makeOutlet({
                    tagName: 'article',
                    classNames: ['docs-article', 'docs-shared-methods'],
                    mutable: true,
                }),
            ],
        });
        return outlets;
    }
    mount() {
        return {
            '': IndexRoute
                    .addresses(':docs.index')
                    .outlets('index'),
            'root-app': RootAppRoute
                    .addresses(':docs.rootapp')
                    .outlets('rootapp'),
            'app': AppRoute
                    .addresses(':docs.app')
                    .outlets('app'),
            'route': RouteRoute
                    .addresses(':docs.route')
                    .outlets('route'),
            'outlet': OutletRoute
                    .addresses(':docs.outlet')
                    .outlets('outlet'),
            'mutable-outlet': MutableOutletRoute
                    .addresses(':docs.mutableoutlet')
                    .outlets('mutableoutlet'),
            'shared-methods-and-properties': SharedRoute
                    .addresses(':docs.shared')
                    .outlets('shared'),
        };
    }
    mountConditionals() {
        return {
            '*': SidebarRoute
                    .addresses(':docs.sidebar')
                    .outlets('sidebar')
                    .setup(addSidebarLinksData),
        };
    }

    render() {
        super.render();
        this.sendTo(':.navbar', 'setActiveLink', this.expectedAddresses());
    }
}

export default DocsApp;
