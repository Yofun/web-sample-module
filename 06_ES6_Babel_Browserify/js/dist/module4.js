'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * 混合暴露
 */
// 分别暴露
var name = exports.name = '周星驰';
var age = exports.age = 30;

// 统一暴露
var height = 176;
var sex = '男';

exports.height = height;
exports.sex = sex;

// 默认暴露

exports.default = {
    job: ['演员', '主持人', '导演', '编剧'],
    hobby: ['唱歌', '跳舞', '搞笑', '配音', '无厘头']
};