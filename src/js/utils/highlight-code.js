import uuid from 'uuid';

let worker = new Worker('/static/webworkers/highlight-worker.js');

export default function highlightCode(outlet) {
    return new Promise(resolve => {
        let slice = Array.prototype.slice;
        let jobs = {};
        ['html', 'css', 'js'].forEach(ft => {
            let id = uuid.v4();
            let els = slice.call(outlet.querySelectorAll(`pre code.${ft}`));
            jobs[id] = {
                id,
                ft,
                done: false,
                els,
            };
        });

        function allDone() {
            return Object.keys(jobs).every(id => jobs[id].done);
        }

        function onMessage(event) {
            let job = jobs[event.data.id];
            if (!job) {
                return;
            }

            let blocks = event.data.blocks;
            job.els.forEach((el, i) => {
                el.innerHTML = blocks[i];
            });
            job.done = true;
            if (allDone()) {
                worker.removeEventListener('message', onMessage, false);
                resolve();
            }
        }

        worker.addEventListener('message', onMessage, false);

        Object.keys(jobs).forEach(id => {
            let job = jobs[id];
            worker.postMessage({
                id: job.id,
                ft: job.ft,
                blocks: job.els.map(el => el.innerHTML)
            });
        });
    });
}
