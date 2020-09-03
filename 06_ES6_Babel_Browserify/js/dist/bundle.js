(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _uniq = require('uniq');

var _uniq2 = _interopRequireDefault(_uniq);

var _module = require('./module1');

var _module2 = require('./module2');

var _module3 = require('./module3');

var _module4 = _interopRequireDefault(_module3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 第三方
/**
 * 主文件
 */

/**
 * 引入方式
 *     1. 分别暴露 和 统一暴露  使用 import {} from '' 的方式
 *     2. 默认暴露             使用 import x from '' 的方式
 */
console.log((0, _uniq2.default)([1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5]));

// module 1
console.log('------------------------------');
console.log(_module.name);
console.log(_module.age);
(0, _module.say)();

// module 2
console.log('------------------------------');
(0, _module2.demo2)();
(0, _module2.test2)();

// module 3
console.log('------------------------------');
console.log(_module4.default.name);
console.log(_module4.default.age);
_module4.default.song();

/**
 * import {} from '' 导入方式优化
 *
 */
// 给变量或者方法设置别名，避免和其他模块的属性和方法重复
// import {name as n, age as a, say as s} from './module1' 

// console.log(n);
// console.log(a);
// s()


// 使用 * 将模块中导出的内容收集称为一个对象，然后使用该对象调用对应的属性和方法。类似于默认暴露
// import * as ldh from './module1'
// console.log(ldh);


/**
 * 如果模块使用的是默认(export default)暴露的，则没有必要使用 as 进行封装一层
 */
// import * as jay from './module3'
// console.log(jay); // {default: {name: "周杰伦", age: 20, song: ƒ}}


/**
 * 如果模块中定义两个 export default；则使用babel编译的时候会报错 Only one default export allowed per module
 */
//  import jay from './module3'

//  console.log(jay);


/**
 * 引入第三方库
 */
// import uniq from 'uniq'
// console.log(uniq([1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5])); // [1, 2, 3, 4, 5]


/**
 * export 和 export default 混合使用
 */

// import { name, age } from './module4'
// import { height, sex } from './module4'
// import other from './module4'

// 或者

// import other, { name, age, height, sex } from './module4'


// console.log(name);
// console.log(age);
// console.log(height);
// console.log(sex);
// console.log(other);
},{"./module1":2,"./module2":3,"./module3":4,"uniq":5}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.say = say;
/**
 * 单个暴露
 */

var name = exports.name = '刘德华';
var age = exports.age = 20;
function say() {
  console.log('我是刘德华');
}
},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * 同意暴露
 */

var arr = [1, 2, 3, 4, 5];
function demo2() {
    console.log('我是demo2', arr);
}

function test2() {
    console.log('我是test2', arr);
}

exports.demo2 = demo2;
exports.test2 = test2;
},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
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

exports.default = {
    name: '周杰伦',
    age: 20,
    song: function song() {
        console.log('天青色等烟雨，而我在等你！');
    }
};
},{}],5:[function(require,module,exports){
"use strict"

function unique_pred(list, compare) {
  var ptr = 1
    , len = list.length
    , a=list[0], b=list[0]
  for(var i=1; i<len; ++i) {
    b = a
    a = list[i]
    if(compare(a, b)) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique_eq(list) {
  var ptr = 1
    , len = list.length
    , a=list[0], b = list[0]
  for(var i=1; i<len; ++i, b=a) {
    b = a
    a = list[i]
    if(a !== b) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique(list, compare, sorted) {
  if(list.length === 0) {
    return list
  }
  if(compare) {
    if(!sorted) {
      list.sort(compare)
    }
    return unique_pred(list, compare)
  }
  if(!sorted) {
    list.sort()
  }
  return unique_eq(list)
}

module.exports = unique

},{}]},{},[1]);
