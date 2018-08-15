'use strict';

/*
  Создайте компонент галлереи изображений следующего вида.
  
    <div class="image-gallery js-image-gallery">
      <div class="fullview">
        <!-- Если выбран первый элемент из preview -->
        <img src="img/fullview-1.jpeg" alt="alt text 1">
      </div>
      <!-- li будет столько, сколько объектов в массиве картинок. Эти 3 для примера -->
      <ul class="preview">
        <li><img src="img/preview-1.jpeg" data-fullview="img/fullview-1.jpeg" alt="alt text 1"></li>
        <li><img src="img/preview-2.jpeg" data-fullview="img/fullview-2.jpeg" alt="alt text 2"></li>
        <li><img src="img/preview-3.jpeg" data-fullview="img/fullview-3.jpeg" alt="alt text 3"></li>
      </ul>
    </div>   
    
    🔔 Превью компонента: https://monosnap.com/file/5rVeRM8RYD6Wq2Nangp7E4TkroXZx2
      
      
    Реализуйте функционал:
      
      - image-gallery есть изначально в HTML-разметке как контейнер для компонента.
    
      - fullview содержит в себе увеличенную версию выбранного изображения из preview, и
        создается динамически при загрузке страницы.
    
      - preview это список маленьких изображений, обратите внимание на атрибут data-fullview,
        он содержит ссылку на большое изображение. preview и его элементы, также создаются 
        динамически, при загрузке страницы.
        
      - При клике в элемент preview, необходимо подменить src тега img внутри fullview
        на url из data-атрибута выбраного элемента.
        
      - По умолчанию, при загрузке страницы, активным должен быть первый элемент preview.
        
      - Изображений может быть произвольное количество.
      
      - Используйте делегирование для элементов preview.
      
      - При клике, выбраный элемент из preview должен получать произвольный эффект выделения.
      
      - CSS-оформление и имена классов на свой вкус.
      
      
    🔔 Изображения маленькие и большие можно взять с сервиса https://www.pexels.com/, выбрав при скачивании
      размер. Пусть маленькие изображения для preview будут 320px по ширине, большие для fullview 1280px.
      Подберите изображения одинаковых пропорций.
*/

/*
  Массив объектов с данными для создания компонента выглядит следующим образом.
  Замените пути на соотвествующие вашим, или назовите изображения аналогично.
*/

const galleryItems = [
  { preview: 'https://fastpic.co/images/preview-177ff492484cedec3.jpg', fullview: 'https://fastpic.co/images/fullview-1164e81ee96e1fe93.jpg', alt: 'alt text 1' },
  { preview: 'https://fastpic.co/images/preview-291675eb3e57e18a5.jpg', fullview: 'https://fastpic.co/images/fullview-274b64fa07a02839d.jpg', alt: 'alt text 2' },
  { preview: 'https://fastpic.co/images/preview-32adbfc3d9581e297.jpg', fullview: 'https://fastpic.co/images/fullview-3859036371fb752b3.jpg', alt: 'alt text 3' },
  { preview: 'https://fastpic.co/images/preview-46d0073719e526869.jpg', fullview: 'https://fastpic.co/images/fullview-46931ce18ff52858a.jpg', alt: 'alt text 4' },
  { preview: 'https://fastpic.co/images/preview-5826c57ca2d65a1ec.jpg', fullview: 'https://fastpic.co/images/fullview-58f7f2eb79ecde98a.jpg', alt: 'alt text 5' },
  { preview: 'https://fastpic.co/images/preview-6dcb03740472b21e8.jpg', fullview: 'https://fastpic.co/images/fullview-6a3a07916c0b6fadd.jpg', alt: 'alt text 6' },
];


const parentNode = document.querySelector('.js-image-gallery')

const fullview = document.createElement('div')
fullview.classList.add('fullview')
parentNode.appendChild(fullview)


const previewList = document.createElement('ul')
previewList.classList.add('preview-list')
parentNode.appendChild(previewList)

function createPreviewItem({ preview, fullview, alt }) {

  const item = document.createElement('li')
  item.classList.add('preview-list__item')
  
  const img = document.createElement('img')
  img.setAttribute('src', preview)
  img.setAttribute('data-fullview', fullview)
  img.setAttribute('alt', alt)

  item.appendChild(img)

  previewList.appendChild(item)

  return item
}

function createPreviewItems(arr) {
  const listItems = arr.map(elem => createPreviewItem(elem))
  return listItems
}

const previewItems = createPreviewItems(galleryItems)

previewList.addEventListener('click', handleCreateFullviewItem)

function createFirstFullviewItem(obj = galleryItems[0]) {
  const img = `<img src=${obj.fullview} alt=${obj.alt}>`
  
  fullview.insertAdjacentHTML('afterbegin', img);

}

const firstFullviewItem = createFirstFullviewItem()

function handleCreateFullviewItem(evt) {
  fullview.firstChild.remove()

  const target = evt.target
  const src = target.dataset.fullview
  const alt = target.getAttribute('alt')

  const img = `<img src=${src} alt=${alt}>`

  fullview.insertAdjacentHTML('afterbegin', img);
  window.removeEventListener('click', handleCreateFullviewItem);
}


// class Gallery{
//   constructor({items, parentNode, defaultActiveItem}){
//     this.items = items;
//     this.parentNode = parentNode;
//     this.defaultActiveItem = defaultActiveItem;
//   }



  // createPreviewItem(obj) {

  //   const previewList = document.createElement('ul')
  //   previewList.classList.add('preview-list')

  //   parentNode.appendChild(fullview)
  //   parentNode.appendChild(previewList)

  //   const item = document.createElement('li')
  //   item.classList.add('preview-list__item')
    
  //   const img = document.createElement('img')
  //   img.setAttribute('src', obj.preview)
  //   img.setAttribute('data-fullview', obj.fullview)
  //   img.setAttribute('alt', obj.alt)
  
  //   item.appendChild(img)
  //   previewList.appendChild(item)
  
  //   return item
  // }

  // createPreviewItems(arr) {
  //   const listItems = arr.map(elem => createPreviewItem(elem))
  //   return listItems
  // }
  
  // createFirstFullviewItem(obj = galleryItems[0]) {
  //   const fullview = document.createElement('div')
  //   fullview.classList.add('fullview')

  //   const img = `<img src=${obj.fullview} alt=${obj.alt}>`
    
  //   fullview.insertAdjacentHTML('afterbegin', img);
  
  // }

  // handleCreateFullviewItem(evt) {
  //   fullview.firstChild.remove()
  
  //   const target = evt.target
  //   const src = target.dataset.fullview
  //   const alt = target.getAttribute('alt')
  
  //   const img = `<img src=${src} alt=${alt}>`
  
  //   fullview.insertAdjacentHTML('afterbegin', img);
  //   window.removeEventListener('click', handleCreateFullviewItem);
  // }

// }






const Gallery = new Gallery({
  items: galleryItems,
  parentNode: document.querySelector('.image-gallery'),
  defaultActiveItem: 1
});

console.log(Gallery)