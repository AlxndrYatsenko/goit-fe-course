import axios from 'axios';
import { BASE_URL} from './services/database'

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
    this._model.addToLocalStorage()
    this._view.init(this.cards);
  }

  handleAddCard(evt) {
    evt.preventDefault();

    const urlText = this._view.refs.urlEditorText.value.trim();

    if (!this._model.isValid(urlText)) return
    if (this._model.isHasUrl(urlText, this.cards)) return

    axios
      .get(`${BASE_URL}&q=${urlText}`).then(response => response.data)
      .then(data => {
        const obj = { url: urlText, img: data.image }
        this.cards.unshift(obj)
        this._model.addToLocalStorage()
        this._view.addCard(obj)
      })
      .catch(err => console.log(err));
  }

  handleDeleteCard(evt) {
    if (evt.target.tagName === 'BUTTON') {
      this._view.deleteCard(evt)
      this._model.deleteCard(evt, this.cards)
    }
  }
}
