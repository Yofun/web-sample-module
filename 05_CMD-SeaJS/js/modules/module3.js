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
