import EventsApiService from './services/services';
const cardEvent = document.querySelector('.gallery');
const eventsApiService = new EventsApiService();
import eventsListTpl from '../templates/card-list.hbs'

function onSearch() {
 try {
    fetchRefs();
     
 } catch (error) {
    myError();
 } 
   
  }


onSearch()

function renderEventList(list){
    const renderEventCard = eventsListTpl(list);
    cardEvent.innerHTML = renderEventCard;
     if(!list.length){
        myError();
}
}

async function fetchRefs() {
    const {_embedded} = await eventsApiService.fetchEvent();
    renderEventList(_embedded.events);
};


