var rollup = require('rollup');
var babel = require('rollup-plugin-babel');

var dest = 'public/scripts/';
var banner = '/* My Twitter App */';

rollup.rollup({
    entry: 'src/js/app/root-app.js',
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
            moduleName: 'TwitterApp',
            dest: dest + 'app.js',
        }),
    ]);
}).catch(function (err) {
    console.error(err);
});
