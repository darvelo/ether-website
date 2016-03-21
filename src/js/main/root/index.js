import { RootApp, makeOutlet } from 'ether';
import GettingStartedApp from '../getting-started/index';
import IndexRoute from './routes/index';

class EtherWebsite extends RootApp {
    expectedOutlets() {
        return ['main'];
    }
    createOutlets(outlets) {
        outlets.main = makeOutlet({
            el: outlets.main.get(),
            classNames: ['main-app'],
            append: [
                outlets.index = makeOutlet({
                    tagName: 'section',
                    classNames: ['index'],
                    mutable: true,
                }),
                outlets.gettingStarted = makeOutlet({
                    tagName: 'section',
                    classNames: ['getting-started'],
                    mutable: true,
                }),
            ]
        });
        return outlets;
    }
    mount() {
        return {
            '': IndexRoute
                    .addresses('index')
                    .outlets('index'),
            'getting-started':
                GettingStartedApp
                    .addresses('gettingStarted')
                    .outlets('gettingStarted'),
        };
    }
    mountConditionals() {
        return {

        };
    }
}

export default EtherWebsite;
