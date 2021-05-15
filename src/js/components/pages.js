export default class BlockOfPages {
    constructor(lastPage) {
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


};