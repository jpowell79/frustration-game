// define start and end points for circles
// x1, y1 are start
// x2, y2 are end
function placeCirclesBetween(x1, y1, x2, y2, count) {
  const xDiff = x2 - x1;
  const yDiff = y2 - y1;
  const circles = [];
  for (let i = 1; i < count; i++) {
    const factor = i / count;
    const x = x1 + factor * xDiff;
    const y = y1 + factor * yDiff;
    circles.push({ x, y });
  }
  return circles;
}

const numCircles = 28;
const container = document.querySelector(".circle-container");
const angleIncrement = 360 / numCircles;

for (let i = 0; i < numCircles; i++) {
  const angle = angleIncrement * i;
  const x = 50 + 50 * Math.cos((angle * Math.PI) / 180); // 50% is the center, adjust for circle radius
  const y = 50 + 50 * Math.sin((angle * Math.PI) / 180); // 50% is the center, adjust for circle radius

  const circle = container.children[i];
  circle.style.left = `${x}%`;
  circle.style.top = `${y}%`;
}

// middle circles runniung vertically (top to bottom)
const verticalCircles = placeCirclesBetween(50, 0, 50, 100, 11);
verticalCircles.forEach((coords, index) => {
  const circle = container.children[numCircles + index];
  circle.style.left = `${coords.x}%`;
  circle.style.top = `${coords.y}%`;
});

// middle circles running horizontally (left to right)
const horizontalCircles = placeCirclesBetween(0, 50, 100, 50, 11);
horizontalCircles.forEach((coords, index) => {
  const circle =
    container.children[numCircles + verticalCircles.length + index];
  circle.style.left = `${coords.x}%`;
  circle.style.top = `${coords.y}%`;
});

// all circles on the game board
const circles = document.querySelectorAll(".small-circle");

// capture the circle that was clicked on:
circles.forEach((circle) => {
  circle.addEventListener("click", function (e) {
    console.log(e.target.id + " was clicked!");
  });
});

// centre big red circle
const bigCircle = document.querySelector(".dice");
let rolledNumber;

let player1PiecesOnBoard = 0;
let player2PiecesOnBoard = 0;

let piecesOwnedByPlayer1 = [];
let piecesOwnedByPlayer2 = [];

// function for handling home circle clicks when a 6 has been rolled
function handleHomeCircleClick(e) {
  // confirm which home circle was clicked
  console.log("home circle " + e.target.id + " was clicked!");

  // now change that circle colour to the same colour as currentl player in focus
  e.target.style.backgroundColor = "#3498db";
  p1Piece1.style.backgroundColor = "white";

  homeCircles.forEach((circle) => {
    circle.removeEventListener("click", handleHomeCircleClick);
  });
}

// click on centre circle to get a random number
bigCircle.addEventListener("click", function (e) {
  console.log(e.target.id + " was clicked!");
  rolledNumber = document.querySelector(".cNumber").textContent = Math.trunc(
    Math.random() * 6 + 1
  );

  // Toggle between player focus if a 6 is not rolled
  if (rolledNumber !== Number(6)) {
    if (h1Player1.classList.contains("focus")) {
      h1Player1.classList.remove("focus");
      h1Player2.classList.add("focus");
    } else {
      h1Player2.classList.remove("focus");
      h1Player1.classList.add("focus");
    }
  }

// if player has at least one piece on the board, allow them to move a piece
if (player1PiecesOnBoard > 0 || player2PiecesOnBoard > 0) {
  if (h1Player1.classList.contains("focus")) {
      piecesOwnedByPlayer1.forEach((piece) => {
          const pieceElement = document.getElementById(piece);
          
          function pieceClickHandler(e) {
              // Turn the clicked home piece back to white
              e.target.style.backgroundColor = "white";
    
              // Now effectively move the piece forwards the number of spaces rolled
              let currentCircle = Number(e.target.id.slice(5));
              let moves = rolledNumber;
              let nextCircleId = `circle${currentCircle + moves}`;
              let nextCircle = document.getElementById(nextCircleId);
    
              // Change new circle to colour of player in focus
              if (nextCircle) {
                  nextCircle.style.backgroundColor = "#3498db";
              }
    
              // Now turn off the event listener for the piece that was just moved
              pieceElement.removeEventListener("click", pieceClickHandler);
          }

          pieceElement.addEventListener("click", pieceClickHandler);
      });
  }
}

    circles.forEach((circle) => {
      circle.addEventListener("click", function (e) {
        console.log(e.target.id + " was clicked!");
      });
    });
  }

  // If player rolls a 6
  if (rolledNumber === Number(6)) {
    homeCircles.forEach((circle) => {
      circle.addEventListener("click", handleHomeCircleClick);
    });
    // update the number of piecees the player has on the board
    if (h1Player1.classList.contains("focus")) {
      player1PiecesOnBoard++;
      piecesOwnedByPlayer1.push(e.target.id);
      console.log(
        "player 1 now has " + player1PiecesOnBoard + " pieces on the board"
      );
      console.log(piecesOwnedByPlayer1);
    } else {
      player2PiecesOnBoard++;
      piecesOwnedByPlayer2.push(e.target.id);
      console.log(
        "player 2 now has " + player1PiecesOnBoard + " pieces on the board"
      );
      console.log(piecesOwnedByPlayer2);
    }
  }
});

// player info
const player1 = document.querySelector(".Player1");
const player2 = document.querySelector(".Player2");

// player currently in focus
const h1Player1 = player1.querySelector("h1");
const h1Player2 = player2.querySelector("h1");

// four home circles where you must begin the game
const homeCircles = document.querySelectorAll(".small-circle.home");

// player 1 pieces
const p1Piece1 = document.querySelector("#Piece1");
const p1Piece2 = document.querySelector("#Piece2");
const p1Piece3 = document.querySelector("#Piece3");
const p1Piece4 = document.querySelector("#Piece4");

// player 2 pieces
const p2Piece1 = document.querySelector("#Piece5");
const p2Piece2 = document.querySelector("#Piece6");
const p2Piece3 = document.querySelector("#Piece7");
const p2Piece4 = document.querySelector("#Piece8");

// // If player rolls a 6
// if (rolledNumber === Number(6)) {
//   homeCircles.forEach((circle) => {
//     circle.addEventListener("click", handleHomeCircleClick);
//   });
// }
