const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const resolution = 10;
canvas.width = 500;
canvas.height = 500;

const COLS = canvas.width / resolution;
const ROWS = canvas.height / resolution;

function make2DArray() {
  return new Array(COLS).fill(null)
    .map(() => new Array(ROWS).fill(null)
      .map(() => Math.floor(Math.random() * 2))
    );
}

let grid = make2DArray();

requestAnimationFrame(updateGrid)

function updateGrid() {
  grid = nextGeneration(grid);
  render(grid);
  requestAnimationFrame(updateGrid)
}


function nextGeneration(grid) {
  //Make a copy of the 2Darray to present the NEXT generation
  const nextGen = grid.map(arr => [...arr]);
  //Outer loop to go through the entire grid
  for (let col = 0; col < grid.length; col++) {
    for (let row = 0; row < grid[col].length; row++) {
      const cell = grid[col][row];
      let sum = 0
      //Innter loop to loop the 8 nearby neighbors
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          //this is to avoid counting the cell itself
          if (i === 0 && j === 0) {
            continue;
          }
          const x_cell = col + i;
          const y_cell = row + j;
          //Checking for the edges of the 3x3 area
          if (x_cell >= 0 && y_cell >= 0 && x_cell < COLS && y_cell < ROWS) {
            const current = grid[col + i][j + row];
            sum += current;
          }
        }
      }
      //RULES
      if (cell === 1 && sum < 2) {
        nextGen[col][row] = 0
      } else if (cell === 1 && sum > 3) {
        nextGen[col][row] = 0
      } else if (cell === 0 && sum === 3) {
        nextGen[col][row] = 1
      }
    }
  }
  return nextGen;
}


function render(grid) {
  for (let col = 0; col < grid.length; col++) {
    for (let row = 0; row < grid[col].length; row++) {
      const cell = grid[col][row];

      ctx.beginPath();
      ctx.rect(col * resolution, row * resolution, resolution, resolution);
      ctx.fillStyle = cell ? "black" : "white"
      ctx.fill();
      ctx.stroke();
    }
  }
}
