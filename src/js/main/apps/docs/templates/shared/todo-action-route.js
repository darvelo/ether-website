import { escapeHTML } from 'utils';

export default function todoActionRoute() {
    return escapeHTML`
class TodoActionRoute extends Route {
    // ...
    expectedParams() {
        return ['todo_id', 'action'];
    }
}
    `;
}
