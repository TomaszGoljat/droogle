import React from "react";

export default function Results(props) {
    
    /*
    * ..:: Variables ::..
    * renderResults - mapping through results and rendering them accordingly to source
    */
    let renderResults
    /*
    * ..:: Single Result components ::..
    */
   
   // Shroomery:
   const Shroomery = (props) => {
       return (
           <a href={props.link} className="single-result--ahref" target="_blank" rel="noreferrer"><div className="single-result">{props.title}</div></a>
           )
        }
                   
    // DuckDuckGo:
    // Currently: DMT-nexus, Blue-light
    
    const DuckDuckGo = (props) => {
        return (
            <div className="single-result--ddg">
                <a href={`https://${props.link}`} target="_blank" rel="noreferrer">{props.title}</a>
                <p>{props.description}</p>
            </div>
        )
    }
    
    // Erowid:
    
    const Erowid = (props) => {
        return (
            <div>
                <a href={`https://www.erowid.org/${props.link}`} target="_blank" rel="noreferrer">{props.title}</a>
                <p>{props.description}</p>
            </div>
        )
    }
    
    
    // ..:: Rendering Results ::..
    switch (props.source) {
        // ..:: No Source ::..
        default:
            renderResults = <div><p>Type your query and choose resource</p></div>
            break;
        // ..:: Shroomery ::..
        case 'shroomery':
            renderResults = props.results.map(result => <Shroomery link={result[1]} title={result[0]} />)
            break;
        // ..:: Erowid ::..
        case 'erowid':
            renderResults = props.results.map(result => <Erowid link={result[1]} title={result[0]} description={result[2]} />)
            break;
            // ..:: DuckDuckGo ::..
            // ..:: BlueLight, DMT-Nexus ::..
        case 'bluelight':
        case 'dmtnexus':
            renderResults = props.results.map(result => <DuckDuckGo link={result[1]} title={result[0]} description={result[2]} />)
            break;
        
    }

    return (
        <div className="results-div">
            <span className="source-label">{props.source}</span>
            {renderResults}
        </div>
    )
}