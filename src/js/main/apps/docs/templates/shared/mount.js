import { escapeHTML } from 'utils';

export default function mountExample() {
    return escapeHTML`
class MyRootApp {
    // ...
    mount() {
        return {
            '': RootRoute.addresses('root'),
            'about': AboutRoute.addresses('about'),
            'user/{user_id=\\\\d+}': UserApp.addresses('user'),
            'todo/{todo_id=\\\\d+}': TodoApp.addresses('todo'),
        };
    }
}
class UserApp {
    // ...
    mount() {
        return {
            '': UserRootRoute,
            'profile': UserProfileRoute,
        };
    }
}
class TodoApp {
    // ...
    mount() {
        return {
            '{action=\\\\w+}': TodoActionRoute,
        };
    }
}
    `;
}
