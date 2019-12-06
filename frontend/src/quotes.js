const quoteURL = 'http://localhost:3000/api/v2/quotes'

function renderQuote() {
  fetch(quoteURL)
  .then(res => res.json())
  .then(data => {

      const mathVar = Math.floor((Math.random() * 10) + 1);
      const randomQuoteGen = data[mathVar]
      const randomQuoteName = document.querySelector(".quoteName")
      const randomQuoteContent = document.querySelector(".quoteContent")
      
      randomQuoteName.textContent = '- "' + randomQuoteGen.name + '"'
      randomQuoteContent.textContent = '"' + randomQuoteGen.content + '"'
  })
}

renderQuote()
