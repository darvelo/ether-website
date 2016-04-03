import { escapeHTML } from 'utils';

export function paramsExample1() {
    return escapeHTML`
// params
{
    todo_id: "1",
    action: "detail"
}
// queryParams
{
    color: "red",
    bold: "true",
    font_size: "16"
}
// diff
{
    params: {
        todo_id: [undefined, "1"],
        action: [undefined, "detail"]
    },
    queryParams: {
        color: [undefined, "red"],
        bold: [undefined, "true"],
        font_size: [undefined, "16"]
    }
}
    `;
}

export function paramsExample2() {
    return escapeHTML`
// params - todo_id has changed
{
    todo_id: "2",
    action: "detail"
}
// queryParams - same as before
{
    color: "red",
    bold: "true",
    font_size: "16"
}
// diff
// - contains the differences vs. the last call
// - a param is null if no difference
// - a base property is null is none of its params differed (like queryParams here)
// - the entire diff argument is null if neither base property had any differences
{
    params: {
        todo_id: ["1", "2"]
        // "action" missing since there was no difference from the last call
    },
    // no difference in any of the queryParams compared to the last call
    queryParams: null
}
    `;
}
