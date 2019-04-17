'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Graph = undefined;
exports.addNode = addNode;
exports.addConnection = addConnection;
exports.removeConnection = removeConnection;
exports.getNeighbors = getNeighbors;
exports.isNeighbor = isNeighbor;
exports.getPeerLatencies = getPeerLatencies;
exports.average = average;
exports.squaredDiffs = squaredDiffs;
exports.stdDeviation = stdDeviation;
exports.getLatencyZScores = getLatencyZScores;
exports.getDroppablePeer = getDroppablePeer;

var _PeerGraph = require('./PeerGraph');

var _PeerGraph2 = _interopRequireDefault(_PeerGraph);

var _Edge = require('./Edge');

var _Edge2 = _interopRequireDefault(_Edge);

var _PeerNode = require('./PeerNode');

var _PeerNode2 = _interopRequireDefault(_PeerNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Graph = exports.Graph = new _PeerGraph2.default();

function addNode(nodeId) {
  var node = new _PeerNode2.default(nodeId);
  Graph.addNode(node);
}

function addConnection(node1Id, node2Id) {
  var latency = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  var nodeA = Graph.getNodeById(node1Id) || new _PeerNode2.default(node1Id);
  var nodeB = Graph.getNodeById(node2Id) || new _PeerNode2.default(node2Id);
  var edgeAB = new _Edge2.default(nodeA, nodeB, latency);
  return Graph.addEdge(edgeAB);
}

function removeConnection(node1Id, node2Id) {
  var nodeA = Graph.getNodeById(node1Id);
  var nodeB = Graph.getNodeById(node2Id);
  if (nodeA && nodeB) Graph.deleteEdge(Graph.findEdge(nodeA, nodeB));
}

function getNeighbors(nodeId) {
  var node = Graph.getNodeById(nodeId);
  var neighbors = node.getNeighbors();
  return neighbors.map(function (n) {
    return n.getId();
  });
}

function isNeighbor(node1Id, node2Id) {
  var nodeA = Graph.getNodeById(node1Id) || new _PeerNode2.default(node1Id);
  var nodeB = Graph.getNodeById(node2Id) || new _PeerNode2.default(node2Id);
  if (nodeA.hasNeighbor(nodeB)) {
    return true;
  }
  return false;
}

function getPeerLatencies(nodeId) {
  var node = Graph.findNodeById(nodeId);
  if (node) {
    var result = {};
    var edges = node.getEdges();
    edges.forEach(function (e) {
      var id = e.node1.getId() === nodeId ? e.node2.getId() : e.node1.getId();
      var latency = e.getWeight();
      result[id] = latency;
    });
    return result;
  }
}

function average(vals) {
  var total = vals.reduce(function (sum, val) {
    return val + sum;
  });
  return total / vals.length;
}

function squaredDiffs(vals, avg) {
  var sqd = vals.map(function (val) {
    return Math.pow(val - avg, 2);
  });
  return sqd;
}

function stdDeviation(sqDiffs) {
  var sum = sqDiffs.reduce(function (total, x) {
    return total + x;
  });
  return Math.sqrt(sum / sqDiffs.length);
}

function getLatencyZScores(nodeId) {
  var peerLatencyCache = getPeerLatencies(nodeId);
  var peerIds = Object.keys(peerLatencyCache);
  var peerLatencies = Object.values(peerLatencyCache);
  var avg = average(peerLatencies);
  var standardDeviation = stdDeviation(squaredDiffs(peerLatencies, avg));
  var zScores = {};
  peerIds.forEach(function (val, i) {
    zScores[val] = (peerLatencies[i] - avg) / standardDeviation;
  });
  return zScores;
}

function getDroppablePeer(nodeId) {
  var zScores = getLatencyZScores(nodeId);
  var droppable = zScores.filter(function (s) {
    return s <= -1;
  });
  var orderedDroppable = droppable.sort(function (a, b) {
    return b - a;
  });
  return orderedDroppable[0];
}