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

const guesses = [];

function keyPress(event) {
  const letter = event.target.innerText;
  const activeSquare = getActiveSquare();
  const row = Math.floor(activeSquare.id / 5);
  const isBackspace = event.target.id === 'backspace' || event.target.nodeName === 'IMG';

  // 
  if (activeSquare.id % 5 === 0 && activeSquare.id > 0) {
    if (guesses.length < row && event.target.id !== 'enter' && !isBackspace)
      return;
  } 

  if (isBackspace) {  
    if (activeSquare.id % 5 === 0 && guesses.length == row) return; //can't erase previous row
    eraseLetter();
    return;
  }

  if (event.target.id === 'enter') {
    enterWord();
    return;
  }

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
  if (firstEmpty.id % 5 !== 0) {
    alert('not enough letters');
    return;
  }
  const row = firstEmpty.id/5 - 1;
  const guess = getGuess();

  if (guess === answer) {
    displayColors(guess, row);
    alert('correct, you win!');
    return;
  }

  if (!validWordList.includes(guess)) {
    alert('not a valid word');
    return;
  } else {
    guesses.push(guess);
    displayColors(guess, row);
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

function displayColors(guess, row) {
  const firstSquareId = row*5;
  const squares = []; //array with the 5 game-squares whose color we want to change
  for (let i = 0; i < 5; i++) { 
    const square = document.getElementById(`${i+firstSquareId}`);
    squares.push(square);
  }

  let seen = '';
  for (let i = 0; i < guess.length; i++) {
    seen += guess[i];

    if (answer[i] === guess[i]) {
      squares[i].classList.add('green');
      continue;
    }

    if (answer.includes(guess[i]) && !seen.slice(0,-1).includes(guess[i])) {
      squares[i].classList.add('yellow');
      continue;
    }

    squares[i].classList.add('grey');
  }
}