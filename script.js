const suits = ['♠', '♥', '♦', '♣'];
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
let deck = [];

function createDeck() {
  deck = [];
  for (let i = 0; i < 2; i++) {
    for (let suit of suits) {
      for (let rank of ranks) {
        deck.push(`${rank}${suit}`);
      }
    }
  }
  deck.push('Joker🃏');
  deck.push('Joker🃏');
}

function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

function dealCards() {
  createDeck();
  shuffleDeck();
  const columns = document.querySelectorAll('.tableau');
  columns.forEach(col => col.innerHTML = '');

  let cardIndex = 0;
  for (let i = 0; i < columns.length; i++) {
    const numCards = i < 4 ? 6 : 5;
    for (let j = 0; j < numCards; j++) {
      const card = document.createElement('div');
      card.className = 'card';
      card.textContent = deck[cardIndex++];
      columns[i].appendChild(card);
    }
  }
}
let moves = 0;
let sequencesCompleted = 0;

function updateScore() {
  document.getElementById('score').textContent = `Moves: ${moves} | Sequences: ${sequencesCompleted}`;
}
function checkWin() {
  let complete = 0;
  document.querySelectorAll('.tableau').forEach(col => {
    if (col.children.length === 13) {
      complete++;
    }
  });
  if (complete >= 8) {
    alert("🎉 You won! All sequences completed!");
  }
}
document.getElementById('deal-button').addEventListener('click', dealCards);
