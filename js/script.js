const dicionario = palavras.filter(palavra => palavra.length === 5)
                           .filter(palavra => !palavra.includes('.'))
                           .filter(palavra => !palavra.includes('-'))

// shuffle the dictionary for a 5 letter word to be the answer

const answer = 'RATOS';


const keys = document.querySelectorAll('.key');
keys.forEach(key => 
  key.addEventListener('click', event => {
    console.log(event.target.innerText);
    const activeSquare = getActiveSquare();
    activeSquare.innerText = event.target.innerText;
  })
);

function getActiveSquare() {
  const allSquares = [...document.querySelectorAll('.game-square')];
  for (let i = 0; i < 30; i++) {
    if (allSquares[i].innerText == '') return allSquares[i];
  }
}
