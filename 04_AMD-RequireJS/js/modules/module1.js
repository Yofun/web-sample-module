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