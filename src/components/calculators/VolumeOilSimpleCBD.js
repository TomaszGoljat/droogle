import React, { useEffect } from "react"
import { Link } from "react-router-dom"

export default function VolumeOilSimpleCBD() {

    const [strength, setStrength] = React.useState(50)
    const [volume, setVolume] = React.useState(5)
    const [result, setResult] = React.useState([0, 0])

    const StrengthButton = (props) => {
        return (<div className="tools--button"
            onClick={() => props.handler(props.value)}
            style={props.value === strength ? { backgroundColor: "blue" } : {}}
            key={props.value}>
            {props.value}mg
        </div>
        )
    }

    const VolumeButton = (props) => {
        return (<div className="tools--button"
        onClick={() => props.handler(props.value)}
            style={props.value === volume ? { backgroundColor: "blue" } : {}}
            key={props.value}>
            {props.value}ml
        </div>)
    }

    useEffect(() => {
        setResult([strength/volume, (strength/volume)/20])
    }, [strength, volume])

    const strengthArray = [50, 100, 200, 500, 1000, 2000];
    const volumeArray = [5, 10, 20, 30, 50, 100];

    return (
        <div className="VOSCBD--div">
            <h2 className="tools--label">oil strength calculator</h2>
            <div className="VOSCBD--columns">
            <div>
                <h2>Strength</h2>
                {strengthArray.map(value => <StrengthButton value={value} handler={setStrength} />)}
            </div>
            <div>
                <h2>Volume</h2>
                {volumeArray.map(value => <VolumeButton value={value} handler={setVolume} />)}
            </div>
            </div>
            <div className="VOSCBD--result">
                <p>{result[0].toFixed(2)}mg <span>per ml</span></p>
                <p>{result[1].toFixed(2)}mg <span>per drop</span></p>
            </div>
        <div className="tool--linkDiv">
            <p style={{margin: "0 0 10px 0"}}>Product strength and volume not here?</p>
            <Link to='/tools/volume-calc-advanced' className="tool--link" style={{color: "orange"}}>Check Advanced Volume Calculator</Link>
        </div>
        </div>
    )
}