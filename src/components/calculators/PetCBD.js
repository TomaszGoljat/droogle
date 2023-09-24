import React, { useEffect } from "react"

export default function PetCBD() {

    const [tempWeight, setTempWeight] = React.useState(0)
    const [weight, setWeight] = React.useState(0)
    const [weightUnit, setWeightUnit] = React.useState('kg')
    const [result, setResult] = React.useState([0, 0, 0, 0])

    function grabWeight(event) {
        setTempWeight(event.target.value)
    }

    // Preventing negative weight:
    useEffect(() => {
        tempWeight <= -1 ? setTempWeight(0) : setTempWeight(tempWeight)
    }, [tempWeight])

    useEffect(() => {
        const timeoutId = setTimeout(() => setWeight(tempWeight), 100)
        return () => clearTimeout(timeoutId)
    }, [tempWeight])
    

    useEffect(() => {
    function calculate() {
        const multiplier = weightUnit === 'kg' ? [5, 45, 125, 500] : [2.5, 22, 60, 250] // [0.05mg/kg, 0.45mg/kg, 1.25mg/kg, 5mg/kg]
        setResult([weight*multiplier[0]/100,weight*multiplier[1]/100,weight*multiplier[2]/100,weight*multiplier[3]/100])
    }
    calculate()
    }, [weight, weightUnit])
    

    return (
        <div className="petCBD--div">
            <h2 className="tools--label">CBD dosage calculator for pets:</h2>
            <div className="petCBD--weightDiv">
                <label htmlFor="weight">Weight:</label>
                <div className="tools--weightDiv">
                    <span className="tools--button" onClick={() => setTempWeight(prevWeight => prevWeight + 1)}>+</span>
                    <input type="number" 
                    id="weight" 
                    name="weight" 
                    className="tools--weightInput" 
                    onChange={grabWeight} 
                    value={tempWeight}
                    min={0}
                    />
                    <span className="tools--button" onClick={() => setTempWeight(prevWeight => prevWeight - 1)}>-</span>
                </div>
                <span className="tools--button" onClick={() => setWeightUnit('kg')} style={weightUnit === 'kg' ? {backgroundColor: "blue"} : {}}>kg</span>
                <span className="tools--button" onClick={() => setWeightUnit('lb')} style={weightUnit === 'lb' ? {backgroundColor: "blue"} : {}}>lb</span>
            </div>
            <div className="petCBD--results">
                <div className="petCBD--singleResult">
                    <span className="petCBD--resultMinimum">Minimum:</span><span> {result[0]}mg</span>
                </div>
                <div className="petCBD--singleResult">
                    <span className="petCBD--resultMedium">Average:</span><span> {result[1]}mg</span>
                </div>
                <div className="petCBD--singleResult">
                    <span className="petCBD--resultStrong">Strong:</span><span> {result[2]}mg</span>
                </div>
                <div className="petCBD--singleResult">
                    <span className="petCBD--resultMaximum">Maximum:</span><span> {result[3]}mg</span>
                </div>
            </div>
            {console.log(tempWeight, weight, weightUnit, result)}
        </div>
    )
}