import React, { useEffect } from "react";
import styles from "./KratomTaper.module.css"

function KratomTaper() {

    const [dosage, setDosage] = React.useState(0)
    const [tempDosage, setTempDosage] = React.useState(0)
    const [pattern, setPattern] = React.useState("easier")
    const [schedule, setSchedule] = React.useState([])

    console.log("Current pattern: ", pattern);

    useEffect(() => {
        setSchedule(createSchedule(dosage, pattern))
        console.log(schedule)
    }, [pattern, dosage])

    useEffect(() => {
        const timeoutId = setTimeout(() => setDosage(tempDosage * 10), 100)
        return () => clearTimeout(timeoutId)
    }, [tempDosage])

    function grabDosage(event) {
        setTempDosage(event.target.value)
    }

    function createSchedule(dosage, pattern) {
        let weeks = 0;
        const scheduleArr = []
        let lastWeek;
        let currentWeek;
        switch (pattern) {
            case "easier":
                for (let i = dosage; i >= 15; i = i * 0.95) {
                    if (scheduleArr.length > 0) {
                        lastWeek = scheduleArr[scheduleArr.length - 1]
                    } else {
                        lastWeek = i;
                    }
                    currentWeek = Math.ceil(i)
                    console.log(lastWeek, currentWeek)
                    if((lastWeek - currentWeek) < 10) {
                        console.log("lower than 1g")
                        i = (lastWeek - 10)
                        scheduleArr.push(i)
                    } else {
                        console.log("higher than 1g")
                        scheduleArr.push(currentWeek)
                    }
                    weeks += 1
                }

                break;
            case "regular":
                for (let i = Math.ceil(dosage / 4 * 3); i >= 15; i = i * 0.95) {
                    if (scheduleArr.length > 0) {
                        lastWeek = scheduleArr[scheduleArr.length - 1]
                    } else {
                        lastWeek = i;
                    }
                    currentWeek = Math.ceil(i)
                    console.log(lastWeek, currentWeek)
                    if((lastWeek - currentWeek) < 10) {
                        console.log("lower than 1g")
                        i = (lastWeek - 10)
                        scheduleArr.push(i)
                    } else {
                        console.log("higher than 1g")
                        scheduleArr.push(currentWeek)
                    }

                    weeks += 1;
                }
                break;
            case "harder":
                for (let i = Math.ceil(dosage / 3 * 2); i >= 15; i = i * 0.9) {
                    if (scheduleArr.length > 0) {
                        lastWeek = scheduleArr[scheduleArr.length - 1]
                    } else {
                        lastWeek = i;
                    }
                    currentWeek = Math.ceil(i)
                    console.log(lastWeek, currentWeek)
                    if((lastWeek - currentWeek) < 10) {
                        console.log("lower than 1g")
                        i = (lastWeek - 10)
                        scheduleArr.push(i)
                    } else {
                        console.log("higher than 1g")
                        scheduleArr.push(currentWeek)
                    }
                }
                    weeks += 1
                break;
        }
        return scheduleArr
    }

    const WeekLine = (props) => {
        return (
            <>
                <div className={styles.row}>Week {props.week} </div>
                <div className={styles.row} style={{textAlign: "right"}}>{props.dosage / 10} g</div>
            </>
        )
    }

   const Results = () => {
    return (
    <>
    <h3 className={styles.chosenPattern}>Pattern: <span style={{color: "orange"}}>{pattern}</span></h3>
<div className={styles.results}>
                <div className={styles.header}></div>
                <div className={styles.header} style={{textAlign: "right"}}>dosage</div>
                {schedule.length > 0 ? schedule.map((line, i) => <WeekLine week={i+1} dosage={line} />) : "Choose Pattern"}
                <div className={styles.lastRow} style={{textAlign: "right"}}>Well</div>
                <div className={styles.lastRow} style={{textAlign: "left"}}>Done</div>
            </div>
            <br />
            <Disclaimer />
            </>
    )
   } 

   const NoData = () => {
    return <p className={styles.noData}>Please provide your daily dosage</p>
   }


   const Disclaimer = () => {
    return (
    <div className={styles.disclaimer}>
        <p>For more information about this calculator read <a href="https://ko-fi.com/post/New-tool-on-website-Kratom-Taper-R5R6QR169" className={styles.link} target="_blank" rel="noreferrer">this post</a>.</p>
        <p>Good luck, you can do it!</p>
        <p>Stay unharmed.</p>
    </div>
   )}

    return (
        <div className={styles.main}>
            <h2 className="tools--label">
                kratom taper
            </h2>
            <br />
            <div className={styles.inputBox}>
                Your current daily dosage
                <input 
                type="number"
                id="dosage"
                name="dosage"
                className={styles.dosageInput}
                onChange={grabDosage}
                value={tempDosage}
                min={0}
                max={100} /> g
            </div>
            <h3 className={styles.patternsLabel}>
                Choose preffered taper pattern:
            </h3>
            <div className={styles.patterns}>
                <button className={styles.easyBTN} onClick={() => setPattern("easier")}>Easier</button>
                <button className={styles.regularBTN} onClick={() => setPattern("regular")}>Regular</button>
                <button className={styles.hardBTN} onClick={() => setPattern("harder")}>Harder</button>
            </div>
            {schedule.length > 0 ? <Results /> : <NoData />}      
            
        </div>
    )
}

export default KratomTaper;