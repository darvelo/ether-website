import { escapeHTML } from 'utils';

export default function stateExample() {
    return escapeHTML`
// this.state during the render() call
// on a class not currently already rendered
{
    deactivating: false,
    deactivated:  false,
    prerendering: false,
    prerendered:  false,
    rendering:    true,
    rendered:     false
}
    `;
}
