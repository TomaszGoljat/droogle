import React, { useEffect } from "react";
import axios from "axios";
import Results from "./Results";

/*
* Search Component display searchbox and search buttons.
* Takes the input and when clicked on search button - sends it to chosen search component to fetch and display.
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

    useEffect(() => {
        const timeoutId = setTimeout(() => setQuery(tempQuery), 500)
        return () => clearTimeout(timeoutId)
    }, [tempQuery])
    
    

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
        fetchResults();
    }, [source, query])

    if(state === 'error')
        return (
    <h1>{error.toString()}</h1>
    );

        return (
        <div className="search">
        <div className="search-box">
            <input type="text" placeholder="Search for..." className="search-input" onChange={grabQuery}/>
        </div>
        <div className="search-nav">
            <button className="search-button" onClick={() => setSource('shroomery')}>shroomery</button>
            <button className="search-button" onClick={() => setSource('bluelight')}>bluelight</button>
            <button className="search-button" onClick={() => setSource('erowid')}>erowid</button>
            <button className="search-button" onClick={() => setSource('dmtnexus')}>dmtnexus</button>
        </div>
        {state === 'loading' ? "Loading..." : <Results results={results} source={source} />}
        </div>
    )
    
}