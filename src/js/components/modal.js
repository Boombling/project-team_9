import modalTpl from '../../templates/modalTpl.hbs';
// import EventApi from '../services/event-api';

// const eventApi = new EventApi();
// console.log(eventApi);
const API_KEY = 'MMQ2M3AOTcNvFmVoIxNGUGotXqF5t9MP';
const BASE_URL = 'https://app.ticketmaster.com';

async function fetchEvent(id) {
     const event = await fetch(`${BASE_URL}/discovery/v2/events/${id}.json?apikey=${API_KEY}`)
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

function onOpenModal(event) {
  event.preventDefault();
  const a = event.target;
  const b = a.getAttribute("alt");
  fetchEvent(b)
    .then(renderE)
    .catch(onFetchError);
  
   
  
  if (event.target.nodeName === 'IMG') {
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