'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _hark = require('hark');

var _hark2 = _interopRequireDefault(_hark);

var _wildemitter = require('wildemitter');

var _wildemitter2 = _interopRequireDefault(_wildemitter);

var _mockconsole = require('mockconsole');

var _mockconsole2 = _interopRequireDefault(_mockconsole);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function isAllTracksEnded(stream) {
  var isAllTracksEnded = true;
  stream.getTracks().forEach(function (t) {
    isAllTracksEnded = t.readyState === 'ended' && isAllTracksEnded;
  });
  return isAllTracksEnded;
}

function shouldWorkAroundFirefoxStopStream() {
  if (typeof window === 'undefined') {
    return false;
  }
  if (!window.navigator.mozGetUserMedia) {
    return false;
  }
  var match = window.navigator.userAgent.match(/Firefox\/(\d+)\./);
  var version = match && match.length >= 1 && parseInt(match[1], 10);
  return version < 50;
}

var LocalMedia = function (_WildEmitter) {
  _inherits(LocalMedia, _WildEmitter);

  function LocalMedia(opts) {
    _classCallCheck(this, LocalMedia);

    var _this = _possibleConstructorReturn(this, (LocalMedia.__proto__ || Object.getPrototypeOf(LocalMedia)).call(this));

    var config = _this.config = {
      detectSpeakingEvents: false,
      audioFallback: false,
      media: {
        audio: true,
        video: true
      },
      harkOptions: null,
      logger: _mockconsole2.default
    };

    var item = void 0;
    for (item in opts) {
      if (opts.hasOwnProperty(item)) {
        _this.config[item] = opts[item];
      }
    }

    _this.logger = config.logger;
    _this._log = _this.logger.log.bind(_this.logger, 'LocalMedia:');
    _this._logerror = _this.logger.error.bind(_this.logger, 'LocalMedia:');

    _this.localStreams = [];
    _this.localScreens = [];

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      _this._logerror('Your browser does not support local media capture.');
    }

    _this._audioMonitors = [];
    _this.on('localStreamStopped', _this._stopAudioMonitor.bind(_this));
    _this.on('localScreenStopped', _this._stopAudioMonitor.bind(_this));
    return _this;
  }

  _createClass(LocalMedia, [{
    key: 'start',
    value: function start(mediaConstraints, cb) {
      var self = this;
      var constraints = mediaConstraints || this.config.media;

      this.emit('localStreamRequested', constraints);

      navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
        if (constraints.audio && self.config.detectSpeakingEvents) {
          self._setupAudioMonitor(stream, self.config.harkOptions);
        }
        self.localStreams.push(stream);

        stream.getTracks().forEach(function (track) {
          track.addEventListener('ended', function () {
            if (isAllTracksEnded(stream)) {
              self._removeStream(stream);
            }
          });
        });

        self.emit('localStream', stream);

        if (cb) {
          return cb(null, stream);
        }
      }).catch(function (err) {
        // Fallback for users without a camera
        if (self.config.audioFallback && err.name === 'NotFoundError' && constraints.video !== false) {
          constraints.video = false;
          self.start(constraints, cb);
          return;
        }

        self.emit('localStreamRequestFailed', constraints);

        if (cb) {
          return cb(err, null);
        }
      });
    }
  }, {
    key: 'stop',
    value: function stop(stream) {
      this.stopStream(stream);
    }
  }, {
    key: 'stopStream',
    value: function stopStream(stream) {
      var self = this;

      if (stream) {
        var idx = this.localStreams.indexOf(stream);
        if (idx > -1) {
          stream.getTracks().forEach(function (track) {
            track.stop();
          });

          // Half-working fix for Firefox, see: https://bugzilla.mozilla.org/show_bug.cgi?id=1208373
          if (shouldWorkAroundFirefoxStopStream()) {
            this._removeStream(stream);
          }
        }
      } else {
        this.localStreams.forEach(function (stream) {
          stream.getTracks().forEach(function (track) {
            track.stop();
          });

          // Half-working fix for Firefox, see: https://bugzilla.mozilla.org/show_bug.cgi?id=1208373
          if (shouldWorkAroundFirefoxStopStream()) {
            self._removeStream(stream);
          }
        });
      }
    }
    // Audio controls

  }, {
    key: 'mute',
    value: function mute() {
      this._audioEnabled(false);
      this.emit('audioOff');
    }
  }, {
    key: 'unmute',
    value: function unmute() {
      this._audioEnabled(true);
      this.emit('audioOn');
    }

    // Video controls

  }, {
    key: 'pauseVideo',
    value: function pauseVideo() {
      this._videoEnabled(false);
      this.emit('videoOff');
    }
  }, {
    key: 'resumeVideo',
    value: function resumeVideo() {
      this._videoEnabled(true);
      this.emit('videoOn');
    }

    // Combined controls

  }, {
    key: 'pause',
    value: function pause() {
      this.mute();
      this.pauseVideo();
    }
  }, {
    key: 'resume',
    value: function resume() {
      this.unmute();
      this.resumeVideo();
    }

    // Internal methods for enabling/disabling audio/video

  }, {
    key: '_audioEnabled',
    value: function _audioEnabled(bool) {
      this.localStreams.forEach(function (stream) {
        stream.getAudioTracks().forEach(function (track) {
          track.enabled = !!bool;
        });
      });
    }
  }, {
    key: '_videoEnabled',
    value: function _videoEnabled(bool) {
      this.localStreams.forEach(function (stream) {
        stream.getVideoTracks().forEach(function (track) {
          track.enabled = !!bool;
        });
      });
    }

    // check if all audio streams are enabled

  }, {
    key: 'isAudioEnabled',
    value: function isAudioEnabled() {
      var enabled = true;
      this.localStreams.forEach(function (stream) {
        stream.getAudioTracks().forEach(function (track) {
          enabled = enabled && track.enabled;
        });
      });
      return enabled;
    }

    // check if all video streams are enabled

  }, {
    key: 'isVideoEnabled',
    value: function isVideoEnabled() {
      var enabled = true;
      this.localStreams.forEach(function (stream) {
        stream.getVideoTracks().forEach(function (track) {
          enabled = enabled && track.enabled;
        });
      });
      return enabled;
    }
  }, {
    key: '_removeStream',
    value: function _removeStream(stream) {
      var idx = this.localStreams.indexOf(stream);
      if (idx > -1) {
        this.localStreams.splice(idx, 1);
        this.emit('localStreamStopped', stream);
      } else {
        idx = this.localScreens.indexOf(stream);
        if (idx > -1) {
          this.localScreens.splice(idx, 1);
          this.emit('localScreenStopped', stream);
        }
      }
    }
  }, {
    key: '_setupAudioMonitor',
    value: function _setupAudioMonitor(stream, harkOptions) {
      this._log('Setup audio');
      var audio = (0, _hark2.default)(stream, harkOptions);
      var self = this;
      var timeout = void 0;

      audio.on('speaking', function () {
        self.emit('speaking');
      });

      audio.on('stopped_speaking', function () {
        if (timeout) {
          clearTimeout(timeout);
        }

        timeout = setTimeout(function () {
          self.emit('stoppedSpeaking');
        }, 1000);
      });
      audio.on('volume_change', function (volume, threshold) {
        self.emit('volumeChange', volume, threshold);
      });

      this._audioMonitors.push({ audio: audio, stream: stream });
    }
  }, {
    key: '_stopAudioMonitor',
    value: function _stopAudioMonitor(stream) {
      var idx = -1;
      this._audioMonitors.forEach(function (monitors, i) {
        if (monitors.stream === stream) {
          idx = i;
        }
      });

      if (idx > -1) {
        this._audioMonitors[idx].audio.stop();
        this._audioMonitors.splice(idx, 1);
      }
    }
  }]);

  return LocalMedia;
}(_wildemitter2.default);

exports.default = LocalMedia;