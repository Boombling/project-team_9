// 1. !!Done!! Анимация появления модалки
// 2. !!Done!! Разметка и стили модалки конкретного события
// 3. !!Done!! Затемнение и размытие заднего фона при открытой модалке
// 4. Логика подгрузки и отображения данных о событии в открытой модалке
// 5. Размещение ссылок на событие в кнопках покупки билетов
// 6. Логика подгрузки и отображения событий после нажатия на кнопку "More from this author"
// 7. !!Done!! закрытия модалки при нажатии на крестик и за ее пределы
// 8. !!Done!! створити розмітку модалки відразу на всі пристрої
import modalTpl from '../../templates/modalTpl.hbs';
// import EventApi from '../services/event-api';

// const eventApi = new EventApi();
// console.log(eventApi);
const API_KEY = 'MMQ2M3AOTcNvFmVoIxNGUGotXqF5t9MP';
const BASE_URL = 'https://app.ticketmaster.com';
const id = 'G5vbZpIrDgevI';
async function fetchEvent() {
      const event = await fetch(`https://newsuperserver.herokuapp.com/${BASE_URL}/discovery/v2/events/${id}.json?apikey=${API_KEY}`)
     if (!event.ok) {
        throw event;
        }
    const response = await event.json();
    console.log(response);
    return response;
}

function renderE(events) {         
    const event = modalTpl(events);
    refs.renderModal.innerHTML = event;
}

function onFetchError(error) {
    console.log('This event not found')
}


const refs = {
    openModal: document.querySelector(".gallery"),
    closeModalBtn: document.querySelector("[data-close-modal]"),
    backdrop: document.querySelector("[data-backdrop]"),
    body: document.querySelector('body'),
    renderModal: document.querySelector(".js-modalTpl"),
};
// console.log(refs.openModal)

refs.openModal.addEventListener("click", onOpenModal);
refs.closeModalBtn.addEventListener("click", onCloseModal);
refs.backdrop.addEventListener("click", logBackdropClick);

// const modalMurkup = modalTpl(modalDraft);
// console.log(modalMurkup)

function onOpenModal(event) {
  event.preventDefault();  
 fetchEvent()
    .then(renderE)
    .catch(onFetchError);
  if(event.target.nodeName==='IMG'){
    refs.backdrop.classList.remove("backdrop--hiden");
    refs.body.classList.add('body-scroll-stop'); //стопорим скрол контента под модалкой
    window.addEventListener('keydown', onKeysPress); //- слушаем нажатие клавиш
  }
  return
}

function onCloseModal(event) {
  refs.backdrop.classList.add("backdrop--hiden");
  window.removeEventListener('keydown', onKeysPress);
  refs.body.classList.remove('body-scroll-stop')
}

function logBackdropClick(evt) {
  if(evt.target !== evt.currentTarget){
    return
  }
  onCloseModal(); 
}

function onKeysPress(evt) {
  console.log(evt.code)
  if(!refs.backdrop.classList.contains('backdrop--hiden')){
    if (evt.code === 'Escape') {
      onCloseModal(); 
    }; 
  }

}


// const KEY = 'MMQ2M3AOTcNvFmVoIxNGUGotXqF5t9MP'

// // https://app.ticketmaster.com/discovery/v2/events.json?apikey=CJGgy1qFXM68xhwsISckS3KXUJYNIlxV

// const promise = fetch(`https://app.ticketmaster.com/discovery/v2/events.json?size=20&page=1&apikey=6lOpp5Vggq59Gw99EgHfgH1fvYexhNFu
// `)
// .then(response => {
//   // console.log(response.json());
//   return response.json();
// })
// .then(events => {
//   console.log(events);
// })