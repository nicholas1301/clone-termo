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
  console.log(event.target.innerText);
  if (event.target.classList.contains('backspace')) {
    eraseLetter();
    return;
  }

  if (event.target.classList.contains('enter')) {
    enterWord();
    return;
  }

  const activeSquare = getActiveSquare();
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

}
