/* 
 * Code Filename: ComplexCode.js
 * Description: This code is a complex implementation of a routing algorithm in a transportation system.
 * It utilizes various data structures and algorithms to optimize the routes and handle real-time updates.
 */

// Define all the necessary data structures

// Class to represent a transportation node
class Node {
    constructor(id, name, x, y) {
        this.id = id;
        this.name = name;
        this.x = x;
        this.y = y;
        this.neighbors = []; // Array of neighbor nodes
    }

    addNeighbor(neighbor) {
        this.neighbors.push(neighbor);
    }
}

// Class to represent a transportation graph
class Graph {
    constructor() {
        this.nodes = []; // Array of nodes in the graph
    }

    addNode(node) {
        this.nodes.push(node);
    }
}

// Class to represent a transportation route
class Route {
    constructor(source, destination, weight) {
        this.source = source;
        this.destination = destination;
        this.weight = weight;
    }
}

// Define the routing algorithm

function calculateRoute(graph, sourceId, destinationId) {
    let nodes = graph.nodes;
    let sourceNode, destinationNode;

    // Find source and destination nodes in the graph
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].id === sourceId) {
            sourceNode = nodes[i];
        }
        if (nodes[i].id === destinationId) {
            destinationNode = nodes[i];
        }
    }

    // Dijkstra's algorithm to find the shortest path
    let queue = new PriorityQueue(); // Priority queue to store nodes to be visited
    let distances = {}; // Map to store the shortest distances from the source node
    let previousNodes = {}; // Map to store the previous node in the shortest path

    for (let i = 0; i < nodes.length; i++) {
        distances[nodes[i].id] = Infinity;
        previousNodes[nodes[i].id] = null;
    }

    distances[sourceNode.id] = 0;
    queue.enqueue(sourceNode, 0);

    while (!queue.isEmpty()) {
        let current = queue.dequeue();

        for (let i = 0; i < current.neighbors.length; i++) {
            let neighbor = current.neighbors[i];
            let tentativeDistance = distances[current.id] + calculateDistance(current, neighbor);

            if (tentativeDistance < distances[neighbor.id]) {
                distances[neighbor.id] = tentativeDistance;
                previousNodes[neighbor.id] = current;
                queue.enqueue(neighbor, distances[neighbor.id]);
            }
        }
    }

    // Build the shortest path from source to destination
    let path = [];
    let current = destinationNode;
    while (current !== null) {
        path.unshift(current);
        current = previousNodes[current.id];
    }

    // Construct the route object
    let route = new Route(sourceNode, destinationNode, distances[destinationNode.id]);
    route.path = path;

    return route;
}

// Helper function to calculate the Euclidean distance between two nodes
function calculateDistance(node1, node2) {
    let dx = node2.x - node1.x;
    let dy = node2.y - node1.y;
    return Math.sqrt(dx * dx + dy * dy);
}

// Implementation of a priority queue for Dijkstra's algorithm

class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(item, priority) {
        this.queue.push({ item, priority });
        this.queue.sort((a, b) => a.priority - b.priority);
    }

    dequeue() {
        return this.queue.shift().item;
    }

    isEmpty() {
        return this.queue.length === 0;
    }
}

// Usage Example

// Create a graph with nodes and their connections
let graph = new Graph();

let nodeA = new Node(1, "Node A", 0, 0);
let nodeB = new Node(2, "Node B", 0, 10);
let nodeC = new Node(3, "Node C", 10, 10);
let nodeD = new Node(4, "Node D", 10, 0);

nodeA.addNeighbor(nodeB);
nodeA.addNeighbor(nodeC);
nodeB.addNeighbor(nodeC);
nodeC.addNeighbor(nodeD);

graph.addNode(nodeA);
graph.addNode(nodeB);
graph.addNode(nodeC);
graph.addNode(nodeD);

// Calculate the route from node A to node D
let route = calculateRoute(graph, 1, 4);

// Print the route details
console.log("Source: " + route.source.name);
console.log("Destination: " + route.destination.name);
console.log("Distance: " + route.weight);
console.log("Path:");
for (let i = 0; i < route.path.length; i++) {
    console.log(route.path[i].name);
}