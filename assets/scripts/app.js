const searchInput = document.getElementById('search-input');
const rootElement = document.getElementById('cards');
const notFound = document.getElementById('not-found');

const createCard = (term, def = null) => {
  let card = document.createElement('div');
  let cardTerm = document.createElement('div');
  let cardDef = document.createElement('div');

  card.className = 'card';
  cardTerm.className = 'card__term';
  cardDef.className = 'card__def';

  cardTerm.innerText = term;
  cardDef.innerHTML = def;

  card.appendChild(cardTerm);
  card.appendChild(cardDef);
  rootElement.appendChild(card);
};

const searchHandler = e => {
  let inputValue = searchInput.value;
  notFound.style.display = 'none';
  rootElement.innerHTML = '';
  if (e.key === 'Enter') {
    fetch(`https://api.urbandictionary.com/v0/define?term=${inputValue}`)
      .then(res => res.json())
      .then(data => {
        console.log(`${data.list[1].word} ${data.list[0].definition}`);
        createCard(data.list[0].word, data.list[0].definition);
      })
      .catch(() => (notFound.style.display = 'block'));
  }
};

searchInput.addEventListener('keyup', searchHandler);
