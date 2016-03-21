var rollup = require('rollup');
var babel = require('rollup-plugin-babel');

var dest = 'public/scripts/';
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
            },
            exports: 'auto',
            moduleName: 'MainApp',
            dest: dest + 'main.js',
        }),
    ]);
}).catch(function (err) {
    console.error(err);
});
