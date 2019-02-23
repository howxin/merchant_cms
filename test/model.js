"use strict";
const path = require('path');
const config = require('../lib/config');

const ENV = process.ENV || 'local';
const APPNAME = process.APPNAME || 'default';
const envconf = require(path.join(__dirname, `../config/envconf/${ENV}_${APPNAME}.json`));
config.set(envconf);
const model = require('../lib/model');

model('product').getProductList(null, '*', {name: 'test'}).then(res => {
    console.info('table user => ', res);
});
