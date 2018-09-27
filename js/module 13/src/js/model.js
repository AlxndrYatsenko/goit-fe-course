import { cards} from './services/database';

export default class Model {
  constructor() {
    this.localCards = JSON.parse(localStorage.getItem('cards'));
    if (this.localCards === null || this.localCards.length === 0) {
      this.localCards = cards
    }
  }

  getAllCards() {
    return this.localCards
  }

  isValid(url) {
    const pattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    const isValid = pattern.test(url);

    if (!isValid) {
      alert('Url-адрес не валидный')
    }
    return isValid;
  }

  isHasUrl(url, arr) {
    let isHas = arr.find(obj => obj.url === url);

    if (isHas !== undefined) {
      alert('Такая закладка уже есть!!!');
      isHas = true;
    }
    return isHas;
  }

  deleteCard(event) {
    event.preventDefault();
    const parrent = event.target.closest('.url-item')
    const textUrl = parrent.querySelector('.url-item__text').textContent
    const filtredCards = this.localCards.filter(obj => obj.url !== textUrl)
    this.localCards = filtredCards
    this.addToLocalStorage(this.localCards)
  }

  addToLocalStorage() {
    const jsonObj = JSON.stringify(this.localCards);
    localStorage.setItem(`cards`, jsonObj);
  }
}
