# 业务模块 - HOME
依赖common、fmui模块，其中fmui模块可从`git clone https://github.com/zuojj/fmui.git`下载

## 示例

**跨模块引用图片**
```html
// 引用common模块中图片，注意引号交替
<img src='#uri("common:static/img/demo/lin.png")' width="24" height="24">
```

**跨模块引用js文件**
```javascript
var $ = require('fmui:components/zepto');
require('fmui:static/ui/validate/validate');
require('fmui:static/ui/form/form');
require('fmui:static/ui/toast/toast');
require('fmui:static/ui/cityselect/cityselect');
require('fmui:static/ui/autoclear/autoclear');
```

**跨模块引用widget**
```html
#widget("common:widget/template/template.vm")
```
