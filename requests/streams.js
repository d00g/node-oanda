var util = require('../core/oanda_util');

var streams = function(core) {
  this.core = core;
};

streams.prototype = {
  rates: function(account_id, instruments, options) {
    options = util.define(options, {});
    options.accountId = account_id;
    options.instruments = util.encodeArray(instruments);

    var URL = this.core.apiVersion === 'v3' ? `/v3/accounts/${account_id}/pricing/stream` : `/${this.core.apiVersion}/prices`
    return this.core.stream(URL, options);
  }
};

module.exports = streams;
