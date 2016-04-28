# FMUI(Finance Mobile UI)移动端组件库

## 组件列表
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


