"use strict";
const path = require('path');
const common = require('../utils/common.js');
const modelMap = new Map();

this.modelMap = new Map();
common.mapDir(path.join(__dirname, '../model')).forEach(modelPath => {
    let modelItem = require(modelPath);
    modelMap.set(modelItem.tableName, modelItem);
});

module.exports = function (tableName) {
    return modelMap.get(tableName);
};