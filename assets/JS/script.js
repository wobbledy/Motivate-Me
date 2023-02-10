var requestQuote = "https://api.goprogram.ai/inspiration";
var requestSong = "https://api.napster.com/v2.2/search?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&query=inspirational"
var quoteCache;
var authorCache;
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
}

//Calls the API to get a random inspirational song
function getSong() {

    fetch(requestSong)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            generateSong(data);
            console.log(data);
        })
}

getSong();

function generateSong(data) {
    var trackNumber = Math.floor(Math.random() * 19);
    var trackName = data.search.data.tracks[trackNumber].name;
    var artist = data.search.data.tracks[trackNumber].artistName;
    var previewURL = data.search.data.tracks[trackNumber].previewURL;

    console.log(trackName);
    console.log(artist);
    console.log(previewURL)
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

    var storedAuthorString = localStorage.getItem("authorCache");
    var storedQuoteString = localStorage.getItem("quoteCache");
    var storedAuthorArray = JSON.parse(storedAuthorString) || [];
    var storedQuoteArray = JSON.parse(storedQuoteString) || [];
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
