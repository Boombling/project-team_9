import shortMarkUp from '../../templates/pagination/shortPagination.hbs';
import startMarkUp from '../../templates/pagination/startPagination.hbs';
import endMarkUp from '../../templates/pagination/endPagination.hbs';
import standardMarkUp from '../../templates/pagination/standardPagination.hbs';


export default class BlockOfPages {
    constructor(lastPage) {
        this.pageBlock = document.querySelector('.pagination');
        this.changes = 0;
        this.pageList = [];
        this.markUp = '';
        this.currentPage = {};
        this.previousPage = {};
        this.currentNumber = 1;
        this.lastNumber = lastPage;

        this.isShortList = this.lastPageNumber <= 7;
    }


    updatePageList(start = 1, end = this.lastNumber) {
        this.pageList.length = 0;
        for (let i = start; i <= end; i += 1) {
            this.pageList.push(i);
        }
    }

    updateCurrentPage(newPage) {
        this.previousPage = this.currentPage;
        this.currentPage = newPage;
        this.currentPage.classList.add("current");
        if (this.changes) {
            this.previousPage.classList.remove('current');
        }
        this.changes += 1;

    }
    findCurrentPage(targetNumber, newPageList) {
        newPageList.forEach(item => {
            if (item.textContent == targetNumber) {
                this.updateCurrentPage(item);
            }
        })
        this.updateCurrentNumber(targetNumber);
    }
    updateCurrentNumber(newNumber) {
        this.currentNumber = newNumber;
    }

    updateMarkUp(markUpType, needLastPage = false) {
        if (needLastPage) {
            this.markUp = markUpType({ pageList: this.pageList, lastPage: this.lastNumber })
        } else {
            this.markUp = markUpType([...this.pageList]);
        }
    }


    createPaginationBlock() {
        if (this.isShortList) {
            this.updatePageList();
            this.updateMarkUp(shortMarkUp, false);

        } else {
            this.updatePageList(1, 5);
            this.updateMarkUp(startMarkUp, true);
        }

        this.setPaginationBlock();
        const startPage = document.querySelector('.page-button');
        this.updateCurrentPage(startPage);

    }
    clearPagination() {
        this.pageBlock.innerHTML = '';
    }

    setPaginationBlock() {
        this.pageBlock.insertAdjacentHTML('beforeend', this.markUp);
    }

    updatePagination() {
        this.clearPagination();
        this.setPaginationBlock();

    }





};