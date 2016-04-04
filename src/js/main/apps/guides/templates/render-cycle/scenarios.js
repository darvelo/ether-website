import { escapeHTML } from 'utils';

export function scenario0() {
    return escapeHTML`
Scenario 0: first navigation after RootApp construction
──o──o──o
    `;
}
export function scenario1() {
    return escapeHTML`
Scenario 1: going from a route to a sibling route
──o--o
  └──o
    `;
}
export function scenario2() {
    return escapeHTML`
Scenario 2: going from a route to a route on a sibling app
──o--o
  └──o──o
    `;
}
export function scenario3() {
    return escapeHTML`
Scenario 3: going from a deep route to a route on its parent app's parent app
──o--o--o
  └──o
    `;
}
export function scenario4() {
    return escapeHTML`
Scenario 4: going from a deep route to a deep route on a different app
──o--o--o
  └──o──o
    `;
}

export function scenarios() {
    return escapeHTML`
${scenario0()}

${scenario1()}

${scenario2()}

${scenario3()}

${scenario4()}
    `;
}
