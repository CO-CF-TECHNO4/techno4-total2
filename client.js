// Techno4 Framework 2 - Total.js Client Bridge
// Provides unified client API for Techno4 Core frontend apps connecting to Total.js v5 backend

(function(global) {

  function Techno4TotalClient(options) {
    var self = this;
    self.options = options || {};
    self.url = self.options.url || '';
    self.headers = self.options.headers || {};
    self.token = self.options.token || '';
    self.ws = null;
    self.subscriptions = {};
  }

  Techno4TotalClient.prototype.setToken = function(token) {
    this.token = token;
    if (token) {
      this.headers['Authorization'] = 'Bearer ' + token;
    } else {
      delete this.headers['Authorization'];
    }
    return this;
  };

  Techno4TotalClient.prototype.action = function(name, payload, options) {
    var self = this;
    var opt = options || {};
    var headers = Object.assign({}, self.headers, opt.headers || {});
    headers['Content-Type'] = 'application/json';

    var endpoint = (self.url || '') + (opt.endpoint || '/api/' + name.replace(/\//g, '-'));
    var body = JSON.stringify(payload || {});

    return fetch(endpoint, {
      method: 'POST',
      headers: headers,
      body: body
    }).then(function(res) {
      if (!res.ok) {
        return res.json().catch(function() {
          return { error: 'HTTP ' + res.status };
        }).then(function(err) {
          return Promise.reject(err);
        });
      }
      return res.json();
    });
  };

  Techno4TotalClient.prototype.connectWebSocket = function(path, onMessage, onError) {
    var self = this;
    var wsUrl = (self.url ? self.url.replace(/^http/, 'ws') : (location.protocol === 'https:' ? 'wss:' : 'ws:') + '//' + location.host) + (path || '/');
    var ws = new WebSocket(wsUrl);

    ws.onmessage = function(e) {
      var data;
      try {
        data = JSON.parse(e.data);
      } catch (err) {
        data = e.data;
      }
      if (onMessage) onMessage(data);
    };

    if (onError) ws.onerror = onError;
    self.ws = ws;
    return ws;
  };

  // Techno4 Framework plugin
  var Techno4TotalPlugin = {
    name: 'techno4-total',
    install: function(app, params) {
      var client = new Techno4TotalClient(params);
      app.total = client;
      if (app.prototype) {
        app.prototype.$total = client;
      }
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      Techno4TotalClient: Techno4TotalClient,
      default: Techno4TotalPlugin
    };
  }

  if (typeof global !== 'undefined') {
    global.Techno4TotalClient = Techno4TotalClient;
    global.Techno4TotalPlugin = Techno4TotalPlugin;
  }

})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
