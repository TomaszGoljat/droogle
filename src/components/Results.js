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
   // resultsTable[title, title-url, subforum, subforum-url, date]
   const Shroomery = (props) => {
        const shroomeryDate = -Math.round((Date.parse(props.date) - Date.now()) / (1000 * 60 * 60 * 24))
       return (
        <div className="shroomery--singleResult">
           <a href={props.link} className="shroomery--link" target="_blank" rel="noreferrer">
            <div className="shroomery--title">{props.title}</div></a>
            <hr className="shroomery--hr"/>
            <div className="shroomery--secondRow">posted {shroomeryDate} days ago in 
            <a href={props.subforumUrl}>{props.subforum}</a></div>
        </div>
           )
        }
                   
    // DuckDuckGo:
    // Currently: DMT-nexus, Blue-light
    
    const DuckDuckGo = (props) => {
        return (
<a href={`https://${props.link}`} target="_blank" rel="noreferrer">
            <div className="ddg--singleResult">
                {props.title}
                <p className="ddg--description">{props.description}</p>
            </div></a>
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

    /*
    * ..:: END OF Single Result components
    */

    // ..:: Label Component ::..

    const Label = (props) => {
        return <span className="results--label">You are searching: {props.source}</span>
    }
    
    
    // ..:: Rendering Results ::..
    switch (props.source) {
        // ..:: No Source ::..
        default:
            renderResults = <div><p>Type your query and choose resource</p></div>
            break;
        // ..:: Shroomery ::..
        case 'shroomery':
            renderResults = props.results.map(result => <Shroomery 
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
            renderResults = props.results.map(result => <DuckDuckGo link={result[1]} title={result[0]} description={result[2]} />)
            break;
        
    }

    return (
        <div className="results--div">
           {props.source ? <Label source={props.source} /> : ""}
            {renderResults}
        </div>
    )
}