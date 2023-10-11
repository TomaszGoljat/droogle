import { useSelect } from "downshift";
import React from "react";

const items = ["r/opiates", "r/Stims", "r/trees"]
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
        
        return (
            <div className="vendorsFilter--countrybox">
                <label {...getLabelProps()}></label>
                <div className="vendors--selectedCountry" {...getToggleButtonProps()}>
                    {selectedItem ?? 'subreddit'}
                </div>
                <div {...getMenuProps()} className="vendors--countryList">
                    {isOpen &&
                        items.map((item, index) => (
                            <div
                                className="vendorsFilter--button"
                                style={
                                    highlightedIndex === index ? { backgroundColor: 'blue' } : {}
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