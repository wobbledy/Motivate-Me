var requestQuote = "https://api.goprogram.ai/inspiration";
var requestSong = "https://api.napster.com/v2.2/search?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&query=inspirational"
var quoteCache = [];
var authorCache = [];
var trackCache = [];
var artistCache = [];
var previewURLCache = [];
var quoteDisplayed = false;

//Calls the API to get a random quote when the Motive Me button is pressed
function generateQuote() {
    event.preventDefault();

    fetch(requestQuote)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayQuote(data);
        })
    
   getSong();
}

//Calls the API to get a list of inspirational songs
function getSong() {

    fetch(requestSong)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            generateSong(data);
            //console.log(data);
        })
}

//Grabs a random song from the API call function
function generateSong(data) {
    var trackNumber = Math.floor(Math.random() * 19);
    var trackName = data.search.data.tracks[trackNumber].name;
    var artist = data.search.data.tracks[trackNumber].artistName;
    var previewURL = data.search.data.tracks[trackNumber].previewURL;

    console.log(trackName);
    console.log(artist);
    console.log(previewURL)

    displaySong(trackName, artist, previewURL);

}

//Displays the song info on the screen
function displaySong(trackName, artist, previewURL) {
    //Code to Display Song on Screen

    storeSong(trackName, artist, previewURL);
}

//Stores the song information into an array
function storeSong(trackName, artist, previewURL) {
    
    var storedTrackNameArray = JSON.parse(localStorage.getItem("trackCache")) || [];
    var storedArtistArray = JSON.parse(localStorage.getItem("artistCache")) || [];
    var storedPreviewURLArray = JSON.parse(localStorage.getItem("previewURLCache")) || [];
    storedTrackNameArray.push(trackName);
    storedArtistArray.push(artist);
    storedPreviewURLArray.push(previewURL);

    localStorage.setItem("trackCache", JSON.stringify(storedTrackNameArray));
    localStorage.setItem("artistCache", JSON.stringify(storedArtistArray));
    localStorage.setItem("previewURLCache", JSON.stringify(storedPreviewURLArray));
}

//Displays the quote on the screen
function displayQuote(data) {
    var author = data.author;
    var quote = data.quote;

    if (quoteDisplayed === false) {

        quoteDisplayed = true;
        var quoteLi = document.createElement("li");
        quoteLi = "\"" + quote + "\"";
        document.getElementById("result").append(quoteLi);

        var authorLi = document.createElement("li");
        authorLi = author;
        document.getElementById("author").append(authorLi);

        storeQuote(author, quote);
    }
    
}

//Stores quotes displayed in local storage as an array
function storeQuote(author, quote) {

    var storedAuthorArray = JSON.parse(localStorage.getItem("authorCache")) || [];
    var storedQuoteArray = JSON.parse(localStorage.getItem("quoteCache")) || [];
    storedAuthorArray.push(author);
    storedQuoteArray.push(quote);

    localStorage.setItem("authorCache", JSON.stringify(storedAuthorArray));
    localStorage.setItem("quoteCache", JSON.stringify(storedQuoteArray));
}

//Checks if there are any quotes saved in local storage
function reloadQuote() {
    if (authorCache === null || quoteCache === null) {
        return;
    }

    var storedAuthorString = localStorage.getItem("authorCache");
    var storedQuoteString = localStorage.getItem("quoteCache");
    var storedAuthorArray = JSON.parse(storedAuthorString);
    var storedQuoteArray = JSON.parse(storedQuoteString);


    console.log(storedAuthorArray[0]);
    console.log(storedQuoteArray[0]);
}
