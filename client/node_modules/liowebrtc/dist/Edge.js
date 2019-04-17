"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Edge = function () {
  function Edge(startNode, endNode) {
    var weight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    _classCallCheck(this, Edge);

    this.node1 = startNode;
    this.node2 = endNode;
    this.weight = weight;
  }

  _createClass(Edge, [{
    key: "getId",
    value: function getId() {
      var startNodeId = this.node1.getId();
      var endNodeId = this.node2.getId();
      return startNodeId + "_" + endNodeId;
    }
  }, {
    key: "getWeight",
    value: function getWeight() {
      return this.weight;
    }
  }, {
    key: "setWeight",
    value: function setWeight(weight) {
      this.weight = weight;
    }
  }, {
    key: "reverse",
    value: function reverse() {
      var tmp = this.node1;
      this.node1 = this.node2;
      this.node2 = tmp;
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.getId();
    }
  }]);

  return Edge;
}();

exports.default = Edge;