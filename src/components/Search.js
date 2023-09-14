import React, { useEffect } from "react";
import axios from "axios";

/*
* Search Component display searchbox and search buttons.
* Takes the input and when clicked on search button - sends it to chosen search component to fetch and display.
*/



export default function Search() {

    const url = "/.netlify/functions/shroomery-fetch/shroomery-fetch.js"

    /*
    const fetchResult = async function simpleFetch() {
        const response = await axios.get(url)
        return response.data.body
    }
    
This one worked
    const GetResults = async () => {
        let { data } = await axios.get(url);
        console.log(data)
    }
*/


    const [results, setResults] = React.useState([]);
    const [error, setError] = React.useState(false);
    const [state, setState] = React.useState('');

    function fetchResults() {
        setState('loading')
        axios
            .get(url)
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

    useEffect(() => {
        fetchResults();
    }, [])

    if(state === 'error')
        return (
    <h1>{error.toString()}</h1>
    );
/*
    return (
        <div>
            {results.map(el => {
                return <p><a href={el[1]}>{el[0]}</a></p>
            })}
        </div>
    )
*/
    

        return (
        <div className="search">
        <div className="search-box">
            <input type="text" className="search-input" />
        </div>
        <div className="search-nav">
            <button className="search-button">shroomery</button>
            <button className="search-button">bluelight</button>
            <button className="search-button">erowid</button>
            <button className="search-button">drugsforum</button>
            <button className="search-button">other</button>
        </div>
        </div>
    )
    
}