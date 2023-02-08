var requestURL = "https://api.goprogram.ai/inspiration";

//Calls the API to get a random quote when the Motive Me button is pressed
function generateQuote() {
    event.preventDefault();

    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayQuote(data);
        })
}


//Displays the quote on the screen
function displayQuote(data) {
    var author = data.author;
    var quote = data.quote;

}

