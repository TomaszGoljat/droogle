// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2

const axios = require("axios")
const cheerio = require("cheerio")

// https://bluelight.org/xf/threads/dxm.78090/
                  
exports.handler = async function (event, context) {
  /* Getting informations from event: */
  const keywords = event.queryStringParameters.keywords.replace(/[^\w\s]/gi, '')
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
      break;
    // Subreddit Searches:
    case 'r/Ayahuasca':
    case 'r/microdosing':
    case 'r/microgrowery':
    case 'r/opiates':
    case 'r/researchchemicals':
    case 'r/shrooms':
    case 'r/Stim':
    case 'r/Trees':
      url = ddgUrl
      params = {
        q: keywords + ` site:reddit.com/${source}/`
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
    switch (source) {
    // ..:: Shroomery ::..
    // resultsTable[title, title-url, subforum, subforum-url, date]
      case 'shroomery':
        const shroomeryTitles = $(".pp")
        const shroomerySubforums = $(".darktable.wrap.forumrow a")
        const shroomeryDate = $(".darktable.wrap.postedrow")
        // Creating table to send to front end
       for (let i = 0; i < shroomeryTitles.length; i++) {
        console.log($(shroomeryTitles[i]).text(), $(shroomerySubforums[i]).text(), $(shroomeryDate[i]).text())
        resultsTable.push([$(shroomeryTitles[i]).text(), 
        $(shroomeryTitles[i]).attr('href'), 
        $(shroomerySubforums[i]).text(),
        $(shroomerySubforums[i]).attr('href'),
        $(shroomeryDate[i]).text()])
       }
        break;
      // ..:: DuckDuckGo ::..
      // resultsTable[title, title-url, description]
      case 'bluelight':
      case 'dmtnexus':
      case 'r/Ayahuasca':
      case 'r/microdosing':
    case 'r/microgrowery':
    case 'r/opiates':
    case 'r/researchchemicals':
    case 'r/shrooms':
    case 'r/Stim':
    case 'r/Trees':
        console.log(params)
        const ddgTitles = $(".result__a")
        const ddgLinks = $(".result__url")
        const ddgDescriptions = $(".result__snippet")
        for (let i = 0; i < ddgTitles.length; i++) {
          // Preparing values:
          const blTag = /\| Bluelight.org/
          const ddgTitle = $(ddgTitles[i]).text()
          const ddgLink = $(ddgLinks[i]).text().replace(/\s/g, "")
          const ddgDescription = $(ddgDescriptions[i]).text()
          resultsTable.push([ddgTitle, ddgLink, ddgDescription])
        }
        console.log(resultsTable)
        break;
      // ..:: Erowid ::..
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