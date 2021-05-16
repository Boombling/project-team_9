import EventsApiService from './api-start-pages.js';
const cardEvent = document.querySelector('.gallery');
const eventsApiService = new EventsApiService();
import eventsListTpl from '../../templates/card-list.hbs';
import createsDownloadList from './nev-render-list.js';

function onSearch() {
    try {
        fetchRefs();
        getPage().then(result => {


            const pageControlBody = new PageBlock(result);
            pageControlBody.createPaginationBlock();
            console.log(pageControlBody);

            ref.pagination.addEventListener('click', (event) => {
                const isButtonClick = event.target.classList.contains("page-button");
                if (!isButtonClick) {
                    return;
                }
                const targetPageNumber = Number(event.target.textContent);
                if (targetPageNumber === pageControlBody.currentNumber) {
                    return;
                } else {
                    pageControlBody.updateCurrentPage(event.target);
                    if (pageControlBody.isShortList) {
                        pageControlBody.updateCurrentNumber(targetPageNumber);
                        return;
                    } else {
                        targetCheck(targetPageNumber, pageControlBody);
                        pageControlBody.updatePagination();
                        const newPageList = document.querySelectorAll('.page-button');
                        pageControlBody.findCurrentPage(targetPageNumber, newPageList);
                    }
                }
                nextEvents(pageControlBody.currentNumber);
            });



        })

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
}