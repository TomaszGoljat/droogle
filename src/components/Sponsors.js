import React from "react";
import Marquee from "react-fast-marquee";

export default function Sponsors() {

    const Sponsor = (props) => {
        return (
            <a href={props.url}>
                <div className="sponsor--div">
                    <p className="sponsor--desc">{props.desc}</p>
                    <p className="sponsor--title">{props.title}</p>
                </div>
            </a>
        )
    }

    return (
        <div className="sponsors">
            <div className="sponsors--supporters">Info: </div>
            <Marquee pauseOnHover={true} autoFill={true} speed={30} gradient={true} gradientColor={[0, 0, 139]} gradientWidth="5vw" className="sponsors--marquee">
                <Sponsor title="new tool: Kratom Taper" url="https://ko-fi.com/post/New-tool-on-website-Kratom-Taper-R5R6QR169" desc="4th of November"/>
                <Sponsor title="ko-fi page" url="https://ko-fi.com/unharmed" desc="accepting donations on:"/>
            </Marquee>
        </div>
    )
}