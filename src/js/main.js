import EventsApiService from './services/services';
import eventsCard from '../templates/card-list.hbs';

const cardContainer = document.querySelector('.gallery');
const eventsApiService = new EventsApiService();
// console.log(concertApiService);


function onSerch(e) {
    try {
        const response = eventsApiService.fetchEvents();
        const render = renderEventsList(response);
        return render;
    }
    catch {
        onFetchError();
    }
}
function renderEventsList(embedded) {
   cardContainer.insertAdjacentHTML('beforeend', eventsCard(embedded));
}
function onFetchError(error) {
    console.log('ERROR')
}

onSerch()
