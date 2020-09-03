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