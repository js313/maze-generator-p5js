let grid = [];
let rows = 50;
let cols = 50;
let width = 600;
let height = 600;

let current;

let stack = [];

function setup() {
  createCanvas(width, height);
  background(0);
  for (let i = 0; i < rows; i++) {
    grid.push([]);
    for (let j = 0; j < cols; j++) {
      let cell = new Cell(
        i,
        j,
        i * (width / rows),
        j * (height / cols),
        width / rows,
        height / cols
      );
      grid[i].push(cell);
    }
  }
  current = grid[0][0];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j].show();
    }
  }
}

function draw() {
  //   frameRate(10);
  current && current.currentMark();
  current && current.mark();
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j].show();
    }
  }
  if (!current) {
    noLoop();
    return;
  }
  current.currentUnMark();
  const neighbours = current.checkNeighbours();
  const randIndex = Math.floor(Math.random() * neighbours.length);
  let next;
  if (neighbours.length > 0) {
    stack.push(current);
    next = neighbours[randIndex];
  } else if (stack.length > 0) {
    next = stack.pop();
  }
  if (next) {
    current.removeWall(next);
  } else {
    current.currentUnMark();
  }
  current = next;
}
