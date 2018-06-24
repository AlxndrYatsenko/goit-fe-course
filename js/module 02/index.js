'use strict';

let userInput;
const numbers = [];
let total = 0;

do {
  let userInput = prompt('Введите число');
  if (userInput === null) {
    break;
  } else if (Number.isNaN(Number(userInput)) === true) {
    alert('Было введено не число, попробуйте еще раз');
    continue;
  }
  numbers.push(Number(userInput));
} while (true);

for (let i in numbers) {
  if (numbers.length !== 0) {
    total += numbers[i];
  }
}
console.log(numbers);
alert(`Общая сумма чисел равна ${total}`);
