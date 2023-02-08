let grid = []
let rows = 20
let cols = 20
let width = 600
let height = 600

let current

function setup() {
    createCanvas(width, height)
    background(0)
    for (let i = 0; i < rows; i++) {
        grid.push([])
        for (let j = 0; j < cols; j++) {
            let cell = new Cell(i, j, i * Math.floor(width / rows), j * Math.floor(height / cols), Math.floor(width / rows), Math.floor(height / cols))
            grid[i].push(cell)
        }
    }
    current = grid[0][0]
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j].show()
        }
    }
}

function draw() {
    frameRate(5)
    current.mark()
    const neighbours = current.checkNeighbours()
    const randIndex = Math.floor(Math.random() * neighbours.length)
    const next = neighbours.length > 0 ? neighbours[randIndex] : current
    current.removeWall(next)
    current = next
}