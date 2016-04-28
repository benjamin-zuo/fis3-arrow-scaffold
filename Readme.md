
# fis3-arrow-scaffold
  基于Fis3-arrow的多业务模块化脚手架，内置FMUI(Finance Mobile UI)和FDUI(Finance Desktop UI)组件库，持续集成中...
  
## FMUI
具体参见FMUI README.md
<img src="https://raw.githubusercontent.com/benjamin-zuo/fis3-arrow-scaffold/master/screenshot-fmui.png" width="375" height="667" alt="FMUI">

## 安装fis3
建议fis3 官网支持Node版本
```
$ npm install -g fis3
```

## 初始化
```
$ mkdir scaffold-demo
$ cd scaffold-demo
$ fis3 init benjamin-zuo/fis3-arrow-scaffold
或者
$ git clone https://github.com/benjamin-zuo/fis3-arrow-scaffold.git
$ cd  fis3-arrow-scaffold
$ npm install // 安装依赖
```

## 运行&预览
```
$ cd cfq
$ fis3 release   // release CFQ业务模块
$ fis3 release -r ../fmui // release fmui组件库
$ fis3 release -r ../common  // release 公共业务模块
$ fis3 release -r ../csd   // release CSD业务模块
$ fis3 server start
```

## 发布prod
```
$ cd cfq
$ fis3 release prod //默认发布cfq同级，生成output-arrow文件夹
$ fis3 release -r ../fmui prod
$ fis3 release -r ../common prod
$ fis3 release -r ../csd prod
```

## 指定发布目录
```
$ fis3 release prod -d ../output-arrow 当然也可以在fis-conf.js中配置
```


# FMUI(Finance Mobile UI)移动端组件库

## 组件列表（已完成）
*   ActionSheet     上拉列表
*   Button          按钮
*   Checkbox        单复选框
*   CitySelect      省市区三级联动
*   Countdown       倒计时
*   Dialog          弹窗
*   Flextbox        伸缩盒
*   Form            表单
*   List            列表
*   Notice          顶部通知
*   Overlay         遮罩层
*   Search          搜索框
*   Slider          幻灯片
*   Switch          滑动开关
*   Tab             Tab切换
*   Toast           Toast提示
*   Validate        表单校验

## 组件使用
```
// 上拉列表
$.actionSheet({
    items: {
        '选项一': function() {
            alert('A');
        },
        '选项二': function() {
            alert('B');
        }
    }
}).on('destroy', function() {
    alert('=====destroy=====');
});
```
```
// 省市区三级联动
$('#citySelector, #addressResident').citySelect({
    url: '/test/city',
    province: {
        data: pdata
    };
});
```

## 预览及发布
```
cd fmui
// 预览
fis3 release 
// 实时预览
fis3 release -wL
// 发布
fis3 release prod
```

## 备注
1. .tmpl文件建议以下划线开头命名，这样编译时不会产出，同时解决和同目录下与js同名时编译出现bug问题，或者在fis-conf.js中配置不产出。




## License 

(The MIT License)

Copyright (c) 2016 benjamin-zuo &lt;cuew1987@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
