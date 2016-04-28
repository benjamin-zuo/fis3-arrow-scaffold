fis.require('arrow')(fis);

// 命名空间
fis.config.set('namespace', 'common');


fis

.match('/static/(**).js', {
    isMod: true
})

.match('/widget/**.vm', {
    useSameNameRequire: true
})

// 公共模块图片记入map.json
.match('/static/img/demo/*.{png,jpg}', {
    useMap: true
});


/**
 * -------------------------------------------------------
 * Production Environment
 * -------------------------------------------------------
 */


// 静态资源发布CDN地址
var domainURL = 'http://j1.cdn.com.cn/jr';

fis.media('prod')

.match('*.{scss,css,js,png,jpg}', {
    domain: domainURL
})
