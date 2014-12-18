'use strict';

var dns = require('dns');
var inherits = require('util').inherits;

var EventEmitter = require('events').EventEmitter;

function Resolver(host, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  EventEmitter.call(this);

  this.once('address', function (addr) {
    callback(null, addr);
  });

  this.once('error', function (err) {
    callback(err, null);
  });

  this._lookup(host, 6);
}

inherits(Resolver, EventEmitter);

Resolver.prototype._lookup = function (host, family) {
  var that = this;

  dns.lookup(host, family, function (err, addr) {
    if (err) {
      that.emit('error', err);
    } else {
      that.emit('address', addr);
    }
  });
};

/**
 * @param  {String}   host
 * @param  {Object}   options
 * @param  {Function} callback
 * @return {Resolver}
 */
module.exports = function (host, options, callback) {
  return new Resolver(host, options, callback);
};
