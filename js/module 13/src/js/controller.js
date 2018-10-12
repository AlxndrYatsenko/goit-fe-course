import * as axiosRequest from './services/api';

export default class Controller {
  constructor(model, view) {
    this._model = model;
    this._view = view;
    this.cards = this._model.localCards

    this._view.refs.addBtn.addEventListener('click',
      this.handleAddCard.bind(this));

    this._view.refs.urlList.addEventListener('click',
      this.handleDeleteCard.bind(this));

    this.init();
  }

  init() {
    this._model.addToLocalStorage(this.cards)
    this._view.init(this.cards);
  }

  handleAddCard(evt) {
    evt.preventDefault();

    const urlText = this._view.refs.urlEditorText.value.trim();

    if (!this._model.isValid(urlText)) return
    if (this._model.isHasUrl(urlText, this.cards)) return

    try {
      axiosRequest(urlText, this.cards)
    } catch (e) {
      if (e.name == 'URIError') {
        throw new ReadError("Ошибка в URI", e);
      } else if (e.name == 'SyntaxError') {
        throw new ReadError("Синтаксическая ошибка в данных", e);
      } else {
        throw e;
      }
  }
}

  handleDeleteCard(evt) {
    if (evt.target.tagName === 'BUTTON') {
      this._view.deleteCard(evt)
      this._model.deleteCard(evt, this.cards)
    }
  }
}
