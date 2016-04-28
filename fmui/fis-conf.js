fis.require('arrow')(fis);

// 命名空间
fis.config.set('namespace', 'fmui');

fis.hook('commonjs', {
    paths: {
        zepto: '/components/zepto'
    }
});




fis
.match('/widget/*/*.vm', {
    useSameNameRequire: true
})
.match('/static/ui/(**.js)', {
    isMod: true
});



/**
 * -------------------------------------------------------
 * Production Environment
 * -------------------------------------------------------
 */


// 静态资源发布CDN地址
var domainURL = 'http://j1.cdn.com.cn/jr';

fis.media('prod')
.match('/static/**.scss', {
    useHash: true,
    optimizer: fis.plugin('clean-css')
})
.match('/static/ui/**.js', {
    packTo: '/static/fmui.js'
})
.match('*.{scss,css,js,png,jpg}', {
    domain: domainURL
})
