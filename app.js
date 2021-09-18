const width = prompt("Enter the board size");

document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.style.setProperty("--widthLen", width);
  const gridDisplay = document.querySelector(".grid");
  const scoreDisplay = document.getElementById("score");
  const resultDisplay = document.getElementById("result");
  let squares = [];
  let score = 0;

  //create the playing board
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      square = document.createElement("div");
      square.innerHTML = 0;
      gridDisplay.appendChild(square);
      squares.push(square);
    }
    generate();
    generate();
  }
  createBoard();

  //generate a new number
  function generate() {
    randomNumber = Math.floor(Math.random() * squares.length);
    console.log(randomNumber);
    if (squares[randomNumber].innerHTML == 0) {
      squares[randomNumber].innerHTML = 2;
      checkForGameOver();
    } else generate();
  }

  function moveRight() {
    for (let i = 0; i < width * width; i++) {
      if (i % width === 0) {
        let row = [];
        for (let j = 0; j < width; j++) {
          row.push(parseInt(squares[i + j].innerHTML));
        }

        let filteredRow = row.filter((num) => num);
        let missing = width - filteredRow.length;
        let zeros = Array(missing).fill(0);
        let newRow = zeros.concat(filteredRow);

        for (let j = 0; j < width; j++) {
          squares[i + j].innerHTML = newRow[j];
        }
      }
    }
  }

  function moveLeft() {
    for (let i = 0; i < width * width; i++) {
      if (i % width === 0) {
        let row = [];
        for (let j = 0; j < width; j++) {
          row.push(parseInt(squares[i + j].innerHTML));
        }
        let filteredRow = row.filter((num) => num);
        let missing = width - filteredRow.length;
        let zeros = Array(missing).fill(0);
        let newRow = filteredRow.concat(zeros);

        for (let j = 0; j < width; j++) {
          squares[i + j].innerHTML = newRow[j];
        }
      }
    }
  }

  function moveUp() {
    for (let i = 0; i < width; i++) {
      let column = [];
      for (let j = 0; j < width; j++) {
        column.push(parseInt(squares[i + width * j].innerHTML));
      }

      let filteredColumn = column.filter((num) => num);
      let missing = width - filteredColumn.length;
      let zeros = Array(missing).fill(0);
      let newColumn = filteredColumn.concat(zeros);

      for (let j = 0; j < width; j++) {
        squares[i + width * j].innerHTML = newColumn[j];
      }
    }
  }

  function moveDown() {
    for (let i = 0; i < width; i++) {
      let column = [];
      for (let j = 0; j < width; j++) {
        column.push(parseInt(squares[i + width * j].innerHTML));
      }

      let filteredColumn = column.filter((num) => num);
      let missing = width - filteredColumn.length;
      let zeros = Array(missing).fill(0);
      let newColumn = zeros.concat(filteredColumn);

      for (let j = 0; j < width; j++) {
        squares[i + width * j].innerHTML = newColumn[j];
      }
    }
  }

  //assign functions to keyCodes
  function control(e) {
    if (e.keyCode === 37) {
      keyLeft();
    } else if (e.keyCode === 38) {
      keyUp();
    } else if (e.keyCode === 39) {
      keyRight();
    } else if (e.keyCode === 40) {
      keyDown();
    }
  }
  document.addEventListener("keyup", control);

  function keyRight() {
    moveRight();
    generate();
  }

  function keyLeft() {
    moveLeft();
    generate();
  }

  function keyUp() {
    moveUp();
    generate();
  }

  function keyDown() {
    moveDown();
    generate();
  }

  //check if there are no zeros on the board to lose
  function checkForGameOver() {
    let zeros = 0;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) {
        zeros++;
      }
    }
    if (zeros === 0) {
      resultDisplay.innerHTML = "Game over";
      document.removeEventListener("keyup", control);
      setTimeout(() => clear(), 3000);
    }
  }

  //clear timer
  function clear() {
    clearInterval(myTimer);
  }

  //add colours
  function addColours() {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0)
        squares[i].style.backgroundColor = "#afa192";
      else if (squares[i].innerHTML == 2)
        squares[i].style.backgroundColor = "#eee4da";
      else if (squares[i].innerHTML == 4)
        squares[i].style.backgroundColor = "#ede0c8";
      else if (squares[i].innerHTML == 8)
        squares[i].style.backgroundColor = "#f2b179";
      else if (squares[i].innerHTML == 16)
        squares[i].style.backgroundColor = "#ffcea4";
      else if (squares[i].innerHTML == 32)
        squares[i].style.backgroundColor = "#e8c064";
      else if (squares[i].innerHTML == 64)
        squares[i].style.backgroundColor = "#ffab6e";
      else if (squares[i].innerHTML == 128)
        squares[i].style.backgroundColor = "#fd9982";
      else if (squares[i].innerHTML == 256)
        squares[i].style.backgroundColor = "#ead79c";
      else if (squares[i].innerHTML == 512)
        squares[i].style.backgroundColor = "#76daff";
      else if (squares[i].innerHTML == 1024)
        squares[i].style.backgroundColor = "#beeaa5";
      else if (squares[i].innerHTML == 2048)
        squares[i].style.backgroundColor = "#d7d4f0";
    }
  }
  addColours();

  var myTimer = setInterval(addColours, 50);
});
