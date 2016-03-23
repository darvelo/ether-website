import { RootApp, makeOutlet } from 'ether';
import GettingStartedApp from './apps/getting-started/index';
import IndexRoute from './routes/index';
import NavBarRoute from './routes/navbar';
import FooterRoute from './routes/footer';

function navbarLinksData() {
    return [
        {
            text: 'Home',
            address: ':.index',
        },
        {
            text: 'Getting Started',
            address: ':gs.index',
        },
    ];
}

class EtherWebsite extends RootApp {
    expectedOutlets() {
        return ['main'];
    }
    createOutlets(outlets) {
        outlets.main = makeOutlet({
            el: outlets.main.get(),
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
                outlets.footer = makeOutlet({
                    tagName: 'footer',
                    classNames: ['main-footer'],
                    mutable: true,
                }),
            ]
        });
        return outlets;
    }
    mount() {
        return {
            '': IndexRoute
                    .addresses(':.index')
                    .outlets('index'),
            'getting-started':
                GettingStartedApp
                    .addresses(':gs')
                    .outlets('gs'),
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
