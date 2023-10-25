import { useSelect } from "downshift";
import React from "react";
import favDDG from "./icons/duckduckgo.png"

const items = ["r/Ayahuasca", "r/microdosing", "r/microgrowery", "r/opiates", "r/researchchemicals", "r/shrooms", "r/Stim", "r/Trees"]
function SubredditSelect({ selectedItem, handleSelectedItemChange }) {
    const {
        isOpen,
        getToggleButtonProps,
            getLabelProps,
            getMenuProps,
            highlightedIndex,
            getItemProps,
        } = useSelect({
            items: items,
            selectedItem: selectedItem,
            onSelectedItemChange: handleSelectedItemChange,
        })

        const RedditLabel = () =>  {return <><img src={favDDG} alt="DuckDuckGo favicon" /> reddit</>}
        
        return (
            <div className="vendorsFilter--countrybox">
                <label {...getLabelProps()}></label>
                <div className="search--button" {...getToggleButtonProps()}>
                    {selectedItem ?? <RedditLabel />}
                </div>
                <div {...getMenuProps()} className="vendors--countryList">
                    {isOpen &&
                        items.map((item, index) => (
                            <div
                                className="search--button"
                                style={
                                    highlightedIndex === index ? { backgroundColor: 'blue', padding: '3px' } : {padding: '3px'}
                                }
                                key={`${item}${index}`}
                                {...getItemProps({ item, index })}
                            >
                                {item}
                            </div>
                        ))}
                </div>
            </div>
        )
    }

export default SubredditSelect;