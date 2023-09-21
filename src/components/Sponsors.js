import React from "react";
import Marquee from "react-fast-marquee";

export default function Sponsors() {

    const Sponsor = (props) => {
        return (
            <a href={props.url}>
                <div className="sponsor--div">
                    <p className="sponsor--title">{props.title}</p>
                    <p className="sponsor--desc">{props.description ? props.description : "Supporter"}</p>
                </div>
            </a>
        )
    }

    return (
        <div className="sponsors">
            <div className="sponsors--supporters">Supporters: </div>
            <Marquee pauseOnHover={true} autoFill={true} speed={30} gradient={true} gradientColor={[0, 0, 139]} gradientWidth="5vw" className="sponsors--marquee">
                <Sponsor title="Zamnesia" url="zamnesia.com" description="Shop at Zamnesia.com" />
                <Sponsor title="Azarius" url="zamnesia.com" description="Shop at Azarius.com" />
                <Sponsor title="Elon Musk" url="zamnesia.com" description="Buy Tesla" />
                <Sponsor title="Pan Tadeusz" url="zamnesia.com" description="" />
                <Sponsor title="Bisz" url="zamnesia.com" description="Deus Ex Machina" />
            </Marquee>
        </div>
    )
}