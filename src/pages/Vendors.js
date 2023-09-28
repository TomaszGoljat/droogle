import axios from "axios"
import React from "react"
import { useEffect } from "react"



export default function Vendors() {

    const [vendorArr, setVendorArr] = React.useState(require("../data/vendors.json"))

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
            {props.tags.map(tag => <div className="singleVendor--tag">{tag}</div>)}
        </div>
        <div className="singleVendor--couponBox">
            {props.coupon === "" ? "" : <span>{props.coupon}</span>}
        </div>
    </div>
    )
   } 


    return (
        <div className="vendors--div">
            <h1>Vendors List</h1>
            {console.log(vendorArr[0].name)}
            <p>Here you will find list of shops that you can filter through by:</p>
            {vendorArr.map(v => {return (
            <SingleVendor name={v.name} 
            sponsor={v.sponsor}
            desc = {v.description}
            country = {v.country}
            tags = {v.tags.split(", ")}
            coupon = {v.coupon}
            />)})}
        </div>
    )
}