import EventsApiService from './apiStartPages.js';
const cardEvent = document.querySelector('.gallery');
const eventsApiService = new EventsApiService();
import eventsListTpl from '../../templates/card-list.hbs';
import createsDownloadList from './new-render-list.js';
import getPage from './get-page.js';

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
    const { _embedded } = await eventsApiService.fetchEvent();
    const list = _embedded.events;
    const newFetchEventList = createsDownloadList(list);
    renderEventList(newFetchEventList);
    getPage(eventsApiService);
}