const expect = require('chai').expect;
const path = require('path');
const config = require('../../lib/config');

const ENV = process.ENV || 'local';
const APPNAME = process.APPNAME || 'default';
const envconf = require(path.join(__dirname, `../../config/envconf/${ENV}_${APPNAME}.json`));
config.set(envconf);

const model = require('../lib/model.js');

describe('model modules', function () {
    describe('#model', function () {
        before(() => console.info('model =>', model));
        it('show model constructor', function () {
            expect(model).to.be.not.equal(null);
            describe('#use', function () {
                expect(model('user')).to.be.an('object');
            });
        });
    });
});