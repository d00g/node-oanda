var util = require('../core/oanda_util');

var rates = function(core) {
  this.core = core;
};

rates.prototype = {
  getInstrumentList: function(account_id, options) {
    options = util.define(options, {});
    options.account_id = account_id;

    let URL = this.core.apiVersion === 'v3' ? `/v3/accounts/${account_id}/instruments` : `/${this.core.apiVersion}/instruments`;
    return this.core.request(
      URL, 'GET', options);
  },

  getCurrentPrices: function(account_id, instruments, options) {
    options = util.define(options, {});
    options.instruments = instruments;

    let URL = this.core.apiVersion === 'v3' ? `/v3/accounts/${account_id}/pricing` : `/${this.core.apiVersion}/pricing`;
    return this.core.request(
      URL, 'GET', options);
  },

  retrieveInstrumentHistory: function(instrument, options) {
    options = util.define(options, {});
    options.instrument = instrument;

    var url = `/${this.core.apiVersion}/candles`;
    if (this.core.apiVersion === 'v3') {
      url = `/${this.core.apiVersion}/instruments/${instrument}/candles`;
      delete options.instrument;
    }

    return this.core.request(url, 'GET', options);
  }
};

module.exports = rates;
