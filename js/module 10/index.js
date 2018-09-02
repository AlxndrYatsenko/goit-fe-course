'use strict';
/*
Написать приложение для работы с REST сервисом, 
все функции делают запрос и возвращают Promise 
с которым потом можно работать. 

Реализовать следующий функционал:
- функция getAllUsers() - должна вернуть текущий список всех пользователей в БД.

- функция getUserById(id) - должна вернуть пользователя с переданным id.

- функция addUser(name, age) - должна записывать в БД юзера с полями name и age.

- функция removeUser(id) - должна удалять из БД юзера по указанному id.

- функция updateUser(id, user) - должна обновлять данные пользователя по id. 
  user это объект с новыми полями name и age.
Документацию по бэкенду и пример использования прочитайте 
в документации https://github.com/trostinsky/users-api#users-api.
Сделать минимальный графический интерфейс в виде панели с полями и кнопками. 
А так же панелью для вывода результатов операций с бэкендом.
*/

'use strict';

const api = {
  baseUrl: 'https://test-users-api.herokuapp.com/users/',
  getAllUsers() {
    return fetch(this.baseUrl)
      .then(response => {
        if (response.ok) return response.json();

        throw new Error('Error while fetching ' + response.statusText);
      })
      .then(data => data.data)
      .catch(error => console.log(error));
  },
  addUser(user) {
    return fetch(this.baseUrl, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
      })
      .then(response => {
        if (response.ok) return response.json();

        throw new Error('Error while fetching ' + response.statusText);
      })
      .catch(error => console.log(error));
  },
  deleteUser(id) {
    return fetch(`${this.baseUrl}${id}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (!response.ok) throw new Error('Неполучилось удалить!!!');
      })
      .catch(error => console.log(error));
  },
  updateUser(user) {

    return fetch(`${this.baseUrl}${user.id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        'Content-type': 'application/json',
      },
    })
    .then(response => {
      if (response.ok) return response.json();
      
      throw new Error('Error while fetching ' + response.statusText);
    })
      .catch(error => console.log(error));
  },
};

document.addEventListener('DOMContentLoaded', () => {
  const refs = selectRefs();
  const state = {
    selectedId: null
  };

  refs.userEditor.addEventListener('submit', handleUserEditorSubmit);
  refs.userList.addEventListener('click', handleUserListClick);
  refs.modal.addEventListener('click', handleModalClick);

  init();

  /**
   * Helper functions
   */

  function init() {
    api.getAllUsers().then(users => {
      const markup = users.reduce(
        (acc, user) => acc + createUserMarkup(user),
        '',
      );

      refs.userList.insertAdjacentHTML('afterbegin', markup);
    });
  }

  function handleUserEditorSubmit(e) {
    e.preventDefault();

    const name = refs.userNameEditorInput.value.trim();
    const age = refs.userAgeEditorInput.value.trim();


    if (name === '') return alert('Введите имя!!!');
    if (age === '') return alert('Введите возраст!!!');

    api.addUser({
      name,
      age
    }).then(user => {

      const id = user.data._id
      
      const markup = createUserMarkup({ id, name, age });
      refs.userList.insertAdjacentHTML('beforeend', markup);
    });

    refs.userEditor.reset();
  }

  function handleUserListClick({
    target
  }) {
    if (target.tagName !== 'BUTTON') return;

    const action = target.dataset.action;

    switch (action) {
      case 'delete':
        removeUser(target);
        break;

      case 'edit':
        editUserStart(target);
        break;

      default:
        throw new Error('Unrecognized action type ' + action);
    }
  }

  function handleModalClick({
    target
  }) {
    if (target.nodeName !== 'BUTTON') return;

    const action = target.dataset.action;

    switch (action) {
      case 'close':
        editUserCancel();
        break;

      case 'save':
        editUserSuccess();
        break;

      default:
        throw new Error('Unrecognized action type ' + action);
    }
  }

  function removeUser(target) {
    const user = target.closest('.user');
    const userIdToDelete = user.dataset.id;

    api.deleteUser(userIdToDelete).then(() => {
      user.remove();
    });
  }

  function editUserStart(target) {
    const user = target.closest('.user');
    const userIdToEdit = user.dataset.id;
    state.selectedId = userIdToEdit;

    const userName = user.querySelector('.user-info__name').textContent;

    const userAge = user.querySelector('.user-info__age').textContent;

    refs.modalNameInput.value = userName;
    refs.modalAgeInput.value = userAge;

    toggleModal();
  }

  function editUserCancel() {
    state.selectedId = null;
    refs.modalNameInput.value = '';
    refs.modalAgeInput.value = '';
    toggleModal();
  }

  function editUserSuccess() {
    const userToUpdate = {
      id: state.selectedId,
      name: refs.modalNameInput.value,
      age: refs.modalAgeInput.value,
    };

    api.updateUser(userToUpdate).then(updatedUser => {

      const userNameEl = refs.userList.querySelector(
        `.user[data-id="${updatedUser.data.id}"] .user-info__name`,
      );
      const userAgeEl = refs.userList.querySelector(
        `.user[data-id="${updatedUser.data.id}"] .user-info__age`,
      );

      userNameEl.textContent = updatedUser.data.name;
      userAgeEl.textContent = updatedUser.data.age;

      toggleModal();
    });
  }

  function createUserMarkup({
    id,
    name,
    age
  }) {
    return `
    <li class="user" data-id="${id}">
      <div class="actions">
        <button class="button" data-action="edit">Редактировать</button>
        <button class="button" data-action="delete">Удалить</button>
      </div>
      <p class="user-info">
      <span class="user-info__text">NAME: </span>
      <span class="user-info__name">${name}</span><br>
      <span class="user-info__text">AGE: </span>
      <span class="user-info__age">${age}</span><br>
      </p>
      </li>
      `;
  }

  function toggleModal() {
    refs.modalBackdrop.classList.toggle('is-visible');
  }

  function selectRefs() {
    const refs = {};

    refs.userEditor = document.querySelector('.user-editor');
    refs.userNameEditorInput = refs.userEditor.querySelector('.user-name');
    refs.userAgeEditorInput = refs.userEditor.querySelector('.user-age');
    refs.userList = document.querySelector('.user-list');
    refs.modal = document.querySelector('.modal');
    refs.modalNameInput = refs.modal.querySelector('.user-name');
    refs.modalAgeInput = refs.modal.querySelector('.user-age');
    refs.modalBackdrop = document.querySelector('.backdrop');

    return refs;
  }
});
