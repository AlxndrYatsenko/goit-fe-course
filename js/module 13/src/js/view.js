export default class View {
  constructor() {
    this.refs = {};
    this.refs.form = document.querySelector('.url-editor');
    this.refs.urlEditorText = this.refs.form.querySelector('.url-editor__text');
    this.refs.addBtn = this.refs.form.querySelector('.url-editor__button');
    this.refs.urlList = document.querySelector('.url-list');
    this.refs.rmBtn = this.refs.urlList.querySelector('.url-item__button');
  }

  init(cards) {
    const markup = cards.reduce((string, card) => {
      return string + this.createCardMarkup(card)}, '');

    this.refs.urlList.insertAdjacentHTML('afterbegin', markup);
  }

  deleteCard(event) {
    event.preventDefault();
    const target = (event.target)
    const parrent = target.closest('.url-item')
    parrent.remove()
  }

  addCard(obj) {
    const markup = this.createCardMarkup(obj)
    this.refs.urlList.insertAdjacentHTML('afterbegin', markup)
  }


  createCardMarkup({ img, url }) {
    return `
    <form class="url-item">
    <div class="wrapper">
      <img class="url-item__img" src="${img}">
      <p class="url-item__text">${url}</p>
    </div>
    <button class="button url-item__button">Удалить</button>
  </form>
    `;
  }

}
