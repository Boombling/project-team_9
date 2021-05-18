import './services/start-page';
import createsDownloadList from './services/nev-render-list';
import EventsApiService from './services/services';
import eventsListTpl from '../templates/card-list.hbs';
import getRefs from './refs/get-refs';
import './components/modal';
import getPage from './services/get-page.js';
import './services/choose-country';
import { showAlert, showError } from './components/pnotify';

const refs = getRefs();

const eventsApiService = new EventsApiService();

refs.searchInput.addEventListener('submit', onSearch);

async function onSearch(e) {

    try {
        e.preventDefault();

        eventsApiService.query = e.currentTarget.elements.query.value;

        if (eventsApiService.query === '' || !eventsApiService.query.trim()) {
            //   тут треба вивести помилку пошуку
            return fetchError(error);
        }
        // await eventsApiService.resetPage();
        await eventsApiService.changePage(1);

        await clearEvents();

        const events = await eventsApiService.fetchEvent({})
        console.log(events);

        if (events.length === 0) {
            //   тут треба вивести помилку пошуку

            return fetchError(error)
        }

        //  await renderEventList(events)
        const newFetchEventList = createsDownloadList(events);
        await renderEventList(newFetchEventList);
        refs.pagination.innerHTML = '';

        getPage(eventsApiService, eventsApiService.query, false)

    } catch (err) {
        // console.log(err);
        //   тут треба вивести помилку запиту fetch
    }

}


// додав, щоб перевырити роботу пошуку, хто відповідає за цей функціонал замінете...
function renderEventList(events) {
    eventsMarkup(events)

}

function eventsMarkup(events) {
    refs.cardEvent.insertAdjacentHTML('beforeend', eventsListTpl(events));
}

function clearEvents() {
    refs.cardEvent.innerHTML = '';
}

function fetchError(error) {
    showError('no results were found for this request')
}

// if  (.................) {
//            return showAlert('displaying the result of your request');
//             }