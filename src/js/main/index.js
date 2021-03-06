import { RootApp, makeOutlet } from 'ether';

// apps
import GettingStartedApp from './apps/getting-started/index';
import GuidesApp from './apps/guides/index';
import DocsApp from './apps/docs/index';

// routes
import IndexRoute from './routes/index';
import NavBarRoute from './routes/navbar';
import FooterRoute from './routes/footer';
import The404Route from './routes/404';

function navbarLinksData() {
    return [
        {
            text: 'Home',
            address: ':.index',
        },
        {
            text: 'Getting Started',
            address: ':gs',
            dest: ':gs.index',
        },
        {
            text: 'Guides',
            address: ':guides',
            dest: ':guides.index',
        },
        {
            text: 'Docs',
            address: ':docs',
            dest: ':docs.index',
        }
    ];
}

class EtherWebsite extends RootApp {
    expectedOutlets() {
        return ['main'];
    }
    createOutlets(outlets) {
        outlets.main = makeOutlet({
            el: outlets.main.el,
            classNames: ['main-app'],
            append: [
                outlets.navbar = makeOutlet({
                    tagName: 'nav',
                    classNames: ['navbar'],
                    mutable: true,
                }),
                outlets.index = makeOutlet({
                    tagName: 'section',
                    classNames: ['index'],
                    mutable: true,
                }),
                outlets.gs = makeOutlet({
                    tagName: 'section',
                    classNames: ['getting-started'],
                    mutable: true,
                }),
                outlets.guides = makeOutlet({
                    tagName: 'section',
                    classNames: ['guides', 'container'],
                    mutable: true,
                }),
                outlets.docs = makeOutlet({
                    tagName: 'section',
                    classNames: ['docs', 'container'],
                    mutable: true,
                }),
                outlets.the404 = makeOutlet({
                    tagName: 'section',
                    classNames: ['the404', 'container'],
                    mutable: true,
                }),
                outlets.footer = makeOutlet({
                    tagName: 'footer',
                    classNames: ['main-footer'],
                    mutable: true,
                }),
            ]
        });
        return outlets;
    }
    init() {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
    }
    mount() {
        return {
            '': IndexRoute
                    .addresses(':.index')
                    .outlets('index'),
            '404': The404Route
                    .addresses(':.404')
                    .outlets('the404'),
            'getting-started':
                GettingStartedApp
                    .addresses(':gs')
                    .outlets('gs'),
            'guides':
                GuidesApp
                    .addresses(':guides')
                    .outlets('guides'),
            'docs':
                DocsApp
                    .addresses(':docs')
                    .outlets('docs'),
        };
    }
    mountConditionals() {
        return {
            '*': [
                NavBarRoute
                    .addresses(':.navbar')
                    .outlets('navbar')
                    .setup(navbarLinksData),
                FooterRoute
                    .addresses(':.footer')
                    .outlets('footer'),
            ],
        };
    }
}

export default EtherWebsite;
