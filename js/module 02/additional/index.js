'use strict';

const passwords = ['qwerty', '111qwe', '123123', 'r4nd0mp4zzw0rd'];
let attempts = 3;
let userPassword;

do {
  userPassword = prompt('Введите пароль!');

  if (userPassword === null) {
    break;
  } else if (passwords.includes(userPassword)) {
    alert('Добро пожаловать!');
    break;
  } else {
    attempts -= 1;
    alert(`Неверный пароль, у вас осталось ${attempts} попыток`);
    if (attempts === 0) {
      alert('У вас закончились попытки, аккаунт заблокирован!');
      break;
    }
  }
} while (true);
