import PagesBlock from './pages.js';
import shortMarkUp from '../../templates/pagination/shortPagination.hbs';
import startMarkUp from '../../templates/pagination/startPagination.hbs';
import endMarkUp from '../../templates/pagination/endPagination.hbs';
import standardMarkUp from '../../templates/pagination/standardPagination.hbs';

const ref = {
    pagination: document.querySelector('.pagination')
}
ref.pagination.addEventListener('click', onPageClick);

function clearPagination() {
    ref.pagination.innerHTML = '';
}

function setPaginationBlock(newPaginationMarkUp) {
    ref.pagination.insertAdjacentHTML('beforeend', newPaginationMarkUp);
}

function updatePagination() {
    clearPagination();
    setPaginationBlock(pagesInfo.markUp);

}

function setPageQuantity(eventsQuantity) {
    const screenSize = screen.availWidth;

    if (screenSize >= 768 && screenSize < 1280) {
        return (Math.ceil(eventsQuantity / 21));
    } else {
        return (Math.ceil(eventsQuantity / 20));
    }
    ``
}

const pagesInfo = new PagesBlock(setPageQuantity(170));
createPaginationBlock();

function createPaginationBlock() {
    if (pagesInfo.isShortList) {
        pagesInfo.updatePageList();
        pagesInfo.updateMarkUp(shortMarkUp, false);

    } else {
        pagesInfo.updatePageList(1, 5);
        pagesInfo.updateMarkUp(startMarkUp, true);
    }

    setPaginationBlock(pagesInfo.markUp);
    const startPage = document.querySelector('.page-button');
    pagesInfo.updateCurrentPage(startPage);

}


function onPageClick(event) {
    const isButtonClick = event.target.classList.contains("page-button");
    if (!isButtonClick) {
        return;
    }
    const targetPageNumber = Number(event.target.textContent);
    if (targetPageNumber === pagesInfo.currentNumber) {
        return;
    } else {
        pagesInfo.updateCurrentPage(event.target);
        if (pagesInfo.isShortList) {
            pagesInfo.updateCurrentNumber(targetPageNumber);
            return;
        } else {
            targetBigCheck(targetPageNumber);

        }
    }

}

function targetBigCheck(targetNumber) {
    if (targetNumber >= 5 && targetNumber < pagesInfo.lastNumber - 2) {
        pagesInfo.updatePageList(targetNumber - 1, targetNumber + 1);
        pagesInfo.updateMarkUp(standardMarkUp, true);
        updatePagination();
        findCurrentPage(targetNumber);

    } else if (targetNumber >= 5 && targetNumber >= pagesInfo.lastNumber - 2 && pagesInfo.currentNumber < pagesInfo.lastNumber - 2) {
        pagesInfo.updatePageList(pagesInfo.lastNumber - 5);
        pagesInfo.updateMarkUp(endMarkUp, false);
        updatePagination();
        findCurrentPage(targetNumber);
    } else if (targetNumber < 5 && pagesInfo.currentNumber >= 5) {
        pagesInfo.updatePageList(1, 5);
        pagesInfo.updateMarkUp(startMarkUp, true);
        updatePagination();
        findCurrentPage(targetNumber);
    }
}

function findCurrentPage(targetNumber) {
    const newPageList = document.querySelectorAll('.page-button');
    let newCurrentPage;
    newPageList.forEach(item => {
        if (item.textContent == targetNumber) {
            newCurrentPage = item;
        }
    })
    pagesInfo.updateCurrentPage(newCurrentPage);
    pagesInfo.updateCurrentNumber(targetNumber);
}