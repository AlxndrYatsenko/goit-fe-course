const logins = ['Mango', 'robotGoogles', 'Poly', 'Aj4x1sBozz', 'qwerty123'];
const login = prompt('Введите пароль');
const parolIsIncorrect = 'Ошибка! Логин должен быть от 4 до 16 символов';
const parolAdd = 'Логин успешно добавлен!';
const passInUse = 'Такой логин уже используется!';


const checkLoginValidity = function(login) {
  
  if (login.length >= 4 && login.length <= 16) {
    return true;
  } else {
    return false;
  }
};

const checkIfLoginExists = function(logins, login) {
  let result = logins.includes(login)
  if (result === true){
    return true
  }else{return false}
};

const addLogin = function (logins, login){
  if (checkLoginValidity(login)){
    if(checkIfLoginExists(logins, login) === false){
      logins.push(login);
      return parolAdd;
    }else {
      return passInUse
    }
  }else {return parolIsIncorrect}
};

console.log(addLogin(logins, login))
