export default function getRefs() {
    return {
        cardEvent: document.querySelector('.gallery'),
        searchInput: document.querySelector('.search-form'),
        button: document.querySelector('.counry_list'),
        pagination: document.querySelector('.pagination'),
        backdrop: document.querySelector("[data-backdrop]"),
        body: document.querySelector('body'),
        butnModal: document.querySelector('.modal'),
        logo: document.querySelector('.header_logo-div'),
        bubbling: document.querySelector('.bubblingG'),
    }
}