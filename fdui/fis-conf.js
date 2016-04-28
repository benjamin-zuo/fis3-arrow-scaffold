fis.require('arrow')(fis);

// 命名空间
fis.config.set('namespace', 'fdui');

fis.hook('commonjs', {
    paths: {
        jquery: '/components/jquery'
    }
});




fis

.match('/widget/*/*.vm', {
    useSameNameRequire: true
})

// ui组件
.match('/static/ui/(**.js)', {
    isMod: true
})



/**
 * -------------------------------------------------------
 * Production Environment
 * -------------------------------------------------------
 */


// 静态资源发布CDN地址
var domainURL = 'http://j1.cdn.com.cn/jr';

fis.media('prod')

.match('/static/ui/**.js', {
    packTo: '/static/fdui.js'
})

.match('*.{scss,css,js,png,jpg}', {
    domain: domainURL
})
