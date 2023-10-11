import React, { useEffect } from "react";
import axios from "axios";
import Results from "./Results";

// Importing Favicons:
import favDDG from "./icons/duckduckgo.png"
import favErowid from "./icons/erowid.png"
import favShroomery from "./icons/shroomery.png"

import SubredditSelect from "./SubredditSelect";
/*
* Search Component display searchbox and search buttons.
* Takes the input and when clicked on search button - sends it to chosen search component to fetch and display.

Sources to add:
forums.ayahuasca.com (internal)
specific subreddits (ddg):
 - r/dxm/
 - ...
 leafly?

*/



export default function Search() {

    const url = "/.netlify/functions/fetch-results/fetch-results.js"

    const [results, setResults] = React.useState([]);
    const [error, setError] = React.useState(false);
    const [state, setState] = React.useState('');
    const [source, setSource] = React.useState('')

    const [tempQuery, setTempQuery] = React.useState("")
    const [query, setQuery] = React.useState("")

    function grabQuery(event) {
        setTempQuery(event.target.value)
    }

    const [selectedSubreddit, setSelectedSubreddit] = React.useState(null)
    function subredditSearch({selectedItem}) {
        setSource(selectedItem)
        setSelectedSubreddit(selectedItem)
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => setQuery(tempQuery), 500)
        return () => clearTimeout(timeoutId)
    }, [tempQuery])


    // ..:: Loading Animation ::..

    const Loading = () => <div className="ring">Loading<span className="loading"></span></div>
    
    

    useEffect(() => {
       // ..:: fetchResults() - calling fetch-results.js 

        function fetchResults() {

        console.log(`Current Query: ${query}`)

        const params = {
            keywords: query,
            source: source
        }

    
        setState('loading')
        axios
            .get(url, {
                params: params
            })
            .then((res) => {
                console.log(res)
                setState('success')
                setResults(res.data)
            })
            .catch((err) => {
                console.error('Error:',err)
                setState('error')
                setError(err)
            })
    }
    query && source && fetchResults();
    }, [source, query])

    if(state === 'error')
        return (
    <h1>{error.toString()}</h1>
    );

        return (
        <div className="search">
        <div className="search--box">
            <input type="search" placeholder="Search for..." className="search--input" onChange={grabQuery}/>
        </div>
        <div className="search--nav">
            <button className="search--button" onClick={() => setSource('erowid')}><img src={favErowid} alt="Erowid favicon"/> erowid</button>
            <button className="search--button" onClick={() => setSource('dmtnexus')}><img src={favDDG} alt="DuckDuckGo favicon" /> dmtnexus</button>
            <button className="search--button" onClick={() => setSource('shroomery')}><img src={favShroomery} alt="Shroomery favicon" /> shroomery</button>
            <button className="search--button" onClick={() => setSource('bluelight')}><img src={favDDG} alt="DuckDuckGo favicon" /> bluelight</button>
        </div>
        <div><SubredditSelect handleSelectedItemChange={subredditSearch} selectedItem={selectedSubreddit}/></div>
        {state === 'loading' ? <Loading /> : <Results results={results} source={source} />}
        </div>
    )
    
}