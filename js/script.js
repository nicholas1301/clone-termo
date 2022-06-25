const validWordList = palavras.filter(palavra => palavra.length === 5)
                           .filter(palavra => !palavra.includes('.'))
                           .filter(palavra => !palavra.includes('-'))
                           .map(palavra => palavra.toUpperCase())
console.log(validWordList)

// create dictionary
// const validWordList = ['RATOS', 'PERDA', 'LEOES', 'CASAS', 'FRODO'];

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

  //iterar por todos, pintar os verdes
  let notGreen = '';
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === answer[i]) {
      squares[i].classList.add('green');
      document.getElementById(`${guess[i]}`).classList.add('green');
    } else {
      notGreen += answer[i];
    }
  }
  //iterar por todos, pintar os amarelos
  for (let i = 0; i < guess.length; i++) {
    if (!squares[i].classList.contains('green')) {
      if (notGreen.includes(guess[i]) ) {
        squares[i].classList.add('yellow');
        const key = document.getElementById(`${guess[i]}`);
        if (!key.classList.contains('green')) {
          document.getElementById(`${guess[i]}`).classList.add('yellow');
        }
        

      } else {
        squares[i].classList.add('grey');
        document.getElementById(`${guess[i]}`).classList.add('grey');
      }
    }   
  }

}