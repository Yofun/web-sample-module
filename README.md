# 前言
JavaScript初期只是为了在前端页面进行一些简单的表单校验，避免和后台产生不必要多余的交互，寥寥数语即可。后来随着互联网的不断发展，Ajax技术的广泛应用，前端各种库的出现（如jQuery），JavaScript不断的更新迭代，大多数浏览器的支持，使得JavaScript的发展日益壮大。

最初编程人员写JavaScript脚本时，一个js脚本写在一个文件中，导致页面代码成百上千行的累加；后来使用多个文件进行分开，然后使用script标签进行引入，这样又会导致引用顺序问题，引入的顺序稍有不慎，就会出错。所以为了解决这一问题，模块化思想便油然而生。


![前端模块化规范](https://upload-images.jianshu.io/upload_images/4179198-8e3f514fb667ec3f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 一、模块化理解
## 1. 模块化概念
所谓模块化，就是各个模块之间各司其职，做自己该做的事儿，需要用到谁，就引入哪个模块，哪个模块需要自己的一些功能，就暴露出去。就像一个手机一样，有CPU、GPU、电池、摄像头、传感去、屏幕等模块，每个模块相互合作，组成了一个完整的手机，如果有哪个模块失效了或者过时了，更换最新的模块即可，没有必要去更换整个手机，这样更加节省成本，模块化就是如此。

## 2. 模块化的好处
- 避免命名冲突(减少命名空间污染)
- 更好的分离, 按需加载
- 更高复用性
- 高可维护性

## 3. 引入多个`<script>`后出现出现问题
- 请求过多
首先我们要依赖多个模块，那样就会发送多个请求，导致请求过多

- 依赖模糊
我们不知道他们的具体依赖关系是什么，也就是说很容易因为不了解他们之间的依赖关系导致加载先后顺序出错。

- 难以维护
以上两种原因就导致了很难维护，很可能出现牵一发而动全身的情况导致项目出现严重的问题。

## 4. 模块化的发展
### 4.1 函数封装模式
> 最开始是将一个简单的功能封装成为一个函数，挂载到全局作用域上，然后使用`script`标签引入到页面中进行使用

#### (1) 目录结构
```
├─index.html
├─modules
|    ├─module1.js
|    └─module2.js
```

#### (2) 模块代码
module1代码：
```
function test1() {
    console.log('我是module1中的test1');
}

function test2() {
    console.log('我是module1中的test2');
}
```
module2代码：
```
function test1() {
    console.log('我是module2中的test1');
}

function test2() {
    console.log('我是module2中的test2');
}
```

#### (3)主页面index
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>全局function模式</title>
</head>
<body>
    
    <script src="./modules/module1.js"></script>
    <script src="./modules/module2.js"></script>
    <script>
        test1()
        test2()
    </script>
</body>
</html>
```
#### (4)运行到浏览器结果
![全局function结果](https://upload-images.jianshu.io/upload_images/4179198-dc57d1cf20fe0492.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 总结
1. 同名的属性或方法，后者会覆盖前者。造成全局作用域污染
2. 各个方法之间看不出有何联系

### 4.2 namespace模式
> 将模块的属性和方法存放在一个变量上，该变量挂载在全局作用域window上

#### (1) 目录结构
```
├─index.html
├─modules
|    ├─module1.js
|    └─module2.js
```
#### (2) 模块代码
module1
```
var module1 = {
    data: '-------------module1------------',
    say() {
        console.log(`我是${this.data}`);
    }
}
```
module2
```
var module2 = {
    data: '-------------module2------------',
    say() {
        console.log(`我是${this.data}`);
    }
}
```
#### (3) 主页面index
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>namespace模式</title>
</head>
<body>
    <script src="./modules/module1.js"></script>
    <script src="./modules/module2.js"></script>

    <script>
        console.log(module1.data);
        module1.say()

        console.log(module2.data);
        module2.say()

        // 可以修改模块内的属性和方法
        module1.data = 'module1被修改了'
        module1.say()

    </script>
</body>
</html>
```
#### (4) 运行到浏览器结果
![namespace运行结果](https://upload-images.jianshu.io/upload_images/4179198-6a0f617ad2df7cf6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 总结
1. 作用: 减少了全局变量，解决命名冲突
2. 从结果可以看出，这种模式不安全，可以任意修改模型中的属性和方法

### 4.3 IIFE 匿名函数自调用模式
> 通过作用域链的特性，外部作用域无法访问内部作用域的变量，可以做到保护局模块内的变量的作用，然后通过把需要公开的属性和方法挂载到window对象上，就实现了一个模块的封装

#### (1) 目录结构
```
├─index.html
├─modules
|    ├─module1.js
|    └─module2.js
```

#### (2) 模块代码
module1
```
(function (w) {
    let data = '---module1---'

    function say() {
        console.log(`我是${data}`);
    }

    // 暴露module1 给全局
    w.module1 = {
        say
    }
})(window)
```
module2
```
(function (w) {
    let data = '---module2---'

    function say() {
        console.log(`我是${data}`);
    }

    // 暴露module1 给全局
    w.module2 = {
        say
    }
})(window)
```
#### (3) 主页面index
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>匿名函数自调用</title>
</head>
<body>
    <script src="./modules/module1.js"></script>
    <script src="./modules/module2.js"></script>
    <script>
        module1.say()
        module2.say()

        // 访问不到内部其他变量  因为暴露的module对象没有该属性
        console.log(module1.data); // undefined
        
    </script>
</body>
</html>
```

#### (4) 运行结果
![IIFE运行结果](https://upload-images.jianshu.io/upload_images/4179198-1ea85f4a63bace7a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 总结
优点：数据私有，可选择暴露的属性的方法，而私有的属性和方法不会被修改

缺点：如果需要引用另一个模块，该怎么办？

### 4.4 IIFE增强模式
> 基于IIFE模式，解决依赖其他module的问题

#### (1) 目录结构
```
├─index.html
├─js
| ├─modules
| |    ├─module1.js
| |    └─module2.js
| ├─lib
| |  └─jquery.js
```
模块中引入jQuery，所以需要新建一个`lib`文件夹存放`jQuery`库
#### (2) 模块代码
module1.js
```
/**
 * module1 模块就是一个正常的模块
 */

(function (w) {
    let data = '---module1---'

    function say() {
        console.log(`我是${data}`);
    }

    // 
    w.module1 = {
        say
    }
})(window)
```
module2.js
```
/**
 * module2 引入第三方库：jQuery
 */

(function (w, $) {
    let data = '---module2---'

    function say() {
        console.log(`我是${data}`);
    }

    /**
     * 使用jQuery修改body的样式
     */
    function change() {
        $(document.body).css({
            background: 'green'
        })
    }

    w.module2 = {
        say,
        change
    }
})(window, jQuery)
```
module2.js中的匿名函数的实参是window和jQuery对象，所以需要先引入jQuery库

#### (3) 主页面index
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>匿名函数自调用(增强)</title>
</head>
<body>
    <!-- 如果想使用第三方库，先引入进来 -->
    <script src="./js/lib/jquery.js"></script>
    <script src="./js/modules/module1.js"></script>
    <script src="./js/modules/module2.js"></script>

    <script>
        /**
         * 增强版是为了引入其他模块
         */
        module1.say()

        module2.say()

        module2.change()

    </script>
</body>
</html>
```

#### (4) 运行结果
![](https://upload-images.jianshu.io/upload_images/4179198-a9164a993b2a67e4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/640)

可以看到，module2中的jQuery也已经起了作用

#### 总结
这就是现代模块实现的基石。**这样做除了保证模块的独立性，还使得模块之间的依赖关系变得明显。**

# 二、模块化规范
## 1. CommonJS
### 概述
Node 应用由模块组成，采用 CommonJS 模块规范。每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。**在服务器端，模块的加载是运行时同步加载的；在浏览器端，模块需要提前编译打包处理。**

### 特点
- 所有代码都运行在模块作用域，不会污染全局作用域。
- 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
- 模块加载的顺序，按照其在代码中出现的顺序。

### 基本使用
**暴露/导出：** 通过`module.exports`或者`exports`作为导出媒介，在其上面添加属性和方法，就能将属性和方法公开出去
**引入/导入：** 通过`require(xxx)`来引入要使用的组件。如果是自定义的组件，xxx为`../`或`./`开头的路径地址；如果是通过`npm`包管理器下载的第三方包，则xxx直接写为引用的包名，如：`require('jquery')`

### 关于module.exports和exports
> 为什么要理解module.exports和exports的关系？
因为理解了他俩的关系，这样在写模块的时候就不会混乱
#### (1) 初始关系内存图
![](https://upload-images.jianshu.io/upload_images/4179198-29df6ab4f1d558fc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/640)
从图中可以看出，`module.exports`和`exports`指向的内存地址是同一个，是一个空对象，可以说`module.exports === exports`为`true`

#### (2) 在module.exports / exports上添加属性或方法
如果在一个模块中这样写
```
module.exports.name = '哈哈哈'
exports.age = 20
```
则内存图如下：
![](https://upload-images.jianshu.io/upload_images/4179198-e98955353390445b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/640)
可以看出，指向的还是同一个堆内存，所以`module.exports === exports`为`true`
#### (3) module.exports / exports 指向被修改
如果module.exports 或者 exports的指向被修改，如下代码
```
exports.name = '哈哈哈'
module.exports = {
    name: 'hello'
}
```
则内存关系图如下：
![](https://upload-images.jianshu.io/upload_images/4179198-30a729a330204e98.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/640)

可以看出，两个属性指向的内存地址发生了改变，此时`module.exports === exports`为`false`

**exports 和 module.exports 的指向都发生了改变，最终以最后一个 module.exports 的修改为主**

### Node环境中实现
> 由于在node环境中已经预置好了CommonJS的环境，即有`require()`方法，所以可以直接运行写好的代码即可。前提是已经安装好了node环境。

#### (1) 安装NodeJs
https://nodejs.org/en/

#### (2) 初始化node项目
因为项目中可能会依赖第三方的包，所以需要初始化node项目来安装第三方包
在项目目录下运行命令
> npm init

一路确定即可，最后会创建一个`package.json`文件

#### (3) 下载第三方包
以`uniq`第三方库为例，在项目目录下运行命令

> npm install uniq --save

#### (4) 项目目录
```
├─app.js
├─package-lock.json
├─package.json
├─node_modules
|      ├─uniq
|      |  ├─.npmignore
|      |  ├─LICENSE
|      |  ├─package.json
|      |  ├─README.md
|      |  ├─uniq.js
|      |  ├─test
|      |  |  └─test.js
├─modules
|    ├─module1.js
|    ├─module2.js
|    ├─module3.js
|    ├─module4.js
|    └─module5.js
```
`package-lock.json`、`package.json`文件和`node_modules`文件夹是使用npm命令是自动生成的。其他文件都是自己新建的


#### (5) 模块内容
module1.js
```
exports.name = '刘德华'
exports.age = '20'
exports.say = function () {
    console.log('我是刘德华');
}
```
module2.js
```
module.exports = function() {
    console.log('我是模块2');
}
```
module3.js
```
exports.name = '张学友'

module.exports = function () {
    console.log('module.exports', module.exports);
    console.log('exports', exports);
    return module.exports === exports
}
```
module4.js
```
exports.name = '周润发'
exports.age = 25
module.exports.uniq = function () {
    console.log(module.exports === exports);
}
```
module5.js
```
module.exports = function () {
    console.log('我是module.exports 111');
}

module.exports = function () {
    console.log('我是module.exports 222', module.exports);
}

exports = function() {
    console.log('我是exports');
}

```
#### (6) app.js
```
/**
 * 引入  require(xxx)
 *      1. 如果引入的是第三方模块，即从npm包管理器下载的，xxx为模块名
 *      2. 如果是自己定义的模块，xxx为模块的路径
 */
// 引入第三方模块 uniq
const uniq = require('uniq')

// 引入自己的模块
const module1 = require('./modules/module1')
const module2 = require('./modules/module2')
const module3 = require('./modules/module3')
const module4 = require('./modules/module4')
const module5 = require('./modules/module5')

console.log(uniq([1, 1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5])); // [ 1, 2, 3, 4, 5 ]

// 引入的module其实就是 module.exports = exports 所指向的那个对象

// module1中，在exports对象中增加了 name、age、say的属性和方法
console.log(module1.name); // 刘德华
console.log(module1.age); // 20
module1.say() // 我是刘德华

// module2 中，exports直接指向了一个方法，所以exports是一个方法
module2() // 我是模块2

// module3 中，本来 module.exports = exports = {} 指向的是同一个对象，现在改为exports为{ name: '张学友' }，而module.exports指向的是一个函数，所以二者不相等
console.log(module3());


// module4 中, module.exports 和 exports 的指向都没有改变，所以在比较的时候二者是相等的
module4.uniq()


// module5 中，exports 和 module.exports 的指向都发生了改变，最终以最后一个 module.exports 的修改为主
module5() // 我是module.exports 222
```
#### (7) 运行
在vscode中，安装`Code Runner`插件，如下图：
![Code Runner](https://upload-images.jianshu.io/upload_images/4179198-ae6e6bd1754ae83a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/640)
然后在`app.js`中右键，如下图：
![](https://upload-images.jianshu.io/upload_images/4179198-cf413447cd1fd2b9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/640)
点击上图按钮就会运行了。

#### (8) 运行结果
```
[Running] node "c:\Users\YCWB0217\Desktop\Test\前端模块化\02_CommonJS-Node\app.js"
[ 1, 2, 3, 4, 5 ]
刘德华
20
我是刘德华
我是模块2
module.exports [Function (anonymous)]
exports { name: '张学友' }
false
true
我是module.exports 222 [Function (anonymous)]

[Done] exited with code=0 in 0.228 seconds
```


## 浏览器中实现
> 由于浏览器中，无法识别`require()`方法，并不能直接使用CommonJs的模块化，所以需要借助一个转换器，将源码转换为浏览器识别的源码。

过程如下：
![](https://upload-images.jianshu.io/upload_images/4179198-049e80c903826044.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/640)

#### (1)  项目目录
```
├─index.html
├─package-lock.json
├─package.json
├─js
| ├─src
| |  ├─app.js
| |  ├─module1.js
| |  ├─module2.js
| |  ├─module3.js
| |  ├─module4.js
| |  └module5.js
| ├─dist
| |  └bundle.js
```
其中`package-lock.json` `package.json` `js/dist`是自动生成的

#### (2) 安装browserify
> npm install -g browserify

[browserify官网](http://browserify.org/)
#### (3) 模块代码
这里的模块代码个Node环境下的代码相同，可以直接将`app.js`、`module1.js`、`module2.js`、`module3.js`、`mdoule4.js`、`module5.js`一同复制到src文件加下

#### (4) browserify编译app.js
在项目目录下输入命令
> browserify js/src/app.js -o js/dist/bundle.js

-o 表示输出

#### (5) index页面引用bundle.js
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CommonJS-Browserify</title>
</head>
<body>
    
</body>
</html>
<!-- 引用dist下的bundle.js -->
<script src="./js/dist/bundle.js"></script>
```

#### 运行结果
![浏览器运行结果](https://upload-images.jianshu.io/upload_images/4179198-c5025df72e73618d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## 2. AMD-RequireJS
CommonJS规范加载模块是同步的，也就是说，只有加载完成，才能执行后面的操作。AMD规范则是非同步加载模块，允许指定回调函数。由于Node.js主要用于服务器编程，模块文件一般都已经存在于本地硬盘，所以加载起来比较快，不用考虑非同步加载的方式，所以CommonJS规范比较适用。但是，**如果是浏览器环境，要从服务器端加载模块，这时就必须采用非同步模式，因此浏览器端一般采用AMD规范。**此外AMD规范比CommonJS规范在浏览器端实现要来着早。

### (1) 目录结构
```
├─index.html
├─js
| ├─main.js
| ├─modules
| |    ├─module1.js
| |    ├─module2.js
| |    └module3.js
| ├─lib
| |  ├─jquery.js
| |  └─require.js
```
其中，`js/lib`目录下是AMD需要引入的库和`jQuery.js`库
### (2) 下载require.js和jQuery.js
**require.js：**https://github.com/requirejs/requirejs
**jQuery.js：**https://github.com/jquery/jquery
将下载好的js存放在lib目录下
### (3) 模块代码
module1.js
```
/**
 * 定义一个没有依赖的模块
 */
define(function () {
    let data = '我是数据数据'
    function getData() {
        return data
    }
    return { getData }
})
```
module2.js
```
/**
 * 定义一个有依赖的模块
 *      module2 依赖 module1 中的数据
 */

define([
    'module1'
], function (m1) {
    let data = '我是module2中的数据'

    function show() {
        console.log('我是module2，module1中的数据是【' + m1.getData() + '】');
    }
    return { show, data }
});
```
module3.js
```
define([
    'module2',
    'jquery'
], function (module2, $) {
    function show() {
        console.log('我是module3', 'module2中的data为【' + module2.data + '】');
    }

    function each(arr, callback) {
        return $.each(arr, callback)
    }

    return { show, each }
});
```
其中，`module2`依赖了`module1`，`module3`依赖了`module2`和`jQuery`

### (4) main.js
```
(function () {
    requirejs.config({
        baseUrl: 'js/',
        paths: {
            // 隐射：模块标识名：路径
            module1: './modules/module1',
            module2: './modules/module2',
            module3: './modules/module3',
            jquery: './lib/jquery'
        }
    })

    // 引用module2
    requirejs(['module2'], function (m2) {
        m2.show()
    })

    // 引用module3 使用jQuery
    requirejs(['module3'], function (m3) {
        m3.show()

        m3.each(['red', 'green', 'blue'], function (index, item) {
            console.log('第' + index + '个', '值为：' + item);
        })
    })
})()
```
1. 首先需要对requirejs进行配置，下面有几个注意项
baseUrl：基于当前根目录，如果paths中的路径有相同的部分，可以将相同部分的目录提取到baseUrl中来
paths：路径需要以`./`或者`../`开头，其中，**路径不要加.js文件名**
对于jQuery，键名必须是`jquery`，因为jQuery源码中暴露就是这个键名
2. 通过全局`requirejs()`方法进行加载模块并调用
### (5) 运行结果
![AMD结果](https://upload-images.jianshu.io/upload_images/4179198-faf303cb57119f4b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 3. CMD-SeaJS
CMD规范专门用于浏览器端，模块的加载是异步的，模块使用时才会加载执行。CMD规范整合了CommonJS和AMD规范的特点。在 Sea.js 中，所有 JavaScript 模块都遵循 CMD模块定义规范。

### (1) 目录结构
```
├─index.html
├─js
| ├─modules
| |    ├─main.js
| |    ├─module1.js
| |    ├─module2.js
| |    └─module3.js
| ├─lib
| |  └─sea.js
```
其中`sea.js`是CMD解析模块的核心

### (2) 下载sea.js
**sea.js：**https://github.com/seajs/seajs

### (3) 模块代码
module1.js
```
/**
 * 定义一个依赖模块，module1
 */

define(function (require, exports, module) {
    let data = '----------module01----------'

    function getData() {
        console.log('module1 getData() ' + data);
    }

    module.exports.data = data
    module.exports.getData = getData
})
```

module2.js
```
/**
 * 定义一个依赖模块，module2
 */

define(function (require, exports, module) {
    let data = '----------module02----------'

    function getData() {
        console.log('module2 getData() ' + data);
    }

    exports.data = data
    exports.getData = getData
})
```
module3.js
```
/**
 * 定义一个依赖模块，module3 依赖于 module1 和 module2
 */

define(function (require, exports, module) {
    let data = '----------module03----------'
    function getData() {
        console.log('module3 getData() ' + data);
    }
    // 引入模块1  模块2
    // 同步引入
    let module1 = require('./module1')
    module1.getData()

    // 异步引入
    require.async('./module2', function (m2) {
        console.log('module2加载完毕');
        m2.getData()
    })

    module.exports = {
        data,
        getData
    }
})
```

### (4) main.js
```
/**
 * 主JS文件，用于汇总各个模块
 */

define(function(require){
    let module1 = require('./module1')
    // let module2 = require('./module2')
    let module3 = require('./module3')

    console.log(module1.data);
    module1.getData()

    console.log(module3.data);
    module3.getData()
})
```

### (5) index.html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CMD-SeaJS</title>
</head>
<body>
    
</body>
</html>
<script src="./js/lib/sea.js"></script>
<script>
    seajs.use('./js/modules/main')
</script>
```

### (6) 运行结果
![CMD运行结果](https://upload-images.jianshu.io/upload_images/4179198-ce9247d297df8ad0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

可以看到，由于在module3中异步加载module2，所以他的回调往往总是在同步任务结束之后才会运行的。


## 4. ES6中的模块化

历史上，JavaScript 一直没有模块（module）体系，无法将一个大程序拆分成互相依赖的小文件，再用简单的方法拼装起来。其他语言都有这项功能，比如 Ruby 的require、Python 的import，甚至就连 CSS 都有@import，但是 JavaScript 任何这方面的支持都没有，这对开发大型的、复杂的项目形成了巨大障碍。

在 ES6 之前，社区制定了一些模块加载方案，最主要的有 CommonJS 和 AMD 两种。前者用于服务器，后者用于浏览器。ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。

### 编译运行过程

![es6模块化过程](https://upload-images.jianshu.io/upload_images/4179198-9b32759163ffe5cb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/640)

### (1) 准备
① 在项目根目录下
> npm init

② 安装babel-cli, babel-preset-es2015和browserify
> npm install babel-cli -g

此步安装过可省略
> npm install browserify -g  

> npm install babel-preset-es2015 --save-dev

安装完毕后，在项目根目录会多出一个`node_modules`目录

③ 在根目录下，新建一个`.babelrc`的文件。内容如下
```
{
    "presets": ["es2015"]
}
```

④ 安装一个第三方库
为了演示如何引入第三方包，再安装一个第三方的包
> npm install uniq --save

### (2) 项目目录
```
├─.babelrc
├─index.html
├─package-lock.json
├─package.json
├─js
| ├─src
| |  ├─app.js
| |  ├─module1.js
| |  ├─module2.js
| |  ├─module3.js
| |  └module4.js
| ├─dist
| |  ├─app.js
| |  ├─bundle.js
| |  ├─module1.js
| |  ├─module2.js
| |  ├─module3.js
| |  └module4.js
```
其中`dist`文件夹下文件不用管，其余文件为自己新建的

### (3) 模块代码(src目录下)
module1.js
```
/**
 * 单个暴露
 */

export var name = '刘德华'
export var age = 20
export function say () {
    console.log('我是刘德华');
}
```

module2.js
```
/**
 * 统一暴露
 */

let arr = [1, 2, 3, 4, 5]
function demo2() {
    console.log('我是demo2', arr);
}

function test2() {
    console.log('我是test2', arr);
}

export {
    demo2,
    test2
}
```

module3.js
```
/**
 * 默认暴露，只能暴露一次
 */

//  export default {
//     name: '佩奇',
//     age: 18,
//     speak() {
//         console.log(`我的名字是${this.name}，我今年${this.age}岁了！`);
//     }
//  }

 export default {
     name: '周杰伦',
     age: 20,
     song() {
         console.log('天青色等烟雨，而我在等你！');
     }
 }
```

module4.js
```
/**
 * 混合暴露
 */
// 分别暴露
export let name = '周星驰'
export let age = 30

// 统一暴露
let height = 176
let sex = '男'

export {
    height,
    sex
}

// 默认暴露
export default {
    job: ['演员', '主持人', '导演', '编剧'],
    hobby: ['唱歌', '跳舞', '搞笑', '配音', '无厘头']
}
```

### (4) app.js (src目录下)

```
import { name, age, say } from './module1'
import { demo2, test2 } from './module2'
import module3 from './module3'

// module 1
console.log('------------------------------');
console.log(name);
console.log(age);
say()

// module 2
console.log('------------------------------');
demo2()
test2()

// module 3
console.log('------------------------------');
console.log(module3.name);
console.log(module3.age);
module3.song()
```
### (5) 编译
① 使用babel命令，将es6语法翻译为es5语法
> babel js/src -d js/dist

解析：将`js/src`文件夹下的js文件，编译成对应的es5 js文件。到`js/dist`文件夹中

② 使用browserify编译require函数进行加载对应模块
> browserify js/dist/app.js -o js/dist/bundle.js

解析：将有require的app.js文件，编译成浏览器识别的js文件`bundle.js`

### (6) index.html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ES6_Babel_Browserify</title>
</head>
<body>
    
</body>
</html>
<script src="./js/dist/bundle.js"></script>
```
将编译好的`bundle.js`文件使用`script`标签加载进来

### (7) 运行结果
![es6模块化运行结果](https://upload-images.jianshu.io/upload_images/4179198-159aae8419e311cf.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### ES6模块化补充

#### 1. 模块的导出和导入
es6中模块的导出有三种方式：
1. **分别暴露**：对应上述`module1.js`
2. **统一暴露**：对应上述`module2.js`
3. **默认暴露**：对应上述`module3.js`

其对应的导出方式也不同
**分别暴露**和**统一暴露**使用`import {} from '模块路径'`的方式导入，**默认暴露**使用`import x from '模块路径'`的方式导入

#### 2. `import {} from ''` 导入方式优化
情况：有这样一个情况，module1中 `export let name = 'module1'`；module2中`export let name='module2'`。此时用`import {} from ''`方式导入，会出现命名重复的问题。

下面给出解决方案：
**① 使用`as`关键字给变量或者方法设置别名，避免和其他模块的属性和方法重复**
```
import {name as n1} from './module1'
import {name as n2} from './module2'
// 使用
console.log(n1)
console.log(n2)
```

**② 使用 * 将模块中导出的内容收集称为一个对象，然后使用该对象调用对应的属性和方法。类似于默认暴露**
```
import * as m1 from './module1'
import * as m2 from './module2'
// 使用
console.log(m1.name)
console.log(m2.name)
```
这种方式类似于将模块内暴露的内容使用一个对象进行包裹了起来，该对象使用`as`关键字进行命名，这样避免污染作用域

**注意：如果模块使用的是默认(export default)暴露的，则没有必要使用`* as` 进行封装一层**
如果使用`* as` ,则被封装的对象为
```
{
  default:{
    name: '哈哈哈'
  }
}
```

#### 3. 如果模块中定义两个 export default；则使用babel编译的时候会报错 Only one default export allowed per module

#### 4. export 和 export default 混合使用
针对`module4.js`中的暴露方案，使用混合的方式进行导入。
```
import { name, age } from './module4'
import { height, sex } from './module4'
import other from './module4'
```
也有一种简单的写法
```
import other, { name, age, height, sex } from './module4'
```
效果都是一样的。**其中第二种导入混合导出的方式很常见**

# 三、总结
- CommonJS规范主要用于服务端编程，加载模块是同步的，这并不适合在浏览器环境，因为同步意味着阻塞加载，浏览器资源是异步加载的，因此有了AMD CMD解决方案。
- AMD规范在浏览器环境中异步加载模块，而且可以并行加载多个模块。不过，AMD规范开发成本高，代码的阅读和书写比较困难，模块定义方式的语义不顺畅。
- CMD规范与AMD规范很相似，都用于浏览器编程，依赖就近，延迟执行，可以很容易在Node.js中运行。不过，依赖SPM 打包，模块的加载逻辑偏重
- **ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。**

# 参考资料

[前端模块化详解(完整版)](https://juejin.im/post/6844903744518389768#heading-43)