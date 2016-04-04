import { escapeHTML } from 'utils';

export default function mountExample() {
    return escapeHTML`
class MyRootApp extends RootApp {
    // ...
    mount() {
        return {
            '': RootRoute.addresses('root'),
            'about': AboutRoute.addresses('about'),
            'user/{user_id=\\\\d+}': UserApp.addresses('user'),
            'todo/{todo_id=\\\\d+}': TodoApp.addresses('todo'),
        };
    }
    mountConditionals() {
        return {
            '*': NotificationsWidgetRoute,
            '+user': UserWidgetRoute,
            '+about': AboutHeaderRoute,
            '!user,todo': [
                StaticWidgetRoute,
                StaticWidgetRoute,
            ],
        };
    }
}
class UserApp extends App {
    // ...
    mount() {
        return {
            '': UserRootRoute,
            'profile': UserProfileRoute,
        };
    }
}
class TodoApp extends App {
    // ...
    mount() {
        return {
            '{action=\\\\w+}': TodoActionRoute,
        };
    }
}
    `;
}
