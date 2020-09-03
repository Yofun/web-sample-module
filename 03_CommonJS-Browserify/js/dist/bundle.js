(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/**
 * 引入  require(xxx)
 *      1. 如果引入的是第三方模块，即从npm包管理器下载的，xxx为模块名
 *      2. 如果是自己定义的模块，xxx为模块的路径
 */
// 引入第三方模块 uniq
const uniq = require('uniq')

// 引入自己的模块
const module1 = require('./module1')
const module2 = require('./module2')
const module3 = require('./module3')
const module4 = require('./module4')
const module5 = require('./module5')

console.log(uniq([1, 1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5])); // [ 1, 2, 3, 4, 5 ]

// 引入的module其实就是 module.exports = exports 所指向的那个对象

// module1中，在exports对象中增加了 name、age、say的属性和方法
console.log('---------------------');
console.log(module1.name); // 刘德华
console.log(module1.age); // 20
module1.say() // 我是刘德华

// module2 中，exports直接指向了一个方法，所以exports是一个方法
console.log('---------------------');
module2() // 我是模块2

// module3 中，本来 module.exports = exports = {} 指向的是同一个对象，现在改为exports为{ name: '张学友' }，而module.exports指向的是一个函数，所以二者不相等
console.log('---------------------');
console.log(module3());


// module4 中, module.exports 和 exports 的指向都没有改变，所以在比较的时候二者是相等的
console.log('---------------------');
console.log(module4.name);
console.log(module4.age);
module4.uniq()


// module5 中，exports 和 module.exports 的指向都发生了改变，最终以最后一个 module.exports 的修改为主
console.log('---------------------');
module5() // 我是module.exports 222
},{"./module1":2,"./module2":3,"./module3":4,"./module4":5,"./module5":6,"uniq":7}],2:[function(require,module,exports){
exports.name = '刘德华'
exports.age = '20'
exports.say = function () {
    console.log('我是刘德华');
}
},{}],3:[function(require,module,exports){
module.exports = function() {
    console.log('我是模块2');
}
},{}],4:[function(require,module,exports){
exports.name = '张学友'

module.exports = function () {
    console.log('module.exports', module.exports);
    console.log('exports', exports);
    return module.exports === exports
}
},{}],5:[function(require,module,exports){
exports.name = '周润发'
exports.age = 25
module.exports.uniq = function () {
    console.log(module.exports === exports);
}
},{}],6:[function(require,module,exports){


module.exports = function () {
    console.log('我是module.exports 111');
}

module.exports = function () {
    console.log('我是module.exports 222');
}

exports = function() {
    console.log('我是exports');
}

},{}],7:[function(require,module,exports){
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
