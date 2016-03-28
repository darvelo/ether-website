export default function highlightCode(outlet) {
    return new Promise(resolve => {
        let slice = Array.prototype.slice;
        let worker = new Worker('/public/vendor/scripts/highlight-worker.js');
        let types = {
            html: {
                done: false,
                blocks: slice.call(outlet.querySelectorAll('pre code.html')),
            },
            js: {
                done: false,
                blocks: slice.call(outlet.querySelectorAll('pre code.js')),
            }
        };

        function allDone() {
            return Object.keys(types).every(type => types[type].done);
        }

        worker.onmessage = (event) => {
            let t = types[event.data.type];
            let blocks = event.data.blocks;
            t.blocks.forEach((block, i) => {
                block.innerHTML = blocks[i];
            });
            t.done = true;
            if (allDone()) {
                worker.terminate();
                resolve();
            }
        };

        Object.keys(types).forEach(type => {
            worker.postMessage({
                type,
                blocks: types[type].blocks.map(block => block.innerHTML)
            });
        });
    });
}
