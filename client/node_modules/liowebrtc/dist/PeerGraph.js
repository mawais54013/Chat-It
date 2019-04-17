"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PeerGraph = function () {
  function PeerGraph() {
    _classCallCheck(this, PeerGraph);

    this.nodes = {};
    this.edges = {};
    this.edgeCount = 0;
  }

  _createClass(PeerGraph, [{
    key: "addEdge",
    value: function addEdge(edge) {
      var node1 = this.getNodeById(edge.node1.getId());
      var node2 = this.getNodeById(edge.node2.getId());
      if (!node1) {
        this.addNode(edge.node1);
        node1 = this.getNodeById(edge.node1.getId());
      }
      if (!node2) {
        this.addNode(edge.node2);
        node2 = this.getNodeById(edge.node2.getId());
      }

      if (this.edges[edge.getId()]) {
        // throw new Error('Edge already exists');
      } else {
        this.edges[edge.getId()] = edge;
      }
      // Add edge to both node instances because it's an undirected graph
      node1.addEdge(edge);
      node2.addEdge(edge);
      return this;
    }
  }, {
    key: "addNode",
    value: function addNode(newNode) {
      this.nodes[newNode.getId()] = newNode;
      return this;
    }
  }, {
    key: "getNodeById",
    value: function getNodeById(id) {
      return this.nodes[id];
    }
  }, {
    key: "getNeighbors",
    value: function getNeighbors(node) {
      return node.getNeighbors();
    }
  }, {
    key: "getWeight",
    value: function getWeight() {
      return this.getAllEdges().reduce(function (weight, edge) {
        return weight + edge.weight;
      }, 0);
    }
  }, {
    key: "getAllNodes",
    value: function getAllNodes() {
      return Object.values(this.nodes);
    }
  }, {
    key: "getAllEdges",
    value: function getAllEdges() {
      return Object.values(this.edges);
    }
  }, {
    key: "findNodeById",
    value: function findNodeById(nodeId) {
      if (this.nodes[nodeId]) {
        return this.nodes[nodeId];
      }
      return null;
    }
  }, {
    key: "findEdge",
    value: function findEdge(node1, node2) {
      var node = this.getNodeById(node1.getId());
      if (!node) {
        return null;
      }
      return node.findEdge(node2);
    }
  }, {
    key: "deleteEdge",
    value: function deleteEdge(edge) {
      if (!edge) {
        return;
      }
      if (this.edges[edge.getId()]) {
        delete this.edges[edge.getId()];
      }
      var node1 = this.getNodeById(edge.node1.getId());
      var node2 = this.getNodeById(edge.node2.getId());
      node1.deleteEdge(edge);
      node2.deleteEdge(edge);
    }
  }, {
    key: "getNodeIndices",
    value: function getNodeIndices() {
      var nodeIndices = {};
      this.getAllNodes().forEach(function (node, index) {
        nodeIndices[node.getId()] = index;
      });
      return nodeIndices;
    }
  }, {
    key: "toString",
    value: function toString() {
      return Object.keys(this.nodes).toString();
    }
  }, {
    key: "toJSON",
    value: function toJSON() {}
  }]);

  return PeerGraph;
}();

exports.default = PeerGraph;