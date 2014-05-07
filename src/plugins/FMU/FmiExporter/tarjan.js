/**
 * https://gist.github.com/chadhutchins/1440602
 */

define([], function () {
    'use strict';
    function Graph(vertices) {
        // Assumption: names are unique.
        this.vertices = vertices || [];
    }

    function Vertex(name) {
        this.name = name;
        this.connectedVertices = [];
        this.index = -1;
        this.lowlink = -1;
    }

    Vertex.prototype.connectTo = function (vertex) {
        this.connectedVertices.push(vertex);
    };

    function Tarjan(graph) {
        this.index = 0;
        this.stackLookup = {};
        this.stack = [];
        this.graph = graph;
        this.SCCs = [];
    }

    Tarjan.prototype.run = function () {
        var i;
        for (i = 0; i < this.graph.vertices.length; i += 1) {
            if (this.graph.vertices[i].index < 0) {
                this.strongConnect(this.graph.vertices[i]);
            }
        }
        return this.SCCs;
    };

    Tarjan.prototype.strongConnect = function (vertex) {
        var i,
            connectedVertex,
            sccVertices = [],
            topVertex;
        // Set the depth index for v to the smallest unused index
        vertex.index = this.index;
        vertex.lowlink = this.index;
        this.index = this.index + 1;

        this.stack.push(vertex);
        this.stackLookup[vertex.name] = true;
        // Consider successors of vertex
        // aka... consider each vertex in vertex.connections
        for (i = 0; i < vertex.connectedVertices.length; i += 1) {
            connectedVertex = vertex.connectedVertices[i];
            if (connectedVertex.index < 0) {
                // Successor connectedVertex has not yet been visited; recurse on it
                this.strongConnect(connectedVertex);
                vertex.lowlink = Math.min(vertex.lowlink, connectedVertex.lowlink);
            } else if (this.stackLookup[connectedVertex.name]) {
                // Successor connectedVertex is in stack S and hence in the current SCC
                vertex.lowlink = Math.min(vertex.lowlink, connectedVertex.index);
            }
        }

        // If vertex is a root node, pop the stack and generate an SCC.
        if (vertex.lowlink === vertex.index) {
            // start a new strongly connected component
            if (this.stack.length > 0) {
                do {
                    topVertex = this.stack.pop();
                    this.stackLookup[topVertex.name] = false;
                    // add topVertex to current strongly connected component
                    sccVertices.push(topVertex);
                } while (vertex.name !== topVertex.name);
            }
            // output the current strongly connected component
            // ... i'm going to push the results to a member scc array variable
            if (sccVertices.length > 0) {
                this.SCCs.push(sccVertices);
            }
        }
    };

    return {
        Vertex: Vertex,
        Graph: Graph,
        Tarjan: Tarjan
    };
});