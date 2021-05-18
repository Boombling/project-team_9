import createsDownloadList from './nev-render-list';

import eventsListTpl from '../../templates/card-list.hbs';
import getRefs from '../refs/get-refs';

import shortMarkUp from '../../templates/pagination/shortPagination.hbs';
import startMarkUp from '../../templates/pagination/startPagination.hbs';
import endMarkUp from '../../templates/pagination/endPagination.hbs';
import standardMarkUp from '../../templates/pagination/standardPagination.hbs';
import PageBlock from '../components/pages.js';
//import './components/pagination';
const refs = getRefs();




function targetCheck(targetNumber, pageControlBody) {
    if (pageControlBody.lastNumber < 8) {
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
async function nextEvents(eventsApiService, page) {

    try {

        await clearEvents();
        eventsApiService.changePage(page);


        const events = await eventsApiService.fetchNextEvent({})


        if (events.length === 0) {
            //   тут треба вивести помилку пошуку
            return
        }

        //  await renderEventList(events)
        const newFetchEventList = createsDownloadList(events);
        console.log(newFetchEventList)
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




    //console.log(result)
    return result;

}

function renderEventList(events) {
    eventsMarkup(events)

}

function eventsMarkup(events) {
    refs.cardEvent.insertAdjacentHTML('beforeend', eventsListTpl(events));
}

function clearEvents() {
    refs.cardEvent.innerHTML = '';
}

export default async function getPage(eventsApiService, query, notListened) {
    try {
        const pageInfo = await eventsApiService.fetchPages();
        const pageNum = resultChecking(pageInfo)


        const pageControlBody = new PageBlock(pageNum);
        pageControlBody.createPaginationBlock();
        eventsApiService.searchQuery = query;
        console.log(eventsApiService.searchQuery)

        if (notListened) {
            refs.pagination.addEventListener('click', onClick);
        }



        function onClick(event) {

            console.log(eventsApiService.searchQuery)
            const isButtonClick = event.target.classList.contains("page-button");
            if (!isButtonClick) {
                return;
            }
            const targetPageNumber = Number(event.target.textContent);
            if (targetPageNumber === pageControlBody.currentNumber) {
                return;
            }
            pageControlBody.updateCurrentPage(event.target);
            if (pageControlBody.lastNumber < 8) {
                pageControlBody.updateCurrentNumber(targetPageNumber);
            }
            if (pageControlBody.lastNumber > 7) {

                targetCheck(targetPageNumber, pageControlBody);
                pageControlBody.updatePagination();
                const newPageList = document.querySelectorAll('.page-button');
                pageControlBody.findCurrentPage(targetPageNumber, newPageList);

            }

            nextEvents(eventsApiService, pageControlBody.currentNumber);


        }

        function onSearchClick(event) {

            const isButtonClick = event.target.classList.contains("page-button");
            if (!isButtonClick) {
                return;
            }
            const targetPageNumber = Number(event.target.textContent);
            if (targetPageNumber === pageControlBody.currentNumber) {
                return;
            }
            pageControlBody.updateCurrentPage(event.target);
            if (pageControlBody.lastNumber < 8) {
                pageControlBody.updateCurrentNumber(targetPageNumber);
            }
            if (pageControlBody.lastNumber > 7) {

                targetCheck(targetPageNumber, pageControlBody);
                pageControlBody.updatePagination();
                const newPageList = document.querySelectorAll('.page-button');
                pageControlBody.findCurrentPage(targetPageNumber, newPageList);

            }

            nextEvents(eventsApiService, pageControlBody.currentNumber);


        }

    } catch (err) {
        console.log(err);
    }
}