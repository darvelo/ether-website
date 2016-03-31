import { escapeHTML } from 'utils';

export default function twitterTwitterRouteCSS() {
    return escapeHTML`
.tweet-container.ether-prerendering,
.tweet-container.ether-prerendered,
.tweet-container.ether-deactivated {
    display: none;
}

.tweet-container.ether-deactivating {
    animation: 0.4s cubic-bezier(0.60, -.50, .50, 1) forwards bounce-down;
}

.tweet-container.ether-rendering:not(.ether-rendered),
.tweet-container.ether-rendered {
    animation: 0.4s cubic-bezier(.50, 0, 0.40, 1.50) bounce-up;
}
    `;
}
