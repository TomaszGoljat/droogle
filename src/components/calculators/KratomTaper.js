import React from "react";

function KratomTaper() {

    const [dosage, setDosage] = React.useState(0)
    const [tempDosage, setTempDosage] = React.useState(0)
    const [pattern, setPattern] = React.useState("easier")

    console.log("Current pattern: ", pattern);

    function createScheduleArr(dosage, pattern) {
        const scheduleArr = []
        let firstWeek = Math.ceil(dosage / 3 * 2);
        scheduleArr.push(firstWeek);
        switch (pattern) {
            case "easier":

                break;
            case "regular":

                break;
            case "harder":

                break;
            default:
                break;
        }
        console.log("Current array: ", scheduleArr)
        return scheduleArr
    }

    function howManyWeeks(dosage, pattern) {
        let weeks = 0;
        const scheduleArr = []
        switch (pattern) {
            case "easier":
                for (let i = dosage; i >= 25; i = i * 0.95) {
                    weeks += 1;
                    scheduleArr.push(Math.ceil(i) / 10)
                }
                break;
            case "regular":
                for (let i = Math.ceil(dosage / 4 * 3); i >= 25; i = i * 0.95) {
                    if (scheduleArr.length > 0) {
                    if (-(scheduleArr[scheduleArr.length -1] - i) >= 10) {
                        console.log("higher than 1g")
                        scheduleArr.push(Math.ceil(i) / 10)
                    } else {
                        scheduleArr.push(scheduleArr[scheduleArr.length -1] - 1)
                        i = (scheduleArr[scheduleArr.length -1] - 1) * 10; 
                    }
                    } else {
                        scheduleArr.push(Math.ceil(i) / 10)
                    }

                    weeks += 1;
                }
                break;
            case "harder":
                for (let i = Math.ceil(dosage / 3 * 2); i >= 25; i = i * 0.9) {
                    weeks += 1;
                    scheduleArr.push(Math.floor(i) / 10)
                }
                break;
        }

        console.log(weeks)
        console.log(scheduleArr)
    }

    howManyWeeks(500, pattern)

    createScheduleArr(50, pattern)
    return (
        <div className="KT--div">
            <div className="KT--inputBox">
                Current dosage in grams
                <input className="KT--input"></input>
                <p>Tool is designed to work for daily dosages between 5 and 75 grams.
                    For higher dosages, please consult r/quittingkratom . </p>
            </div>
            <div className="KT--patterns">
                <button className="KT--easy" onClick={() => setPattern("easier")}>Easier</button>
                <button className="KT--regular" onClick={() => setPattern("regular")}>Regular</button>
                <button className="KT--harder" onClick={() => setPattern("harder")}>Harder</button>
            </div>
            <div className="KT--results">

            </div>
        </div>
    )
}

export default KratomTaper;