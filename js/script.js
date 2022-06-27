// TO DO:
// bug: submit palavras iguais
// condição de perdeu o jogo
// popup de instruções
// animações
// criar uma lista limitada para sorteio

const validWordList = palavras.map(palavra => palavra.toUpperCase());
const wordListComAcento = validWordList.filter(word => hasAcento(word));
const wordListComAcentoSemAcento = wordListComAcento.map(word => removeAcentos(word));

const listaSorteio = ['GATOS', 'VIDAS', 'LEÕES', 'MARCA', 'TRAPO', 'LINDO', 'VERDE', 'PRETO', 'FRUTA', 'ÚTERO', 'BARRA', 'COBRE', 'CORPO', 'FOCAR', 'HUMOR', 'MORRO', 'VOGAL'];
const randomIdx = Math.floor(Math.random() * listaSorteio.length);
const answer = listaSorteio[randomIdx];
const answerSemAcentos = removeAcentos(answer);
console.log(answer);

// add event listener for all keyboard keys
const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('click', keyPress));

const guesses = [];

function keyPress(event) {

  if (guesses.includes(answerSemAcentos) || guesses.length === 6) return;

  const letter = event.target.innerText;
  const activeSquare = getActiveSquare();
  const row = activeSquare == undefined? 5 : Math.floor(activeSquare.id / 5);
  const isBackspace = event.target.id === 'backspace' || event.target.nodeName === 'IMG';

  // lock keyboard when row is complete, only allow enter or backspace
  if (activeSquare == undefined || (activeSquare.id % 5 === 0 && activeSquare.id > 0) ) {
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
    if (allSquares[i].innerText == '') {
      return allSquares[i];
    }
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
  const firstEmpty = getActiveSquare(); // undefined for last row
  if (firstEmpty && firstEmpty.id % 5 !== 0) {
    alert('palavra inválida');
    return;
  }
  const row = firstEmpty == undefined? 5 : firstEmpty.id/5 - 1;
  const guess = getGuess();
  console.log(guess);
  if (guess === answerSemAcentos) {
    guesses.push(guess);
    displayColors(guess, row);
    setTimeout(() => alert('Ganhou!'), 100);
    return;
  }

  if (!validWordList.includes(guess) && !wordListComAcentoSemAcento.includes(guess)) {
    alert('palavra inválida');
    return;
  } else {
    guesses.push(guess);
    displayColors(guess, row);
    if (guesses.length === 6) {
      setTimeout(() => alert(`Resposta: ${answer}`), 100);
    }
  }
}

function getGuess() {
  const firstEmpty = getActiveSquare();
  const firstEmptyId = firstEmpty == undefined? 30 : firstEmpty.id;
  let guess = '';
  for (let i = firstEmptyId - 5; i < firstEmptyId; i++) {
    const square = document.getElementById(`${i}`);
    guess += square.innerText;
  }
  return guess;
}

function displayColors(guess, row) {
  const squares = getSquares(row);
  const guessComAcento = recoverAcentos(guess);

  if (hasAcento(guessComAcento)) {
    correctDisplayForAcentos(guessComAcento, row);
  }

  //iterar por todos, pintar os verdes
  let notGreen = [];
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === answerSemAcentos[i]) {
      squares[i].classList.add('green');
      document.getElementById(`${guess[i]}`).classList.add('green');
    } else {
      notGreen.push(answerSemAcentos[i]);
    }
  }

  //iterar por todos, pintar os amarelos e cinzas
  for (let i = 0; i < guess.length; i++) {
    if (!squares[i].classList.contains('green')) {
      if (notGreen.includes(guess[i]) ) {
        squares[i].classList.add('yellow');
        let idx = notGreen.indexOf(guess[i]);
        notGreen.splice(idx, 1);

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

function correctDisplayForAcentos(guessComAcento, row) {
  const squares = getSquares(row);
  for (let i = 0; i < 5; i++) {
    squares[i].innerText = guessComAcento[i];
  }
}

function getSquares(row) {
  const squares = []; //array with the 5 game-squares whose color we want to change
  for (let i = 0; i < 5; i++) { 
    const square = document.getElementById(`${i+row*5}`);
    squares.push(square);
  }
  return squares;
}

function hasAcento(word) {
  const acentos = 'ÁÃÂÉÊÍÎÓÔÕÚÇ';
  return word.split('').some(letter => acentos.includes(letter));
}

function removeAcentos(word) {
  const acentos = 'ÁÃÂÉÊÍÎÓÔÕÚÇ';
  const letters = 'AAAEEIIOOOUC';
  let desacentuada = '';
  for (let i = 0; i < word.length; i++) {
    if (acentos.includes(word[i])) {
      let idx = acentos.indexOf(word[i]);
      desacentuada += letters[idx];
    } else {
      desacentuada += word[i];
    }
  }
  return desacentuada;
}

function recoverAcentos(word) {
  if (wordListComAcentoSemAcento.includes(word)) {
    let idx = wordListComAcentoSemAcento.indexOf(word);
    return wordListComAcento[idx];
  } else {
    return word;
  }
}

const openInstructionsButton = document.getElementById('show-instructions');
openInstructionsButton.addEventListener('click', toggleInstructions);

const closeInstructionsButton = document.getElementById('close-instructions');
closeInstructionsButton.addEventListener('click', toggleInstructions);


function toggleInstructions() {
  console.log('toggling instructions')
  const instructions = document.querySelector('.instructions');
  instructions.classList.toggle('hidden');
}