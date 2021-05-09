const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events.json'
const API_KEY = 'MMQ2M3AOTcNvFmVoIxNGUGotXqF5t9MP';
// console.log(BASE_URL);
export default class EventsApiService {
    constructor() {
        this.page = 1;
        this.size = 20;
        this.keyword = 'us';
    }

    fetchEvents() {
        console.log(this);
        const url = `${BASE_URL}?apikey=${API_KEY}&size=${this.size}&page=${this.page}&keyword=${this.keyword}&countryCode=us`;
        return fetch(url)
            .then(respons => respons.json())
            .then(({ events }) => {
                this.incrementPage();
                return events;
            })
            .catch(error => console.log(error))
    }

    incrementPage(){
        this.page += 1;
    }
    resetPage() {
        this.page = 1;
    }
    // get query(){
    //     return this.keyword;
    // }

    // set query(newQuery){
    //     this.keyword = newQuery;
    // }
}