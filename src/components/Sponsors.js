import React from "react";
import Marquee from "react-fast-marquee";

export default function Sponsors() {

    const Sponsor = (props) => {
        return (
            <a href={props.url}>
                <div className="sponsor--div">
                    <p className="sponsor--title">{props.title}</p>
                </div>
            </a>
        )
    }

    return (
        <div className="sponsors">
            <div className="sponsors--supporters">Supporters: </div>
            <Marquee pauseOnHover={true} autoFill={true} speed={30} gradient={true} gradientColor={[0, 0, 139]} gradientWidth="5vw" className="sponsors--marquee">
                <Sponsor title="Visit our support page!" url="https://unharmed.info/support" description="Shop at Zamnesia.com" />
                <Sponsor title="Here you will find names of our supporters!" url="https://unharmed.info/support" description="Shop at Zamnesia.com" />
            </Marquee>
        </div>
    )
}