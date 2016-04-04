import { escapeHTML } from 'utils';

export default function conditionalMountExample() {
    return escapeHTML`
class MyRootApp {
    // ...
    mountConditionals() {
        return {
            '*': NotificationsWidgetRoute.addresses('notify'),
            '+user': UserWidgetRoute,
            '!user,todo': [
                StaticWidgetRoute,
                StaticWidgetRoute,
            ],
        };
    }
}
    `;
}
