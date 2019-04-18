'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Node = function () {
  function Node(value) {
    _classCallCheck(this, Node);

    if (value === undefined) {
      throw new Error('Node must have an ID');
    }
    this.value = value;
    this.edges = {};
  }

  _createClass(Node, [{
    key: 'addEdge',
    value: function addEdge(edge) {
      this.edges[edge.getId()] = edge;
      return this;
    }
  }, {
    key: 'deleteEdge',
    value: function deleteEdge(edge) {
      delete this.edges[edge.getId()];
    }
  }, {
    key: 'getEdges',
    value: function getEdges() {
      return Object.values(this.edges);
    }
  }, {
    key: 'getDegree',
    value: function getDegree() {
      return Object.keys(this.edges).length;
    }
  }, {
    key: 'getNeighbors',
    value: function getNeighbors() {
      var _this = this;

      var edges = Object.values(this.edges);
      var nodes = edges.map(function (e) {
        return e.node1 === _this ? e.node2 : e.node1;
      });
      return nodes;
    }
  }, {
    key: 'hasEdge',
    value: function hasEdge(requiredEdge) {
      var edgeNode = this.edges.filter(function (edge) {
        return edge.getId() === requiredEdge.getId();
      });
      return !!edgeNode.length;
    }
  }, {
    key: 'hasNeighbor',
    value: function hasNeighbor(node) {
      var nodeWeWant = Object.values(this.edges).filter(function (e) {
        return e.node1.getId() === node.getId() || e.node2.getId() === node.getId();
      });
      return !!nodeWeWant.length;
    }
  }, {
    key: 'findEdge',
    value: function findEdge(node) {
      var result = Object.values(this.edges).filter(function (e) {
        return e.node1.getId() === node.getId() || e.node2.getId() === node.getId();
      });
      return result.length ? result[0] : null;
    }
  }, {
    key: 'getId',
    value: function getId() {
      return this.value;
    }
  }, {
    key: 'deleteAllEdges',
    value: function deleteAllEdges() {
      var _this2 = this;

      this.getEdges().forEach(function (e) {
        return _this2.deleteEdge(e);
      });
      return this;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return '' + this.value;
    }
  }]);

  return Node;
}();

exports.default = Node;