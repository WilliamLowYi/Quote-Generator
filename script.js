const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show Loading
function loading() {
    // While loading hide the quote container and display the loading animation.
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    // If the container is hidden then we will switch them.
    if (quoteContainer.hidden) {
        loader.hidden = true;
        quoteContainer.hidden = false;
    }

}

// Get Quote From API
async function getQuote() {
    // Show the loading at the beginning of the getQuote process.
    loading();
    // Using proxy API for CORS issue and combine them
    const proxyUrl = 'http://cors-anywhere.herokuapp.com/';
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
        complete();
        
        // console.log(data);
    } catch (error) {
        // Rerun the function as there is some API token problem
        getQuote();
        // console.log('Wait, where is the quote? ' + error);
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
