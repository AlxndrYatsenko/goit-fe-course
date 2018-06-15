'use strict';

const ADMIN_LOGIN = 'admin';
const ADMIN_PASSWORD = 'm4ngo1zh4ackz0r';
const MASSEGE_LOGIN = 'Введите логин!';
const MASSEGE_CANCEL = 'Отменено пользователем!';
const MASSEGE_NO_ACCESS = 'Доступ запрещен!';
const MASSEGE_PASSWORD = 'Введите пароль!';
const MASSEGE_WELCOME = 'Добро пожаловать!';

let log = prompt(MASSEGE_LOGIN);

if (log === null) {
  alert(MASSEGE_CANCEL);
} else if (log !== ADMIN_LOGIN) {
  alert(MASSEGE_NO_ACCESS);
} else {
  let pass = prompt(MASSEGE_PASSWORD);
  if (pass === null) {
    alert(MASSEGE_CANCEL);
  } else if (pass !== ADMIN_PASSWORD) {
    alert(MASSEGE_NO_ACCESS);
  } else {
    alert(MASSEGE_WELCOME);
  }
}
