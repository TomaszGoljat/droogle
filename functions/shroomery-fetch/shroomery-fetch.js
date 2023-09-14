// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2

const axios = require("axios")
const cheerio = require("cheerio")

const url = "https://www.shroomery.org/forums/dosearch.php?where=body&tosearch=both&how=all&words=grow+box"

//const result = axios.get(url)
async function scrap() {
  const results = await axios.get(url)
}



exports.handler = async function (event, context) {
  const response = await axios.get(url);
  //const searchResults = response.data;
  // Let's load the html from response:
  const $ = cheerio.load(response.data)
  // Selecting actual results:
  const resultsList = $(".pp")
  // Creating table to send to front end
  const resultsTable = []
  // Adding results to the array:
  resultsList.each((idx, el) =>
  {
    resultsTable.push([$(el).text(), $(el).attr("href")])
  })
  //console.log(`Here's the data from website: ${searchResults}`)
  return {
    statusCode: 200,
    body: JSON.stringify(resultsTable)
  };
};
