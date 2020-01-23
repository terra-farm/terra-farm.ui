const mix = require('laravel-mix');

const destDir = 'public';

mix.extend(
    'zip',
    new class {
        register(src, dest, file) {
            this.src = src;
            this.dest = dest;
            this.file = file;
        }

        dependencies() {
            this.requiresReload = true;
            return ['filemanager-webpack-plugin@2.*']
        }

        webpackRules() { }

        webpackPlugins() {
            const FileManagerPlugin = require('filemanager-webpack-plugin');

            return [
                new FileManagerPlugin({
                    onEnd: {
                        archive: [
                            { source: this.src, destination: `${this.dest}/${this.file}` }                            
                        ]
                    }
                })
            ]
        }

        // ...
    }()
);

mix.sass('src/sass/site.scss', `${destDir}/css`)
    .copy('src/helpers', `${destDir}/helpers`)
    .copy('src/layouts', `${destDir}/layouts`)
    .copy('src/partials', `${destDir}/partials`)
    .zip('public', 'build', 'bundle.zip');
