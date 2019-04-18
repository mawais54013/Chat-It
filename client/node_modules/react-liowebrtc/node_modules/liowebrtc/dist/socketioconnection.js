'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _socket = require('socket.io-client');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SocketIoConnection = function () {
  function SocketIoConnection(config) {
    _classCallCheck(this, SocketIoConnection);

    this.connection = (0, _socket2.default)(config.url, config.socketio);
  }

  _createClass(SocketIoConnection, [{
    key: 'on',
    value: function on(ev, fn) {
      this.connection.on(ev, fn);
    }
  }, {
    key: 'emit',
    value: function emit() {
      var _connection;

      (_connection = this.connection).emit.apply(_connection, arguments);
    }
  }, {
    key: 'getSessionid',
    value: function getSessionid() {
      return this.connection.id;
    }
  }, {
    key: 'disconnect',
    value: function disconnect() {
      return this.connection.disconnect();
    }
  }]);

  return SocketIoConnection;
}();

exports.default = SocketIoConnection;