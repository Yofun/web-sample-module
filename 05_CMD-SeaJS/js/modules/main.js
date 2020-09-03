/**
 * 主JS文件，用于汇总各个模块
 */

define(function(require){
    let module1 = require('./module1')
    // let module2 = require('./module2')
    let module3 = require('./module3')

    console.log(module1.data);
    module1.getData()

    // console.log(module2.data);
    // module2.getData()

    console.log(module3.data);
    module3.getData()
})