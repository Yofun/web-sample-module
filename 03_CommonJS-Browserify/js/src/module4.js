exports.name = '周润发'
exports.age = 25
module.exports.uniq = function () {
    console.log(module.exports === exports);
}