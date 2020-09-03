/**
 * 主文件
 */

/**
 * 引入方式
 *     1. 分别暴露 和 统一暴露  使用 import {} from '' 的方式
 *     2. 默认暴露             使用 import x from '' 的方式
 */
import uniq from 'uniq'
import { name, age, say } from './module1'
import { demo2, test2 } from './module2'
import module3 from './module3'

// 第三方
console.log(uniq([1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5]));

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