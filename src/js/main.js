import './services/start-page';
import createsDownloadList from './services/nev-render-list';
import EventsApiService from './services/services';
import eventsListTpl from '../templates/card-list.hbs';
import getRefs from './refs/get-refs';
import './components/modal';
import getPage from './services/get-page.js';
import './services/choose-country';
import shortMarkUp from '../templates/pagination/shortPagination.hbs';
import startMarkUp from '../templates/pagination/startPagination.hbs';
import endMarkUp from '../templates/pagination/endPagination.hbs';
import standardMarkUp from '../templates/pagination/standardPagination.hbs';
import PageBlock from './components/pages.js';
//import './components/pagination';
const refs = getRefs();
const ref = {
    pagination: document.querySelector('.pagination')
}

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
        await eventsApiService.changePage(1);

        await clearEvents();

        const events = await eventsApiService.fetchEvent({})
        console.log(events);

        if (events.length === 0) {
            //   тут треба вивести помилку пошуку

            return
        }

        //  await renderEventList(events)
        const newFetchEventList = createsDownloadList(events);
        await renderEventList(newFetchEventList);
        refs.pagination.innerHTML = '';

        getPage(eventsApiService);

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
