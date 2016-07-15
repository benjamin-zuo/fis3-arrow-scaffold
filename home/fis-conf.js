// 命名空间
fis.set('namespace', 'home');

fis
.match('/widget/**.vm', {
    useSameNameRequire: true
})
.match('/static/**.js', {
    isMod: true
})

/**
 * -------------------------------------------------------
 * Production Environment
 * -------------------------------------------------------
 */

fis.media('prod')

.set('imgcdnurl', 'http://xxx.58cdn.com.cn/xxxx')
.set('jscsscdnurl', 'http://xxxx.58cdn.com.cn/xxxx')

.match('*.{scss,css,js}', {
    domain: '${jscsscdnurl}'
})
.match('*.{png,jpg,jpeg}', {
    domain: '${imgcdnurl}'
})

.match('*.{jpg,jpeg}', {
    useHash: true
})

// 兼容58WF框架
.set('templates', '/views')
.match('*.vm', {
    url: '/views/${namespace}$0',
    preprocessor: fis.plugin('extlang', {
        type: 'velocity'
    }),
    rExt: '.html'
});




/**
 * -------------------------------------------------------
 * RD Environment
 * -------------------------------------------------------
 */

fis.media('rd')
.set('templates', '/views')
.match('*', {
    deploy: fis.plugin('local-deliver', {
        to: '../output-arrow-rd'
    })
})
.match('*.vm', {
    url: '/views/${namespace}$0',
    preprocessor: fis.plugin('extlang', {
        type: 'velocity'
    }),
    rExt: '.html'
});