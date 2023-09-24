import React, { useEffect } from "react";

export default function VolumeOilAdvancedCBD() {

    const [tempStrength, setTempStrength] = React.useState(0)
    const [tempVolume, setTempVolume] = React.useState(0)
    const [unit, setUnit] = React.useState('ml')

    const [strength, setStrength]  = React.useState(0)
    const [volume, setVolume] = React.useState(0)

    const [result, setResult] = React.useState([0, 0]) // [mg per ml, mg per drop]

    function grabStrength(event) {
        setTempStrength(event.target.value)
    }

    function grabVolume(event) {
        setTempVolume(event.target.value)
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setStrength(tempStrength)
            unit === 'ml' ? setVolume(tempVolume) : setVolume(Math.round(tempVolume/28.4))
        }, 200)
        return () => clearTimeout(timeoutId)
    }, [tempStrength, tempVolume, unit])

    useEffect(() => {
        setResult([(strength/volume).toFixed(2),((strength/volume)/20).toFixed(2)])
    }, [strength, volume])


    return (
        <div className="VOACBD--div">
            <h2 className="tools--label">oil strength calculator</h2>
            <div className="VOACBD--inputs">
                <div className="VOACBD--input">
                    Strength: 
                    <div>

                    <input type="number"
                    id="strength"
                    name="strength"
                    onChange={grabStrength}
                    value={tempStrength}
                    min={0}
                    className="tools--weightInput"
                    />
                    <span className="tools--unit" style={{backgroundColor: "blue"}} >mg</span>
                    </div>
                    </div>
                <div className="VOACBD--input">
                    Volume:
                    <div>
                    <input type="number"
                    id="volume"
                    name="volume"
                    onChange={grabVolume}
                    value={tempVolume}
                    min={0}
                    className="tools--weightInput"
                    />
                    <span className="tools--unit"
                    onClick={() => setUnit('ml')}
                    style={unit === 'ml' ? {backgroundColor: "blue"} : {}}>ml</span>                   
                    <span className="tools--unit"
                    onClick={() => setUnit('oz')}
                    style={unit === 'oz' ? {backgroundColor: "blue"} : {}}>oz</span>                   
                    </div>
                </div>
                <div className="VOACBD--input"></div>
            </div>
            <div className="VOACBD--result">
            <p>{result[0]}mg per ml</p>
            <p>{result[1]}mg per drop</p>
            </div>
        </div>
    )
}