const validWordList = palavras.map(palavra => palavra.toUpperCase());

const randomIdx = Math.floor(Math.random() * validWordList.length);
const answer = validWordList[randomIdx];
console.log(answer);

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
    alert('palavra inválida');
    return;
  }
  const row = firstEmpty.id/5 - 1;
  const guess = getGuess();

  if (guess === answer) {
    displayColors(guess, row);
    alert('ganhou!');
    return;
  }

  if (!validWordList.includes(guess)) {
    alert('palavra inválida');
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