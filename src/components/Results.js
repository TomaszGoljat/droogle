import React from "react";

// Results Components:
import Shroomery from "./results/Shroomery";
import DuckDuckGo from "./results/DuckDuckGo";
import Erowid from "./results/Erowid";
import NoResults from "./results/NoResults";

export default function Results(props) {
    
    /*
    * ..:: Variables ::..
    * renderResults - mapping through results and rendering them accordingly to source
    */
    let renderResults
    // ..:: Label Component ::..

    const Label = (props) => {
        return <span className="tools--label">You are searching: {props.source}</span>
    }

    // ..:: Rendering Results ::..
    if(props.results.length < 1 && props.source) {
        renderResults = <NoResults source={props.source} />
    } else {
    switch (props.source) {
        // ..:: No Source ::..
        default:
            renderResults = <div><p>Type your query and choose resource</p></div>
            break;
        // ..:: Shroomery ::..
        case 'shroomery':
            renderResults = 
            props.results.map(result => <Shroomery 
            link={result[1]} 
            title={result[0]} 
            subforum={result[2]} 
            subforumUrl={result[3]} 
            date={result[4]} 
            />)
            break;
        // ..:: Erowid ::..
        case 'erowid':
            renderResults = props.results.map(result => <Erowid 
                link={result[1]} 
                title={result[0]} 
                description={result[2]} 
                />)
            break;
            // ..:: DuckDuckGo ::..
            // ..:: BlueLight, DMT-Nexus ::..
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
            renderResults = props.results.map(result => <DuckDuckGo link={result[1]} title={result[0]} description={result[2]} />)
            break;
        
    } 
}

    return (
        <div className="results--div">
           {props.source ? <Label source={props.source} /> : ""}
           {renderResults}
        </div>
    )
}