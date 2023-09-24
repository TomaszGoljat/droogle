import React, { useEffect } from "react"

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
                <p>{result[0]}mg per ml</p>
                <p>{result[1]}mg per drop</p>
            </div>
        <div className="VOSCBD--goToAdvDiv">
            <p>Product strength and volume not here?</p>
            <h2>Go to Advanced Calculator</h2>
        </div>
        </div>
    )
}