"use strict";
const common = require('../utils/common.js');
let username = 'howxin';
let password = '123456';

console.log('sha1 =>', common.sha1(username + password));
console.log('sha1 password => ', common.sha1(username + common.sha1(username + password)));