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

function keyPress(event) {
  const letter = event.target.innerText; // pode ser 'ENTER' ou ''
  const activeSquare = getActiveSquare();
  if (+activeSquare.id % 5 === 0) {
    // ultimo press foi enter?
    // entao ta livre pra escrever qualquer letra

    // se não, a única tecla que pode ser apertada é enter

  }

  if (event.target.id === 'backspace' || event.target.nodeName === 'IMG') {
    eraseLetter();
    return;
  }

  if (event.target.id === 'enter') {
    enterWord();
    return;
  }


  activeSquare.innerText = event.target.innerText;
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