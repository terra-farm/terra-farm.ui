const mix = require('laravel-mix');

const destDir = 'public';

mix.sass('src/sass/site.scss', `${destDir}/css`)
    .copy('src/layouts', `${destDir}/layouts`)
    .copy('src/partials', `${destDir}/partials`);
