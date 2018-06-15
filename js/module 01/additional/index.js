'use strict';

const GROUPE_SHARM = 'Sharm';
const GROUPE_HURGADA = 'Hurgada';
const GROUPE_TABA = 'Taba';

const NUMBER_SHARM = 15;
const NUMBER_HURGADA = 25;
const NUMBER_TABA = 6;
const NEED_PLAСES = 'Введите необходимое колличество необходимых мест!';
const SORRY = 'Извините, столько мест нет ни в одной группе!';
const VERY_SORRY = 'Нам очень жаль, приходите еще!';

let yes;

let userPlaces = prompt(NEED_PLAСES);
if (userPlaces % userPlaces !== 0 || userPlaces <= 0) {
  alert('Ошибка ввода!');
} else {
  if (userPlaces <= NUMBER_TABA) {
    yes = confirm(
      `В группе ${GROUPE_TABA} есть ${userPlaces} свободных мест, согласны ли Вы находится в группе ${GROUPE_TABA}?`,
    );
    yes === true
      ? alert(`Приятного путешествия в группе ${GROUPE_TABA}`)
      : alert(VERY_SORRY);
  } else if (userPlaces <= NUMBER_SHARM) {
    yes = confirm(
      `В группе ${GROUPE_SHARM} есть ${userPlaces} свободных мест, согласны ли Вы находится в группе ${GROUPE_SHARM}?`,
    );
    yes === true
      ? alert(`Приятного путешествия в группе ${GROUPE_TABA}`)
      : alert(VERY_SORRY);
  } else if (userPlaces <= NUMBER_HURGADA) {
    yes = confirm(
      `В группе ${GROUPE_HURGADA} есть ${userPlaces} свободных мест, согласны ли Вы находится в группе ${GROUPE_HURGADA}?`,
    );
    yes === true
      ? alert(`Приятного путешествия в группе ${GROUPE_TABA}`)
      : alert(VERY_SORRY);
  } else {
    alert(SORRY);
  }
}

// else if{

// }
