describe('index.js', function () {
    'use strict';

    var expect = require('expect.js');
    var lookup = require('..');
    var uri = 'www.yandex.ru';

    it('returns ip address for the specified domain', function (done) {
        lookup(uri, function (err, address) {
            expect(err).to.not.be.ok();
            expect(address).to.be.ok();
            expect(address).to.be.an('string');
            done(err);
        });
    });
});
