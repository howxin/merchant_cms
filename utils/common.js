"use strict";
const fs = require("fs");
const path = require('path');
const crypto = require('crypto');
const _ = require('underscore');
const schema = require('async-validator');

class Common {

    mapDir(dirPath) {
        const files = [];

        function _readdirSync(_dirPath) {
            fs.readdirSync(_dirPath).forEach(p => {
                let filePath = path.join(path.join(_dirPath, p));
                if (fs.statSync(filePath).isDirectory()) {
                    _readdirSync(filePath);
                } else {
                    files.push(filePath);
                }
            });
        }

        _readdirSync(dirPath);
        return files;
    }

    typeOf(data) {
        if (typeof (data) === 'object') {
            switch (Object.prototype.toString.call(data)) {
                case '[object Null]':
                    return 'null';
                case '[object Object]':
                    return 'object';
                case '[object Array]':
                    return 'array';
                case '[object Map]':
                    return 'map';
                case '[object Set]':
                    return 'set';
                case '[object WeakMap]':
                    return 'weakmap';
                case '[object WeakSet]':
                    return 'weakset';
                case '[object Function]':
                    return 'function';
            }
        } else {
            return typeof (data);
        }
    }

    decode(string) {
        const body = new Buffer(string, 'base64').toString('utf8');
        const json = JSON.parse(body);
        return json;
    }

    encode(body) {
        body = JSON.stringify(body);
        return new Buffer(body).toString('base64');
    }

    sha1(message) {
        return crypto.createHash('sha1').update(message, 'utf8').digest('hex');
    };

    toNumber(value, decimal, abs) {
        abs = abs === true;
        decimal = Number(decimal);
        if (isNaN(decimal))
            decimal = 4;
        let number = Number(value);
        number = isNaN(number) ? 0 : Number(decimal < 0 ? number : number.toFixed(decimal));
        return abs === true ? Math.abs(number) : number;
    }

    chr(code) {
        code = this.toNumber(code);
        if (code > 0xFFFF) {
            code -= 0x10000;
            return String.fromCharCode(0xD800 + (code >> 10), 0xDC00 + (code & 0x3FF));
        }
        return String.fromCharCode(code);
    }

    genCode(len) {
        len = this.toNumber(len, 0);
        len = len <= 0 ? 8 : len;
        let result = '';
        for (let i = 0; i < len; i++) {
            switch (_.random(1, 3)) {
                case 1:
                    result += this.chr(_.random(48, 57));
                    break;
                case 2:
                    result += this.chr(_.random(65, 90));
                    break;
                case 3:
                    result += this.chr(_.random(97, 122));
                    break;
            }
        }
        return result;
    }

    validate(descriptor, source, options = {}) {
        return new Promise((resolve, reject) => {
            const validator = new schema(descriptor);
            validator.validate(source, options, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve(true);
            });
        });
    }
}

module.exports = new Common();