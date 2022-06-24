const dicionario = palavras.filter(palavra => palavra.length === 5)
                           .filter(palavra => !palavra.includes('.'))
                           .filter(palavra => !palavra.includes('-'))


// create dictionary
const validWordList = ['RATOS', 'PERDA', 'LEOES', 'CASAS', 'FRODO'];

// shuffle the dictionary for a 5 letter word to be the answer
const answer = 'RATOS';


// add event listener for all keyboard keys
const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('click', keyPress));
let lastKeyPressed = '';
const guesses = [];

function keyPress(event) {
  const letter = event.target.innerText; // pode ser 'ENTER' ou ''
  const activeSquare = getActiveSquare();
  const isBackspace = event.target.id === 'backspace' || event.target.nodeName === 'IMG';

  // requires ENTER after 5 letters:
  if (+activeSquare.id % 5 === 0 && activeSquare.id > 0) { // when we complete a row
    // if last key pressed was not enter, then you can't type
    // only enter or backspace allowed
    if (lastKeyPressed !== 'enter' && event.target.id !== 'enter' && !isBackspace)
      return;
  } 

  if (isBackspace) {
    // something involving guesses.length -> gives you the current row
    if (activeSquare.id % 5 === 0) return;
    eraseLetter();
    lastKeyPressed = 'backspace';
    return;
  }

  if (event.target.id === 'enter') {
    enterWord();
    lastKeyPressed = 'enter';
    return;
  }

  lastKeyPressed = event.target.id;
  activeSquare.innerText = letter;
}

function getActiveSquare() {
  const allSquares = [...document.querySelectorAll('.game-square')];
  for (let i = 0; i < 30; i++) {
    if (allSquares[i].innerText == '') return allSquares[i];
  }
}

function eraseLetter() {
  const allSquares = [...document.querySelectorAll('.game-square')];
  for (let i = 0; i < 30; i++) {
    if (allSquares[i].innerText == '') {
      allSquares[i-1].innerText = '';
      return;
    }
  }
}

function enterWord() {
  const firstEmpty = getActiveSquare();
  if (+firstEmpty.id % 5 !== 0) {
    alert('not enough letters');
    return;
  }

  const guess = getGuess();
  if (!validWordList.includes(guess)) {
    console.log(guess);
    alert('not a valid word');
    return;
  }
}

function getGuess() {
  const firstEmpty = getActiveSquare();
  const firstEmptyId = firstEmpty.id;
  let guess = '';
  for (let i = firstEmptyId - 5; i < firstEmptyId; i++) {
    const square = document.getElementById(`${i}`);
    guess += square.innerText;
  }
  return guess;
}