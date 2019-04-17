'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _mockconsole = require('mockconsole');

var _mockconsole2 = _interopRequireDefault(_mockconsole);

var _localmedia = require('./localmedia');

var _localmedia2 = _interopRequireDefault(_localmedia);

var _peer = require('./peer');

var _peer2 = _interopRequireDefault(_peer);

var _webrtcsupport = require('./webrtcsupport');

var _webrtcsupport2 = _interopRequireDefault(_webrtcsupport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WebRTC = function (_LocalMedia) {
  _inherits(WebRTC, _LocalMedia);

  function WebRTC(opts) {
    _classCallCheck(this, WebRTC);

    var _this = _possibleConstructorReturn(this, (WebRTC.__proto__ || Object.getPrototypeOf(WebRTC)).call(this, opts));

    var self = _this;
    var options = opts || {};
    var config = _this.config = {
      debug: false,
      peerConnectionConfig: {
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
      },
      peerConnectionConstraints: {
        optional: []
      },
      receiveMedia: {
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1
      },
      enableDataChannels: true
    };
    var item = void 0;

    _this.logger = function () {
      // we assume that if you're in debug mode and you didn't
      // pass in a logger, you actually want to log as much as
      // possible.
      if (opts.debug) {
        return opts.logger || console;
      }
      // or we'll use your logger which should have its own logic
      // for output. Or we'll return the no-op.
      return opts.logger || _mockconsole2.default;
    }();

    // set options
    for (item in options) {
      if (options.hasOwnProperty(item)) {
        _this.config[item] = options[item];
      }
    }

    // check for support
    if (!_webrtcsupport2.default.support) {
      _this.logger.error('Your browser doesn\'t seem to support WebRTC');
    }

    // where we'll store our peer connections
    _this.peers = [];

    // call localMedia constructor
    // localMedia.call(this, this.config);

    _this.on('speaking', function () {
      if (!self.hardMuted) {
        self.peers.forEach(function (peer) {
          if (peer.enableDataChannels) {
            var dc = peer.getDataChannel('liowebrtc');
            if (dc.readyState !== 'open') return;
            dc.sendDirectlyToAll(JSON.stringify({ type: 'speaking' }));
          }
        });
      }
    });
    _this.on('stoppedSpeaking', function () {
      if (!self.hardMuted) {
        self.peers.forEach(function (peer) {
          if (peer.enableDataChannels) {
            var dc = peer.getDataChannel('liowebrtc');
            if (dc.readyState !== 'open') return;
            dc.sendDirectlyToAll(JSON.stringify({ type: 'stoppedSpeaking' }));
          }
        });
      }
    });
    _this.on('volumeChange', function (volume, treshold) {
      if (!self.hardMuted) {
        self.peers.forEach(function (peer) {
          if (peer.enableDataChannels) {
            var dc = peer.getDataChannel('liowebrtc');
            if (dc.readyState !== 'open') return;
            dc.sendDirectlyToAll(JSON.stringify({ type: 'payload', volume: volume }));
          }
        });
      }
    });

    // log events in debug mode
    if (_this.config.debug) {
      _this.on('*', function (event, val1, val2) {
        var logger = void 0;
        // if you didn't pass in a logger and you explicitly turning on debug
        // we're just going to assume you're wanting log output with console
        if (self.config.logger === _mockconsole2.default) {
          logger = console;
        } else {
          logger = self.logger;
        }
        logger.log('event:', event, val1, val2);
      });
    }
    return _this;
  }

  _createClass(WebRTC, [{
    key: 'createPeer',
    value: function createPeer(opts) {
      var peer = void 0;
      opts.parent = this;
      peer = new _peer2.default(opts);
      this.peers.push(peer);
      return peer;
    }

    // removes peers

  }, {
    key: 'removePeers',
    value: function removePeers(id, type) {
      this.getPeers(id, type).forEach(function (peer) {
        peer.end();
      });
    }

    // fetches all Peer objects by session id and/or type

  }, {
    key: 'getPeers',
    value: function getPeers(sessionId, type) {
      return this.peers.filter(function (peer) {
        return (!sessionId || peer.id === sessionId) && (!type || peer.type === type);
      });
    }
  }, {
    key: 'getPeerById',
    value: function getPeerById(id) {
      return this.peers.filter(function (p) {
        return p.id === id;
      })[0];
    }
  }, {
    key: 'getPeerByNick',
    value: function getPeerByNick(nick) {
      return this.peers.filter(function (p) {
        return p.nick === nick;
      })[0];
    }

    // sends message to all

  }, {
    key: 'sendToAll',
    value: function sendToAll(message, payload) {
      this.peers.forEach(function (peer) {
        peer.send(message, payload);
      });
    }

    // sends message to all using a datachannel
    // only sends to anyone who has an open datachannel

  }, {
    key: 'sendDirectlyToAll',
    value: function sendDirectlyToAll(message, payload, channel, shout) {
      var msgId = Date.now() + '_' + Math.random() * 1000000;
      this.peers.forEach(function (peer) {
        if (peer.enableDataChannels) {
          peer.sendDirectly(message, payload, channel, shout, msgId);
        }
      });
    }
  }, {
    key: 'shout',
    value: function shout(messageType, payload) {
      this.sendDirectlyToAll(messageType, payload, 'liowebrtc', true);
    }
  }, {
    key: 'whisper',
    value: function whisper(peer, messageType, payload) {
      peer.sendDirectly(messageType, payload);
    }
  }, {
    key: 'broadcast',
    value: function broadcast(messageType, payload) {
      this.sendToAll('signalData', { type: messageType, payload: payload });
    }
  }, {
    key: 'transmit',
    value: function transmit(peer, messageType, payload) {
      peer.send('signalData', { type: messageType, payload: payload });
    }
  }]);

  return WebRTC;
}(_localmedia2.default);

exports.default = WebRTC;