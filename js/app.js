console.log('Hello Chris, ya dumb betch! Go practice Lapis, Scapellus, Papyrus!!!');

const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
//class is cell
const WINNING_COMBINATIONS = [
//stick to trad array positions, rename per row/col may create probs/conf
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6]
]





//data-cell bc all cells behave the same, only styling diff
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
//DOM p229-245, but "mark object" W3S (related $ in css-tricks)
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn





startGame()





restartButton.addEventListener('click', startGame)





function startGame() {
  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
//booleans p35 ANDDDD p191 (only !== and === in their own chapter)
    cell.addEventListener('click', handleClick, { once: true })
    
//once true, to prevent replay
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}





//if not circle turn then x turn, vice versa
function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  placeMark(cell, currentClass)
  console.log(currentClass)
//checking if current player wins (if, else if, else) p31
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}





//popup message
function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O" : "X"} Wins`
  }
  winningMessageElement.classList.add('show')
}





//draw condition
function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}





function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}
function swapTurns() {
  circleTurn = !circleTurn
}




      // REDO THE
      // "LAPIS, PAPYRUS, SCAPELLUS"
      // TO IMPROVE JS LONGHAND!!!




//this is tho show whose turn it is with the faded x/o on hover
function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}
//ref nick and yash used big-arrows on their ttt
//we won't formally learn big-arrows until unit2
//do a tracker for wins/losses???
//return later with "minimax" use FCC vid