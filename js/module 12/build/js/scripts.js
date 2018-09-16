"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var refs = selectRefs();
  var urlsArr = [{
    url: 'https://www.google.com.ua/',
    img: 'http://www.google.com.ua/images/branding/googlelogo/1x/googlelogo_white_background_color_272x92dp.png'
  }, {
    url: 'https://rozetka.com.ua/',
    img: 'https://i.rozetka.ua/favicons/apple-touch-icon-114x114.png'
  }, {
    url: 'https://www.windytv.com/',
    img: 'https://www.windy.com/img/socialshare3.jpg'
  }, {
    url: 'https://stackoverflow.com/',
    img: 'https://cdn.sstatic.net/Sites/stackoverflow/img/apple-touch-icon@2.png?v=73d79a89bded'
  }, {
    url: 'https://www.npmjs.com/',
    img: 'https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png'
  }];

  if (localStorage.length === 0) {
    addToLacalstorage(urlsArr);
  }

  var localArr = getFromLacalstorage();
  var template = Handlebars.compile(refs.source);
  var markup = createMarkup(localArr);
  refs.urlList.insertAdjacentHTML('afterbegin', markup);
  refs.addBtn.addEventListener('click', handleAddCard);
  refs.urlList.addEventListener('click', handleDeleteCard);

  function handleDeleteCard(evt) {
    evt.preventDefault();
    var target = evt.target;

    if (target.tagName === 'BUTTON') {
      var targetUrl = target.previousSibling.textContent;
      localStorage.removeItem(targetUrl);
      target.parentNode.remove();
    }
  }

  function handleAddCard(evt) {
    evt.preventDefault();
    var urlText = refs.urlEditorText.value.trim();
    var api = {
      baseUrl: "http://api.linkpreview.net/?key=5b9d4f1dbbabd453cad7c1485fc1be3731762b7f6c0b9&q=".concat(urlText),
      getInfo: function getInfo() {
        var _this = this;

        return fetch(this.baseUrl).then(function (response) {
          if (response.ok) return response.json();
          console.log(_this.baseUrl);
          throw new Error('Error while fetching ' + response.statusText);
        }).then().catch(function (error) {
          return console.log(error);
        });
      }
    };
    var pattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    var isValid = pattern.test(urlText);

    if (!isValid) {
      alert('Url-адрес не валидный');
      return;
    }

    var res = urlsArr.find(function (obj) {
      return obj.url === urlText;
    });

    if (res !== undefined) {
      alert('Такая закладка уже есть!!!');
      return;
    }

    api.getInfo().then(function (data) {
      var u = {
        url: urlText,
        img: data.image
      };
      urlsArr.push(u);
      var jsonObj = JSON.stringify(u);
      localStorage.setItem("".concat(urlText), jsonObj);
      markup = template(u);
      refs.urlList.insertAdjacentHTML('afterbegin', markup);
    });
    refs.form.reset();
  }

  function selectRefs() {
    var refs = {};
    refs.form = document.querySelector('.url-editor');
    refs.urlEditorText = refs.form.querySelector('.url-editor__text');
    refs.addBtn = refs.form.querySelector('.url-editor__button');
    refs.urlList = document.querySelector('.url-list');
    refs.rmBtn = refs.urlList.querySelector('.url-item__button');
    refs.source = document.querySelector('#card').innerHTML.trim();
    return refs;
  }

  function createMarkup(arr) {
    var markup = arr.reduce(function (acc, laptop) {
      return acc + template(laptop);
    }, '');
    return markup;
  }

  function addToLacalstorage(arr) {
    arr.forEach(function (el) {
      var jsonObj = JSON.stringify(el);
      localStorage.setItem("".concat(el.url), jsonObj);
    });
  }

  function getFromLacalstorage() {
    var localArr = [];

    for (var i = 0, len = localStorage.length; i < len; ++i) {
      var gеtKey = localStorage.key(i);
      var getObj = JSON.parse(localStorage.getItem(gеtKey));
      var u = {
        url: gеtKey,
        img: getObj.img
      };
      localArr.push(u);
    }

    return localArr;
  }
});