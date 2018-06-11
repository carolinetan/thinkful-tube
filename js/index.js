

const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search\n';
const YOUTUBE_API_KEY = 'AIzaSyAcqVMc4b1sniRoJ2y3zK3KVTWRoO30snw';


function displayYoutubeApiResults(data) {
    console.log('--> displayYoutubeApiResults got called... video count=' + data.items.length);
    if (data.items.length > 0) {
        $('ul').empty();

        output =
                `<ul class="container">
                 <h2><span class="resultsHeader">Results:</span></h2>
                ${data.items.map((item) => {
                     return `<li class="video-thumbnails">${item.snippet.title}<iframe src="https://www.youtube.com/embed/${item.id.videoId}"></iframe></li>`
                 }).join('')}
                 </ul>`;
        console.log(output);
        $('#search-results').append(output);
        $('#search-results').css( 'display', 'inline' );
    }
}


function getDataFromApi(search_key, callback) {
    console.log('--> getDataFromApi got called... ');

    const api_request = {
        key : YOUTUBE_API_KEY,
        q : search_key,
        type : 'video',
        part : 'snippet',
        maxResults : 4,
        order: "viewCount",
        publishedAfter: "2018-01-01T00:00:00Z"
    };

    $.getJSON(YOUTUBE_API_URL, api_request, callback);
}

function handleSubmit() {
    console.log('--> handleSubmit got called... ');
    $('.search-form').submit(event => {
        event.preventDefault();

        const searchInputField = $(event.currentTarget).find('.search-input-field');
        const searchInputValue = searchInputField.val();

        console.log('input search value = ' + searchInputValue);

        // clear out the input field value
        searchInputField.val("");
        getDataFromApi(searchInputValue, displayYoutubeApiResults);
    });
}

$(handleSubmit)