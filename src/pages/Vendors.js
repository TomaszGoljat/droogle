import axios from "axios"
import React from "react"
import { useEffect } from "react"
import { useSelect, useCombobox } from "downshift"



export default function Vendors() {

    const [vendorArr, setVendorArr] = React.useState(require("../data/vendors.json"))
    const [country, setCountry] = React.useState(null)
    const [selectedTags, setSelectedTags] = React.useState([])
    const [filteredArr, setFilteredArr] = React.useState(vendorArr)


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

    /*
    * ..:: COUNTRY FILTER START ::..
    */

    /*  const countries = List of all of the countries
    *   1. Create an array of country property from each object (map).
    *   2. Filter through the array and get rid of duplicates (filter).
    *   3. Profit!
    */
    const countries = vendorArr.map(v => v.country).filter((item, i, ar) => ar.indexOf(item) === i)

    function filterByCountry(country) {
        console.log(`Inside filterByCountry country is: ${country}`)
        return vendorArr.filter(vendor => vendor.country === country)
    }

    function handleSelectedCountryChange({ selectedItem }) {
        setCountry(selectedItem)
        setFilteredArr(filterByCountry(selectedItem))
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
            <div>
                <label {...getLabelProps()}>Filter by country:</label>
                <div className="vendors--selectedCountry" {...getToggleButtonProps()}>
                    {country ?? 'Choose Country'}
                </div>
                <ul {...getMenuProps()} className="vendors--countryList">
                    {isOpen &&
                        countries.map((item, index) => (
                            <li
                                style={
                                    highlightedIndex === index ? { backgroundColor: 'blue' } : {}
                                }
                                key={`${item}${index}`}
                                {...getItemProps({ item, index })}
                            >
                                {item}
                            </li>
                        ))}
                </ul>
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

    const comboboxStyles = {}
    const menuStyles = {}
    

    function handleSelectedTagsChange() {

    }
    function DropdownCombobox( {selectedItems} ) {
        const [inputItems, setInputItems] = React.useState(tags)
        const {
          isOpen,
          getToggleButtonProps,
          getLabelProps,
          getMenuProps,
          getInputProps,
          highlightedIndex,
          getItemProps,
        } = useCombobox({
          items: inputItems,
          onSelectedItemChange: ({selectedItem}) => {
            if (!selectedItem) {
              return
            }
            const index = selectedItems.indexOf(selectedItem)
            if (index > 0) {
              setSelectedTags([
                ...selectedItems.slice(0, index),
                ...selectedItems.slice(index + 1),
              ])
            } else if (index === 0) {
              setSelectedTags([...selectedItems.slice(1)])
            } else {
              setSelectedTags([...selectedItems, selectedItem])
            }
          },
          selectedItem: null,
          stateReducer: (state, actionAndChanges) => {
            const {changes, type} = actionAndChanges
            switch (type) {
              case useCombobox.stateChangeTypes.InputKeyDownEnter:
              case useCombobox.stateChangeTypes.ItemClick:
                return {
                  ...changes,
                  isOpen: true, // keep menu open after selection.
                  highlightedIndex: state.highlightedIndex,
                  inputValue: '', // don't add the item string as input value at selection.
                }
              case useCombobox.stateChangeTypes.InputBlur:
                return {
                  ...changes,
                  isOpen: true,
                  inputValue: '', // don't add the item string as input value at selection.
                }
              default:
                return {
                    ...changes,
                    isOpen: true
                }
            }
          },
          onInputValueChange: ({inputValue}) => {
            setInputItems(
              tags.filter((item) =>
                item.toLowerCase().startsWith(inputValue.toLowerCase()),
              ),
            )
          },
        })
        const placeholderText = selectedItems.length
          ? `${selectedItems.length} tags selected`
          : 'elements'
        return (
          <div>
            <label {...getLabelProps()}>Choose tags:</label>
            <div style={comboboxStyles}>
              <input placeholder={placeholderText} {...getInputProps()} />
              <button
                type="button"
                {...getToggleButtonProps()}
                aria-label="toggle menu"
              >
                &#8595; a
              </button>
            </div>
            <div {...getMenuProps()} style={menuStyles}>
              {isOpen &&
                inputItems.map((item, index) => (
                  <div
                    style={
                      highlightedIndex === index ? {backgroundColor: 'blue'} : {}
                    }
                    key={`${item}${index}`}
                    {...getItemProps({
                      item,
                      index,
                      'aria-selected': selectedItems.includes(item),
                    })}
                  >
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item)}
                      value={item}
                      onChange={() => null}
                    />
                    <span />
                    {item}
                  </div>
                ))}
            </div>
          </div>
        )
      }
    /*
    * ..:: TAGS FILTER END ::.. 
    */


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
                <CountrySelect />
                <DropdownCombobox selectedItems={selectedTags}/>
            </div>
            <h1>Vendors List</h1>
            <p>Here you will find list of shops that you can filter through by:</p>
            {filteredArr.map((v, index) => {
                return (
                    <SingleVendor
                        name={v.name}
                        sponsor={v.sponsor}
                        desc={v.description}
                        country={v.country}
                        tags={v.tags.split(", ")}
                        coupon={v.coupon}
                        key={`${v.name}${index}`}
                    />)
            })}
        </div>
    )
}