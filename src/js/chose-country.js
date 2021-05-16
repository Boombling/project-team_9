let furtherCountrySearch = '';

function onCountryClick (event) {
    furtherCountrySearch = event.target.textContent;
    API.fetchEvent(onCountryClick);
    refs.output.removeEventListener('click', onCountryClick);
}