import React, { useEffect } from "react";

export default function PlateauDXM() {

    const [tempWeight, setTempWeight] = React.useState(0)
    const [unit, setUnit] = React.useState('kg')

    const [weight, setWeight] = React.useState(0)
    // result [plateau][min, max, usenet]:
    const [result, setResult] = React.useState([[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]])

    function grabWeight(event) {
        unit === 'kg' ? setTempWeight(event.target.value) : setTempWeight(Math.round(event.target.value*0.45))
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setWeight(tempWeight)
        }, 200)
        return () => clearTimeout(timeoutId)
    }, [tempWeight, unit])


    useEffect(() => {
        function calculate() {
            const plat1 = [weight*1.5, weight*2.5, weight*2.7]
            const plat2 = [weight*2.5, weight*7.5, weight*6.4]
            const plat3 = [weight*7.5, weight*15, weight*9.4]
            const plat4 = [weight*15, weight*20, weight*18]
            const updatedResults = unit === 'kg' ? [plat1, plat2, plat3, plat4] : 
            [plat1.map(w => w*0.45), plat2.map(w => w*0.45), plat3.map(w => w*0.45), plat4.map(w => w*0.45)]
            //setResult(prevResults => prevResults.map((r, i) =>  updatedResults[i]))
            setResult(updatedResults)
        }
        calculate()
    }, [weight, unit])

    return (
        <div className="pDXM--div">
            <h2 className="tools--label">DXM plateau calculator</h2>
            <div className="pDXM--input">
                Weight:
                <div>
                <input type="number"
                    className="tools--weightInput"
                    min={0}
                    onChange={grabWeight} />
                    <span className="tools--unit"
                        onClick={() => setUnit('kg')}
                        style={unit === 'kg' ? { backgroundColor: "blue" } : {}}>kg</span>
                    <span className="tools--unit"
                        onClick={() => setUnit('lb')}
                        style={unit === 'lb' ? { backgroundColor: "blue" } : {}}>lb</span>
                </div>
            </div>
            <div className="pDXM--results">
                <div></div>
                <div>min</div>
                <div>max</div>
                <div>usenet*</div>
                <div>1st plateau</div>
                <div>{Math.round(result[0][0])}mg</div>
                <div>{Math.round(result[0][1])}mg</div>
                <div>{Math.round(result[0][2])}mg</div>
                <div>2nd plateau</div>
                <div>{Math.round(result[1][0])}mg</div>
                <div>{Math.round(result[1][1])}mg</div>
                <div>{Math.round(result[1][2])}mg</div>
                <div>3rd plateau</div>
                <div>{Math.round(result[2][0])}mg</div>
                <div>{Math.round(result[2][1])}mg</div>
                <div>{Math.round(result[2][2])}mg</div>
                <div>4th plateau</div>
                <div>{Math.round(result[3][0])}mg</div>
                <div>{Math.round(result[3][1])}mg**</div>
                <div>{Math.round(result[3][2])}mg</div>
            </div>
        </div>
    )
}