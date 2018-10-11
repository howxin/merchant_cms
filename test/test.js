const Knex = require('knex');

const knex = Knex({
    "client": "mysql",
    "connection": {
        "host": "127.0.0.1",
        "user": "root",
        "password": "123456",
        "database": "merchant_cms"
    },
    "debug": true,
    "pool": {"min": 0, "max": 10},
    "acquireConnectionTimeout": 10000
});

let db = knex('user').orderBy('user_username', 'desc');
return db
    .orderBy('user_password', 'desc')
    .then(res => {
        console.log(res);
    }).catch(err => {
        console.error(err);
    });
