import ConcertApiService from './services/services';
import concertCard from '../templates/card-list.hbs';

const cardContainer = document.querySelector('.gallery');
const concertApiService = new ConcertApiService();
// console.log(concertApiService);

// fetch('https://app.ticketmaster.com/discovery/v2/events.json?apikey=MMQ2M3AOTcNvFmVoIxNGUGotXqF5t9MP&size=20')
//     .then(response => response.json())
//     .then(console.log);

function onSerch(e) {
    try {
        const response = concertApiService.fetchConcert();
        const render = renderConsertList(response);
        return render;
    }
    catch {
        onFetchError();
    }
}
function renderConsertList(events) {
   cardContainer.insertAdjacentHTML('beforeend', concertCard(events));
}
function onFetchError(error) {
    console.log('This country not found')
}
onSerch()