import axios from "axios"
import React from "react"
import { useEffect } from "react"
import { useSelect } from "downshift"



export default function Vendors() {

    const [vendorArr, setVendorArr] = React.useState(require("../data/vendors.json"))
    const [country, setCountry] = React.useState(null)
    const [filteredArr, setFilteredArr] = React.useState(vendorArr)

    function handleSelectedItemChange({selectedItem}) {
        setCountry(selectedItem)
        setFilteredArr(filterByCountry(selectedItem))
      }
    const SupporterTag = (props) => {
        let tag = ""
        switch (props.level) {
            case 0:
            default:
                tag = ""
            break;
            case 1:
                tag = <div className="supporter-bronze">bronze supporter</div>
                break;
            case 2:
                tag = <div className="supporter-silver">silver supporter</div>
                break;
            case 3:
                tag = <div className="supporter-gold">gold supporter</div>
                break;
            case 4:
                tag = <div className="supporter-platinum">platinum supporter</div>
                break;
        }
        return tag
    }

    /*  const countries = List of all of the countries
    *   1. Create an array of country property from each object (map).
    *   2. Filter through the array and get rid of duplicates (filter).
    *   3. Profit!
    */
   const countries = vendorArr.map(v => v.country).filter((item, i, ar) => ar.indexOf(item) === i)
   const items = countries;


    function filterByCountry(country) {
        console.log(`Inside filterByCountry country is: ${country}`)
        return vendorArr.filter(vendor => vendor.country === country)
    }

   function DropdownSelect({selectedItem, handleSelectedItemChange}) {
        const {
          isOpen,
          getToggleButtonProps,
          getLabelProps,
          getMenuProps,
          highlightedIndex,
          getItemProps,
        } = useSelect({
          items,
          selectedItem,
          onSelectedItemChange: handleSelectedItemChange,
        })
        return (
          <div>
            <label {...getLabelProps()}>Filter by country:</label>
            <div className="vendors--selectedCountry" {...getToggleButtonProps()}>
              {selectedItem ?? 'Choose Country'}
            </div>
            <ul {...getMenuProps()} className="vendors--countryList">
              {isOpen &&
                items.map((item, index) => (
                  <li
                    style={
                      highlightedIndex === index ? {backgroundColor: 'blue'} : {}
                    }
                    key={`${item}${index}`}
                    {...getItemProps({item, index})}
                  >
                    {item}
                  </li>
                ))}
            </ul>
          </div>
        )
      }

   const SingleVendor = (props) => {
    return (
    <div className="singleVendor--div">
        <div className="singleVendor--nameBox">
            <span className="singleVendor--name">{props.name}</span>
            <span className="singleVendor--sponsor">
                <SupporterTag level={props.sponsor} />
            </span>
        </div>
        <div className="singleVendor--descBox">{props.desc}</div>
        <div className="singleVendor--tagBox">
            {props.tags.map((tag, index) => <div className="singleVendor--tag" key={`${tag}${index}`}>{tag}</div>)}
        </div>
        <div className="singleVendor--couponBox">
            {props.coupon === 0 ? "" : <span>{props.coupon}</span>}
        </div>
    </div>
    )
   } 


    return (
        <div className="vendors--div">
            <div className="vendors--filters">
            <DropdownSelect selectedItem={country} handleSelectedItemChange={handleSelectedItemChange} />

            </div>
            <h1>Vendors List</h1>
    {console.log(country)}
            <p>Here you will find list of shops that you can filter through by:</p>
            {filteredArr.map((v, index) => {return (
            <SingleVendor 
            name={v.name} 
            sponsor={v.sponsor}
            desc = {v.description}
            country = {v.country}
            tags = {v.tags.split(", ")}
            coupon = {v.coupon}
            key = {`${v.name}${index}`}
            />)})}
        </div>
    )
}