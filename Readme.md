
# fis3-arrow-scaffold
  基于[Fis3-arrow(fisa)](https://www.npmjs.com/package/fis3-arrow)的多业务模块化脚手架

## 初始化
```
$ mkdir project
$ cd project
$ fis3 init zuojj/fis3-arrow-scaffold
或者
$ git clone https://github.com/zuojj/fis3-arrow-scaffold.git
$ cd  fis3-arrow-scaffold
```
## 目录树
├─common
│  ├─page
│  └─static
│      └─css
└─home
    ├─page
    ├─static
    │  ├─img
    │  └─js
    ├─test
    └─widget
        ├─login
        └─viewimg

## 引入公共组件库模块
```
cd project 
// FMUI 移动端组件库
git clone https://github.com/zuojj/fmui.git
// FDUI PC端组件库
git clone https://github.com/zuojj/fdui.git
```
