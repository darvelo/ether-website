import { App, makeOutlet } from 'ether';

// routes
import SidebarRoute from './routes/sidebar';
import IndexRoute from './routes/index';
import RenderCycleRoute from './routes/render-cycle';
import ReusingClassesRoute from './routes/reusing-classes';
import BestPracticesRoute from './routes/best-practices';

function addSidebarLinksData() {
    return [
        {
            text: 'Overview',
            address: ':guides.index',
        },
        {
            text: 'The Render Cycle',
            address: ':guides.rendercycle',
        },
        {
            text: 'Reusing Classes',
            address: ':guides.reusingclasses',
        },
        // {
        //     text: 'Best Practices',
        //     address: ':guides.bestpractices',
        // },
    ];
}

class GuidesApp extends App {
    expectedAddresses() {
        return [':guides'];
    }
    addressesHandlers() {
        return [function(){}];
    }
    expectedOutlets() {
        return ['guides'];
    }
    createOutlets(outlets) {
        outlets.docs = makeOutlet({
            el: outlets.guides.el,
            append: [
                outlets.sidebar = makeOutlet({
                    tagName: 'nav',
                    classNames: ['guides-nav'],
                    mutable: true,
                }),
                outlets.index = makeOutlet({
                    tagName: 'article',
                    classNames: ['guides-article'],
                    mutable: true,
                }),
                outlets.rendercycle = makeOutlet({
                    tagName: 'article',
                    classNames: ['guides-article', 'guides-render-cycle'],
                    mutable: true,
                }),
                outlets.reusingclasses = makeOutlet({
                    tagName: 'article',
                    classNames: ['guides-article'],
                    mutable: true,
                }),
                // outlets.bestpractices = makeOutlet({
                //     tagName: 'article',
                //     classNames: ['guides-article'],
                //     mutable: true,
                // }),
            ],
        });
        return outlets;
    }
    mount() {
        return {
            '': IndexRoute
                    .addresses(':guides.index')
                    .outlets('index'),
            'the-render-cycle':
                RenderCycleRoute
                    .addresses(':guides.rendercycle')
                    .outlets('rendercycle'),
            'reusing-classes':
                ReusingClassesRoute
                    .addresses(':guides.reusingclasses')
                    .outlets('reusingclasses'),
            // 'best-practices':
            //     BestPracticesRoute
            //         .addresses(':guides.bestpractices')
            //         .outlets('bestpractices'),
        };
    }
    mountConditionals() {
        return {
            '*': SidebarRoute
                    .addresses(':guides.sidebar')
                    .outlets('sidebar')
                    .setup(addSidebarLinksData),
        };
    }

    render() {
        super.render();
        this.sendTo(':.navbar', 'setActiveLink', this.expectedAddresses());
    }
}

export default GuidesApp;
