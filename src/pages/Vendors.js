import React from "react"
import { useEffect } from "react"
import { useSelect } from "downshift"
import "/node_modules/flag-icons/css/flag-icons.min.css"
import { nanoid } from "nanoid"



export default function Vendors() {

    const [vendorArr, setVendorArr] = React.useState(require("../data/vendors.json"))
    const [country, setCountry] = React.useState(null)
    const [filteredArr, setFilteredArr] = React.useState(vendorArr)
    const [isFiltered, setIsFiltered] = React.useState(false)


    const CountryFlag = (props) => {
        let countryTag = ""
        switch(props.name) {
            case "Germany":
                countryTag = "de"
                break;
            case "USA":
                countryTag = "us"
                break;
            case "Netherlands":
                countryTag = "nl"
                break;
            case "Lithuania":
                countryTag = "lt"
                break;
            case "United Kingdom":
                countryTag = "gb"
                break;
            case "Switzerland":
                countryTag = "ch"
                break;
        }
        return <span className={`fi fi-${countryTag} fi`}></span>
    }

    const SupporterTag = (props) => {
        let tag = ""
        switch (props.level) {
            case 0:
            default:
                tag = ""
                break;
            case 1:
                tag = <div className="supporter--bronze">supporter</div>
                break;
            case 2:
                tag = <div className="supporter--silver">silver supporter</div>
                break;
            case 3:
                tag = <div className="supporter--gold">gold supporter</div>
                break;
            case 4:
                tag = <div className="supporter--platinum">platinum supporter</div>
                break;
        }
        return tag
    }

    /*
    * ..:: COUNTRY FILTER START ::..
    */

    /*  const countries = List of all of the countries
    *   1. Create an array of country property from each object (map).
    *   2. Filter through the array and get rid of duplicates (filter).
    *   3. Profit!
    */
    const countries = vendorArr.map(v => v.country).filter((item, i, ar) => ar.indexOf(item) === i)

    // Returning array filtered by selected country:
    // *** If I'm going to allow adding filters I should check if the list was filtered before. ***
    function filterByCountry() {
        //console.log(`Inside filterByCountry country is: ${country}`)
        if(country !== null) {
            const filteredByCountry = vendorArr.filter(vendor => vendor.country === country)
            return filteredByCountry
        } else {
            return vendorArr
        }
    }

    // Handling country selection through downshift
    function handleSelectedCountryChange({ selectedItem }) {
        setCountry(selectedItem)
    }

    function CountrySelect({ selectedItem }) {
        const {
            isOpen,
            getToggleButtonProps,
            getLabelProps,
            getMenuProps,
            highlightedIndex,
            getItemProps,
        } = useSelect({
            items: countries,
            selectedItem: country,
            onSelectedItemChange: handleSelectedCountryChange,
        })
        return (
            <div className="vendorsFilter--countrybox">
                <label {...getLabelProps()}>Country:</label>
                <div className="vendors--selectedCountry" {...getToggleButtonProps()}>
                    {country ?? 'Choose Country'}
                </div>
                <div {...getMenuProps()} className="vendors--countryList">
                    {isOpen &&
                        countries.map((item, index) => (
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

    /*
    * ..:: COUNTRY FILTER END ::..
    */

    /*
    * ..:: TAGS FILTER START ::..
    */

    // Getting all of the tags:


    const tags = vendorArr.map(v => [...v.tags.split(", ")]).flat(1).filter((item, i, ar) => ar.indexOf(item) === i)
    const [tagsArray, setTagsArray] = React.useState(createTagList(tags.sort((a,b) => a < b ? -1 : 1)))

    function createTagList(tags) {
        return tags.map((t, i) => ({
            id: nanoid(),
            tagName: t,
            selected: false
        }))
    }

    function selectTag(id) {
        setTagsArray(prevArr => prevArr.map(tag => tag.id === id ? { ...tag, selected: !tag.selected } : tag))
        //console.log(tagsArray)
    }

    function getSelectedTags() {
        return tagsArray.filter(tag => tag.selected === true).map(tagObj => tagObj.tagName)
    }

    // Takes already filtered by country array and returns array of vendor objects
    function filterByTags(array, type = "any") {
        const selectedTags = getSelectedTags()
        // 1. array.map(vendor => vendor.tags.split(", ") - an array of tags as string
        // 2. .some( t => selectedTags.includes(t)) - return boolean if contains any of items from selectedTags
        // 3. ? vendor : null) - return array of filled with vendor objects or nulls
        // 4. filter(v => v !== null) - filter out null values.
        const selectedVendors = array.map(vendor => vendor.tags.split(", ").some( t => selectedTags.includes(t)) ? vendor : null).filter(v => v !== null) 
        const alternativeSelectedVendors = array.map(vendor => vendor.tags.split(", ").filter(t => selectedTags.includes(t)) ? vendor : null)
        //console.log('first step: ', array.map(vendor => vendor.tags.split(", ")).some( t => selectedTags.includes(t)))
        console.log('Selected Vendors: ', selectedVendors)
        console.log('Alternative Selected Vendors: ', alternativeSelectedVendors)
        //console.log(`Currently selected tags: ${selectedTags}`)
        return selectedVendors
    }
  
   /*
   * ..:: TAGS FILTER END ::.. 
   
   // ..:: Reset filters ::..
   */
   
  function resetFilters() {
      setCountry(null)
      setTagsArray(createTagList(tags))
      setFilteredArr(vendorArr)
    }
    
    

    useEffect(() => {
        function applyFilters() {
        setIsFiltered(true)
        const countryFiltered = filterByCountry()
        //console.log('filteredArr: ', countryFiltered)
        if(tagsArray.some(tag => tag.selected === true)) {
            setFilteredArr(filterByTags(countryFiltered))
        } else {
            setFilteredArr(countryFiltered)
        }
    }
        applyFilters()
    }, [country, tagsArray])

    // ..:: Single Vendor Card ::..


    const SingleVendor = (props) => {
        return (
            
            <div className="singleVendor--div">
                <div className="singleVendor--nameBox">
                    <a href={props.url} target="_blank" rel="noreferrer" className="singleVendor--link">
                    <CountryFlag name={props.country} />
                    <span className="singleVendor--name">{props.name}
                    </span></a>
                    <span className="singleVendor--sponsor">
                        <SupporterTag level={props.sponsor} />
                    </span>
                </div>
                <div className="singleVendor--descBox">{props.desc}</div>
                <div className="singleVendor--tagBox">
                    {props.tags.map((tag, index) => <div className="singleVendor--tag" key={`${tag}${index}`}>{tag}</div>)}
                </div>
                <div className="singleVendor--couponBox">
                    {props.coupon === 0 ? "" : <span className="singleVendor--coupon">Discount code: {props.coupon}</span>}
                </div>
            </div>
            
        )
    }


    return (
        <div className="vendors--div">
            <div className="vendors--filters">
                <CountrySelect />
                <div className="vendorsFilter--tagbox">
                    <label>Tags:</label>
                {tagsArray.map(t => <button 
                className="vendorsFilter--button"
                key={t.id} 
                onClick={() => selectTag(t.id)}
                style={t.selected ? {backgroundColor: 'blue'} : {}}
                > {t.tagName} </button>)}
                </div>
            <div className="vendors-filtersBtnDiv">
                <button className="vendorsFilter--button" onClick={resetFilters} style={{fontSize: "120%"}}>Reset</button>
            </div>
            </div>
            {filteredArr.map((v, index) => {
                return (
                    <SingleVendor
                        name={v.name}
                        url={v.url}
                        sponsor={v.sponsor}
                        desc={v.description}
                        country={v.country}
                        tags={v.tags.split(", ")}
                        coupon={v.coupon}
                        key={nanoid()}
                    />)
            })}
        </div>
    )
}