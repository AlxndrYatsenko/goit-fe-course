import template from '../html/template.hbs'

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
    const markup = cards.reduce((acc, card) => {
      return acc + this.createCardMarkup(card)}, '');

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
    return template({ img, url })
  }
}
