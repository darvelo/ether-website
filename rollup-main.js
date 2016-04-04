var rollup = require('rollup');
var babel = require('rollup-plugin-babel');

var dest = 'static/scripts/';
var banner = '/* Ether Website App */';

rollup.rollup({
    entry: 'src/js/main/index.js',
    banner: banner,
    plugins: [
        babel(),
    ],
}).then(function (bundle) {
    return Promise.all([
        bundle.write({
            format: 'iife',
            globals: {
                ether: 'Ether',
                utils: 'utils',
            },
            exports: 'auto',
            moduleName: 'MainApp',
            dest: dest + 'main.js',
        }),
    ]);
}).catch(function (err) {
    console.error(err);
});
