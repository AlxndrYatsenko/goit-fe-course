import axios from 'axios';
import { BASE_URL} from './database'

export const axiosRequest = (url, arr) => {
// console.log('11111111')
  return axios
  .get(`${BASE_URL}&q=${url}`).then(response => response.data)
  .then(data => {
    const obj = { url: url, img: data.image }
    this.cards.unshift(obj)
    this._model.addToLocalStorage(arr)
    this._view.addCard(obj)
  })
  .catch(err => console.log(err));
}
