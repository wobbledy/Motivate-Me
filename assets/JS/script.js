var requestURL = "https://api.goprogram.ai/inspiration";
var quoteCache;
var authorCache;

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

    //var quoteLi = document.createElement("li");
    //quoteLi = "test";
    //document.getElementById("result").appendChild(quoteLi);

    storeQuote(author, quote);
}

//Stores quotes displayed in local storage as Strings
function storeQuote(author, quote) {
    localStorage.setItem("authorCache", JSON.stringify(author));
    localStorage.setItem("quoteCache", JSON.stringify(quote));
}

//Checks if there are any quotes saved in local storage and adds them to the screen
function reloadQuote() {
    
}