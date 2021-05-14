import EventsApiService from './services/services';
import eventsListTpl from '../templates/card-list.hbs';
import getRefs from './refs/get-refs';
import './components/modal'

const refs = getRefs();

const eventsApiService = new EventsApiService();

refs.searchInput.addEventListener('submit', onSearch);

async function onSearch(e) {
   
   try {
     e.preventDefault();
      
     eventsApiService.query = e.currentTarget.elements.query.value;
      
     if (eventsApiService.query === '' || !eventsApiService.query.trim()) {
      //   тут треба вивести помилку пошуку
      return
     }
 
     await eventsApiService.resetPage();

     await clearEvents();
 
     const events = await eventsApiService.fetchEvent({})
     console.log(events);

     if(events.length === 0){
      //   тут треба вивести помилку пошуку
      return
    }

     await renderEventList(events)  

     } catch (err){
        console.log(err);
      //   тут треба вивести помилку запиту fetch
    }
}
 
 function renderEventList(events){
  refs.cardEvent.insertAdjacentHTML('beforeend', eventsListTpl(events));
    eventsApiService.incrementPage()
}

 function clearEvents() {
   refs.cardEvent.innerHTML = '';
 }





