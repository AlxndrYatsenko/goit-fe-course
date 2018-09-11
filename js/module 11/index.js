'use strict';

const laptops = [
  {
    size: 13,
    color: 'white',
    price: 28000,
    release_date: 2015,
    name: 'Macbook Air White 13"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 13,
    color: 'gray',
    price: 32000,
    release_date: 2016,
    name: 'Macbook Air Gray 13"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 13,
    color: 'black',
    price: 35000,
    release_date: 2017,
    name: 'Macbook Air Black 13"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 15,
    color: 'white',
    price: 45000,
    release_date: 2015,
    name: 'Macbook Air White 15"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 15,
    color: 'gray',
    price: 55000,
    release_date: 2016,
    name: 'Macbook Pro Gray 15"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 15,
    color: 'black',
    price: 45000,
    release_date: 2017,
    name: 'Macbook Pro Black 15"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 17,
    color: 'white',
    price: 65000,
    release_date: 2015,
    name: 'Macbook Air White 17"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 17,
    color: 'gray',
    price: 75000,
    release_date: 2016,
    name: 'Macbook Pro Gray 17"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 17,
    color: 'black',
    price: 80000,
    release_date: 2017,
    name: 'Macbook Pro Black 17"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
];

//=========================================================

const refs = selectRefs();

const filterButton = refs.form.querySelector('button[type="submit"]');
const clearButton = refs.form.querySelector('button[type="reset"]');

refs.filterButton.addEventListener('click', handleGetChecked);
refs.clearButton.addEventListener('click', handlereResetBtn);

const template = Handlebars.compile(refs.source);

let filteredLaptops = laptops;
let markup = createMarkup(filteredLaptops);
refs.laptop.insertAdjacentHTML('afterbegin', markup);

function handlereResetBtn(evt) {
  evt.preventDefault();
  refs.form.reset();

  filteredLaptops = laptops;
  markup = createMarkup(filteredLaptops);
  refs.laptop.innerHTML = markup;
}

function handleGetChecked(evt) {
  evt.preventDefault();

  const filter = {
    size: [],
    color: [],
    release_date: [],
  };

  const checkedArr = refs.form.querySelectorAll(
    "input[type='checkbox']:checked",
  );
  if (checkedArr.length === 0) return;

  checkedArr.forEach(checkbox => {
    if (checkbox.name === 'size') {
      filter.size.push(checkbox.value);
    }
    if (checkbox.name === 'color') {
      filter.color.push(checkbox.value);
    }
    if (checkbox.name === 'release_date') {
      filter.release_date.push(checkbox.value);
    }
  });

  filteredLaptops = getValue(laptops, filter);
  markup = createMarkup(filteredLaptops);
  refs.laptop.innerHTML = markup;
}

function getValue(arrObj, obj) {
  const size = obj.size;
  const color = obj.color;
  const release = obj.release_date;

  const filteredObjects = arrObj.filter(object => {
    const filterBySize =
      size.length !== 0 ? size.includes(object.size.toString()) : true;
    const filteredByColor =
      color.length !== 0 ? color.includes(object.color.toString()) : true;
    const filteredByRelease =
      release.length !== 0
        ? release.includes(object.release_date.toString()) : true;
    return filterBySize && filteredByColor && filteredByRelease;
  });
  return filteredObjects;
}

function createMarkup(arr) {
  const markup = arr.reduce((acc, laptop) => acc + template(laptop), '');
  return markup;
}

function selectRefs() {
  const refs = {};
  refs.laptop = document.querySelector('.filtered-laptops');
  refs.source = document.querySelector('#card').innerHTML.trim();
  refs.form = document.querySelector('.js-form');
  refs.filterButton = refs.form.querySelector('button[type="submit"]');
  refs.clearButton = refs.form.querySelector('button[type="reset"]');
  return refs;
}
