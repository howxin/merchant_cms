"use strict";
const homepage = async (ctx, next) =>{
    ctx.body = 'we are at home!';
};

module.exports = {
    prefix: '/',
    rule: {
        'GET /': homepage
    }
};