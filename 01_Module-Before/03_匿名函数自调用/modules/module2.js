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