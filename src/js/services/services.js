const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events.json'
const API_KEY = 'MMQ2M3AOTcNvFmVoIxNGUGotXqF5t9MP';
// console.log(BASE_URL);
export default class ConcertApiService {
    constructor() {
        // this.page = 1;
        // this.size = 20;
        // this.keyword = '';
    }

    fetchConcert() {
        // const url = `${BASE_URL}?apikey=${API_KEY}&page=${this.page}&size=${thsi.size}&keyword=${this.keyword}`
        // const url = `https://app.ticketmaster.com/discovery/v2/events.json?attractionId=K8vZ917Gku7&countryCode=CA&apikey=MMQ2M3AOTcNvFmVoIxNGUGotXqF5t9MP`;
        const url = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=MMQ2M3AOTcNvFmVoIxNGUGotXqF5t9MP&size=20';
        return fetch(url)
            .then(respons => respons.json())
            .catch(error => console.log(error))
    }    
}


//  async fetchConcert() {
//         // const url = `${BASE_URL}?apikey=${API_KEY}&page=${this.page}&size=${thsi.size}&keyword=${this.keyword}`
//         // const url = `https://app.ticketmaster.com/discovery/v2/events.json?attractionId=K8vZ917Gku7&countryCode=CA&apikey=MMQ2M3AOTcNvFmVoIxNGUGotXqF5t9MP`;
//            const url = await fetch('https://app.ticketmaster.com/discovery/v2/events.json?apikey=MMQ2M3AOTcNvFmVoIxNGUGotXqF5t9MP&size=20')
//         if (!url.ok) {
//             throw url;
//         }
//         const result = await url.json();
//         return result;
//     }   
// export default class NewsfetchImg {
//   constructor() {
//     const nameSearchImg = '';
//     this.page = 1;
//   }
//   async fetchImg() {
//     const rawResult = await fetch(
//       ${BASE_URL}/api/?image_type=photo&orientation=horizontal&q=${this.nameSearchImg}&page=${this.page}&per_page=12&key=${API_KEY}
//     );
//     if (!rawResult.ok) {
//       throw rawResult;
//     }
//     const result = await rawResult.json();
//     this.page += 1;
//     return result;
//   }}