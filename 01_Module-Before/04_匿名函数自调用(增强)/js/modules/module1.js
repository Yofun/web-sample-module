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