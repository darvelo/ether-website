var rollup = require('rollup');
var babel = require('rollup-plugin-babel');

var dest = 'static/scripts/';
var banner = '/* Ether Website App Utils */';

rollup.rollup({
    entry: 'src/js/utils/index.js',
    banner: banner,
    plugins: [
        babel(),
    ],
}).then(function (bundle) {
    return Promise.all([
        bundle.write({
            format: 'iife',
            exports: 'auto',
            moduleName: 'utils',
            dest: dest + 'utils.js',
            globals: {
                ether: 'Ether',
            },
        }),
    ]);
}).catch(function (err) {
    console.error(err);
});
