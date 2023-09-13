import React from "react";

/*
* Search Component display searchbox and search buttons.
* Takes the input and when clicked on search button - sends it to chosen search component to fetch and display.
*/

export default function Search() {
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