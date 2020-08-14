const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const errorContainer = document.getElementById('error-container');
const errorText = document.getElementById('error-message');
var errorCounter = 0;

function showLoadingSpinner() {
    // While loading hide the quote container and display the loading animation.
    loader.hidden = false;
    quoteContainer.hidden = true;
}


function removeLoadingSpinner() {
    // If the container is hidden then we will switch them.
    if (quoteContainer.hidden) {
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}

function overloadError() {
    errorContainer.hidden = false
    quoteContainer.hidden = true;
    loader.hidden = true;
}

// Get Quote From API
async function getQuote() {
    // Show the loading at the beginning of the getQuote process.
    showLoadingSpinner();
    // Using proxy API for CORS issue and combine them
    const proxyUrl = 'https://rocky-coast-07934.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

        // Reduce font size for long quotes
        if (data.quoteText.length > 50) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        
        // If Author is blank, add 'Unknown'
        if (data.authorText === '') {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        // After the data been assigned
        removeLoadingSpinner();

        // console.log(data);
    } catch (error) {
        errorCounter++;
        console.log(errorCounter + error);
        if (errorCounter > 5){
            overloadError();
        } else {
            getQuote();
        }
    }
}

// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    // Used `` for template string
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load 
getQuote();
