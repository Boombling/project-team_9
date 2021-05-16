import './services/start-page';
import createsDownloadList from './services/nev-render-list';
import EventsApiService from './services/services';
import eventsListTpl from '../templates/card-list.hbs';
import getRefs from './refs/get-refs';
import './components/modal';
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
import eventsListTpl from '../templates/card-list.hbs'
import './chose-country'

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

        getPage().then(result => {
            const pageNum = resultChecking(result)
            const shortList = pageNum <= 7 ? true : false;
            refs.pagination.innerHTML = '';
            const pageControlBody = new PageBlock(pageNum, shortList);
            pageControlBody.createPaginationBlock();



        });

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

    // function clearEvents() {
    //     refs.cardEvent.innerHTML = '';
    // }
    // getPage().then(result => {
    //     const pageNum = resultChecking(result)
    //     const shortList = pageNum <= 7 ? true : false;

    //     const pageControlBody = new PageBlock(pageNum, shortList);
    //     pageControlBody.createPaginationBlock();
    //     console.log(pageControlBody);

    //     refs.pagination.addEventListener('click', onClick.bind(null, pageControlBody), false)
    // })

    // function onClick(pageControlBody, event) {

    //     const isButtonClick = event.target.classList.contains("page-button");
    //     if (!isButtonClick) {
    //         return;
    //     }
    //     const targetPageNumber = Number(event.target.textContent);
    //     if (targetPageNumber === pageControlBody.currentNumber) {
    //         return;
    //     } else {
    //         pageControlBody.updateCurrentPage(event.target);
    //         if (pageControlBody.isShortList) {
    //             pageControlBody.updateCurrentNumber(targetPageNumber);
    //         } else {
    //             targetCheck(targetPageNumber, pageControlBody);
    //             pageControlBody.updatePagination();
    //             const newPageList = document.querySelectorAll('.page-button');
    //             pageControlBody.findCurrentPage(targetPageNumber, newPageList);
    //         }
    //     }
    //     nextEvents(pageControlBody.currentNumber);
    //     console.log(pageControlBody.lastNumber, eventsApiService.query);
    // }


    function targetCheck(targetNumber, pageControlBody) {
        if (pageControlBody.isShortList) {
            return;
        }
        if (targetNumber >= 5 && targetNumber < pageControlBody.lastNumber - 2) {
            pageControlBody.updatePageList(targetNumber - 1, targetNumber + 1);
            pageControlBody.updateMarkUp(standardMarkUp, true);

        } else if (targetNumber >= 5 && targetNumber >= pageControlBody.lastNumber - 2 && pageControlBody.currentNumber < pageControlBody.lastNumber - 2) {
            pageControlBody.updatePageList(pageControlBody.lastNumber - 5);
            pageControlBody.updateMarkUp(endMarkUp, false);

        } else if (targetNumber < 5 && pageControlBody.currentNumber >= 5) {
            pageControlBody.updatePageList(1, 5);
            pageControlBody.updateMarkUp(startMarkUp, true);
        }
    }
    async function nextEvents(page) {

        try {

            await clearEvents();
            eventsApiService.changePage(page);
            console.log(eventsApiService.page);

            const events = await eventsApiService.fetchNextEvent({})
            console.log(events);

            if (events.length === 0) {
                //   тут треба вивести помилку пошуку
                return
            }

            //  await renderEventList(events)
            const newFetchEventList = createsDownloadList(events);
            await renderEventList(newFetchEventList);

        } catch (err) {
            // console.log(err);
            //   тут треба вивести помилку запиту fetch

        }

    }

    function resultChecking(result) {
        if (result > 1000) {
            result = 49;
        } else {
            if (window.screen.availWidth >= 768 && window.screen.availWidth < 1280) {
                result = Math.floor(result / 21);
            } else {
                result = Math.floor(result / 20);
            }

        }
    }
    function clearEvents() {
        refs.cardEvent.innerHTML = '';
    }
    async function getPage() {
        try {
            const pageInfo = await eventsApiService.fetchPages();
            return pageInfo;

        } catch (err) {
            console.log(err);
        }
    }
    getPage().then(result => {
        if (result > 49) {
            result = 49;
        }

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