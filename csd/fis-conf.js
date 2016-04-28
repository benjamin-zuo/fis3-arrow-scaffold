fis.require('arrow')(fis);

// 命名空间
fis.set('namespace', 'csd');

// fis3默认使用commonjs规范, 从零开始的项目不建议使用此配置，多业务跨模块时容易出错
/*fis.hook('commonjs', {
    packages: [
        {
            name: 'fmui',
            location: 'fmui:static/widget',
            main: 'index.js'
        },{
            name: 'zepto',
            location: 'fmui:components/zepto/',
            main: 'zepto.js'
        }
    ]
});
*/


fis
.match('/widget/**.vm', {
    useSameNameRequire: true
})

/**
 * -------------------------------------------------------
 * Production Environment
 * -------------------------------------------------------
 */

// 静态资源发布CDN地址
var domainURL = 'http://j1.cdn.com.cn/jr';

fis.media('prod')

.match('*.{scss,css,js}', {
    domain: domainURL
})