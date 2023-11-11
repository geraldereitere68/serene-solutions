/*
filename: complex_code.js

This code generates a maze and solves it using the A* algorithm.

*/

// Define a class representing the maze
class Maze {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.data = [];
    this.generate();
  }

  print() {
    console.log('-'.repeat(2 * this.width + 1));
    for (let y = 0; y < this.height; y++) {
      let line = '|';
      for (let x = 0; x < this.width; x++) {
        line += this.data[y * this.width + x] ? ' ' : '█';
        line += '|';
      }
      console.log(line);
      console.log('-'.repeat(2 * this.width + 1));
    }
  }

  generate() {
    this.data = Array(this.width * this.height).fill(true);
    this.carve(0, 0);
    this.data[this.height * this.width - 1] = false;
  }

  carve(x, y) {
    const directions = [
      [2, 0], // Right
      [0, 2], // Down
      [-2, 0], // Left
      [0, -2], // Up
    ];
    const shuffle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    this.data[y * this.width + x] = false;

    for (const direction of shuffle(directions)) {
      const [dx, dy] = direction;
      const nextX = x + dx;
      const nextY = y + dy;

      if (nextX < 0 || nextX >= this.width || nextY < 0 || nextY >= this.height) {
        continue;
      }

      if (this.data[nextY * this.width + nextX]) {
        this.data[y + dy / 2 * this.width + dx / 2] = false;
        this.carve(nextX, nextY);
      }
    }
  }
}

// Define a class representing a solver using the A* algorithm
class MazeSolver {
  constructor(maze) {
    this.maze = maze;
    this.startX = 0;
    this.startY = 0;
    this.endX = maze.width - 1;
    this.endY = maze.height - 1;
    this.openSet = [];
    this.closedSet = [];
    this.cameFrom = {};
    this.gScore = {};
    this.fScore = {};
    this.solved = false;
  }

  solve() {
    this.openSet.push([this.startX, this.startY]);
    this.gScore[this.startX + ',' + this.startY] = 0;
    this.fScore[this.startX + ',' + this.startY] = this.heuristic(this.startX, this.startY);

    while (this.openSet.length > 0) {
      let currentIndex = 0;
      let currentFScore = this.fScore[this.openSet[currentIndex][0] + ',' + this.openSet[currentIndex][1]];

      for (let i = 1; i < this.openSet.length; i++) {
        const fScore = this.fScore[this.openSet[i][0] + ',' + this.openSet[i][1]];
        if (fScore < currentFScore) {
          currentIndex = i;
          currentFScore = fScore;
        }
      }

      const current = this.openSet[currentIndex];
      if (current[0] === this.endX && current[1] === this.endY) {
        this.solved = true;
        break;
      }

      this.openSet.splice(currentIndex, 1);
      this.closedSet.push(current);

      const neighbors = this.getNeighbors(current[0], current[1]);
      for (const neighbor of neighbors) {
        if (this.closedSet.some(([x, y]) => x === neighbor[0] && y === neighbor[1])) {
          continue;
        }

        const tentativeGScore = this.gScore[current[0] + ',' + current[1]] + 1;
        const neighborGScore = this.gScore[neighbor[0] + ',' + neighbor[1]];
        if (!this.openSet.some(([x, y]) => x === neighbor[0] && y === neighbor[1])) {
          this.openSet.push(neighbor);
        } else if (tentativeGScore >= neighborGScore) {
          continue;
        }

        this.cameFrom[neighbor[0] + ',' + neighbor[1]] = current;
        this.gScore[neighbor[0] + ',' + neighbor[1]] = tentativeGScore;
        this.fScore[neighbor[0] + ',' + neighbor[1]] = tentativeGScore + this.heuristic(neighbor[0], neighbor[1]);
      }
    }
  }

  getNeighbors(x, y) {
    const neighbors = [
      [x + 1, y],
      [x, y + 1],
      [x - 1, y],
      [x, y - 1],
    ];
    return neighbors.filter(([nx, ny]) => this.maze.data[ny * this.maze.width + nx] === false);
  }

  heuristic(x, y) {
    return Math.abs(x - this.endX) + Math.abs(y - this.endY);
  }

  getPath() {
    const path = [[this.endX, this.endY]];
    let current = this.cameFrom[this.endX + ',' + this.endY];
    while (current) {
      path.push(current);
      current = this.cameFrom[current[0] + ',' + current[1]];
    }
    path.push([this.startX, this.startY]);
    return path.reverse();
  }
}

// Usage
const maze = new Maze(15, 10);
maze.print();

const solver = new MazeSolver(maze);
solver.solve();
console.log(solver.solved ? 'Solved!' : 'Not solvable.');
console.log(solver.getPath());
