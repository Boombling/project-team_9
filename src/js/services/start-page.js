import EventsApiService from './services.js';
const cardEvent = document.querySelector('.gallery');
const eventsApiService = new EventsApiService();
import eventsListTpl from '../../templates/card-list.hbs';
import createsDownloadList from '../services/new-render-list';
//import getPage from './get-page.js';

function onSearch() {
    try {
        fetchRefs();


    } catch (error) {}

}


onSearch()

function renderEventList(list) {
    const renderEventCard = eventsListTpl(list);
    cardEvent.innerHTML = renderEventCard;
}


async function fetchRefs() {
    if (window.screen.availWidth >= 768 && window.screen.availWidth < 1280) {
        eventsApiService.changeSize(21);
    } else {
        eventsApiService.changeSize(20);
    }

    const list = await eventsApiService.fetchEvent({});
    const newFetchEventList = createsDownloadList(list);
    renderEventList(newFetchEventList);
    //getPage(eventsApiService, '', true);
}