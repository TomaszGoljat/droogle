// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2

const axios = require("axios")
const cheerio = require("cheerio")


exports.handler = async function (event, context) {
  /* Getting informations from event: */
  const keywords = event.queryStringParameters.keywords
  const source = event.queryStringParameters.source
  const ddgUrl = 'https://html.duckduckgo.com/html/'

  var url = ""
  var params = {}

  /* Preparing search query: */
  switch (source) {
    case 'shroomery':
      url = `https://www.shroomery.org/forums/dosearch.php`
      params = {
        where: "body",
        how: "all",
        words: keywords,
        showmain: 1
      }
      break;
    case 'bluelight':
      url = ddgUrl
      params = {
        q: keywords + ' site:bluelight.org'
      }
      break;
    case 'dmtnexus':
      url = ddgUrl
      params = {
        q: keywords + ' site:dmt-nexus.me/forum/'
      }
      break;
    case 'erowid':
      url = "https://www.erowid.org/search.php"
      params = {
        q: keywords
      }
  }
  console.log(url)
  if (url) {
    const response = await axios.get(url, {
      params: params
    });
    //const searchResults = response.data;
    // Let's load the html from response:
    const $ = cheerio.load(response.data)
    // Selecting actual results:
    var resultsTable = []
    var resultsList = []
    switch (source) {
      case 'shroomery':
        resultsList = $(".pp")
        // Creating table to send to front end
        resultsList.each((idx, el) => {
          resultsTable.push([$(el).text(), $(el).attr('href')])
        })
        break;
      case 'bluelight':
      case 'dmtnexus':
        console.log(params)
        const titles = $(".result__a")
        const links = $(".result__url")
        const descriptions = $(".result__snippet")
        for (let i = 0; i < titles.length; i++) {
          // Preparing values:
          const blTag = /\ Bluelight.org/
          //const title = $(titles[i]).text()
          resultsTable.push([$(titles[i]).text().replace(blTag, ""), $(links[i]).text().replace(" ", ""), $(descriptions[i]).text()])
        }
        console.log(resultsTable)
        break;
        case 'erowid':
          const erowidTitles = $(".result-title")
          const erowidUrls = $(".result-title a")
          const erowidDesc = $(".result-details")
          console.log($(erowidTitles[1]).text(), $(erowidUrls[1]).attr('href'), $(erowidDesc[1]).text())
        for (let i = 0; i < erowidTitles.length; i++) {
          // Preparing values:

          // Creating resultsTable:
          resultsTable.push([$(erowidTitles[i]).text(), $(erowidUrls[i]).attr('href'), $(erowidDesc[i]).text()])
        }
        break;
    }
    //console.log(`Here's the data from website: ${searchResults}`)
    return {
      statusCode: 200,
      body: JSON.stringify(resultsTable)
    };
  } else {
    console.log("No Search Query")
    return {
      statusCode: 200,
      body: JSON.stringify([["Type your search request and choose source above."]])
    }
  }
};


/*
https://www.shroomery.org/forums/dosearch.php
?forum%5B%5D=
&words=psilohuasca
&namebox=
&replybox=
&how=all
&where=body
&tosearch=both
&newerval=
&newertype=y
&olderval=
&oldertype=y
&minwords=
&maxwords=
&limit=25
&sort=r
&way=d
&showmain=1
*/