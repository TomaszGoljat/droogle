import React from "react";

export default function Results(props) {
    
    // Single result component:
    const Result = (props) => {
        return (
            <div className="single-result">
                <a href={props.link} className="single-result--ahref" target="_blank">{props.title}</a>
            </div>
        )
    }

    return (
        <div className="results-div">
            <span className="source-label">{props.source}</span>
            {props.results.map(result => <Result link={result[1]} title={result[0]} />)}
        </div>
    )
}