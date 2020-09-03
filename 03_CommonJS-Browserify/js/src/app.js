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