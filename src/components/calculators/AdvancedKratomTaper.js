import React, {useEffect} from "react";
import styles from "./AdvancedKratomTaper.module.css";
import all, { DailyDosageBox, NoData, PatternChooser } from "./kratomTaper/TaperComponents"

function AdvancedKratomTaper() {
    const [dosage, setDosage] = React.useState(0)
    const [tempDosage, setTempDosage] = React.useState(0)
    const [pattern, setPattern] = React.useState("easier")
    const [schedule, setSchedule] = React.useState([])
    const [cycle, setCycle] = React.useState(7)
    const [split, setSplit] = React.useState(5)
    // State: pregen; gen, error
    const [state, setState] = React.useState('pregen')


    useEffect(() => {
        if(state === 'gen') {
            setSchedule(createSchedule(dosage, pattern, cycle))
        }
    }, [pattern, dosage, cycle])

    useEffect(() => {
        const timeoutId = setTimeout(() => setDosage(tempDosage * 10), 100)
        return () => clearTimeout(timeoutId)
    }, [tempDosage])

    function grabDosage(event) {
        setTempDosage(event.target.value)
    }

    function createSchedule(dosage, pattern, cycle) {
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
                    if((lastWeek - currentWeek) < 10) {
                        i = (lastWeek - 10)

                        scheduleArr.push(...createCycle(i, cycle))
                    } else {
                        scheduleArr.push(...createCycle(currentWeek, cycle))
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
                    if((lastWeek - currentWeek) < 10) {
                        i = (lastWeek - 10)
                        scheduleArr.push(i)
                    } else {
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
                    if((lastWeek - currentWeek) < 10) {
                        i = (lastWeek - 10)
                        scheduleArr.push(i)
                    } else {
                        scheduleArr.push(currentWeek)
                    }
                }
                    weeks += 1
                break;
        }
        return scheduleArr
    }

    // How many days left:
    function daysLeft(scheduleArr, index) {
        return scheduleArr.length - index;
    }

    // current day: array index + 1;

    // Kratom consumed so far
    // Returns integer
    function kratomSoFar(scheduleArr, index) {
        var sum = 0;
        for(var i = 0; i <= index; i++) {
            sum += scheduleArr[i]
        }
        return sum
    }

    // Kratom left to be consumed
    // Return integer
    function kratomLeft(scheduleArr, index) {
        var sum = 0;
        for(var i = index+1; i < scheduleArr.length; i++) {
            console.log("here", scheduleArr[i])
            sum += scheduleArr[i]
        }
        return sum
    }

    // Total required Kratom
    function kratomTotal(scheduleArr) {
        return scheduleArr.reduce((t,c) => t+c, 0)
    }

    // Splitting the dose through the day
    // Returns array
    function splitDose(dose, amount) {
        // create dosage array and fill it with zeros
        const dosageArr = Array(amount).fill(0)
        var singleDosage
        if(dose % amount === 0) {
            singleDosage = dose / amount
            dosageArr.fill(singleDosage)
        } else {
            var reminder = dose % amount;
            singleDosage = (dose - reminder) / amount
            dosageArr.fill(singleDosage)
            if(reminder === singleDosage) {
                if(reminder % 2 === 0) {
                    dosageArr[0] = singleDosage + (reminder / 2)
                    dosageArr[dosageArr.length -1] = singleDosage + (reminder / 2)
                }
            } else
            dosageArr[dosageArr.length - 1] = singleDosage + reminder
        }
        return dosageArr
    }
    
    // Filling whole cycle (3, 5, 7)
    
    function createCycle(dose, cycle) {
        const cycleArray = []
        for(var i = 1; i <= cycle; i++) {
            cycleArray.push(dose)
        }
        return cycleArray;
    }
    
    // RENDERING RESULTS:
    const SingleDay = (props) => {
        return (
            <div className={styles.singleDay}>
               <h2 className={styles.day}>Day {props.index + 1} </h2>
               {splitDose(props.dosage, split).map((d,i) =>  
               <RenderSplitDosage d={d} i={i}/> )}
               <p className={styles.dailyTotal}><span>daily total: </span>{props.dosage / 10}g</p>
               <div className={styles.calculations}>
                <h4 className={styles.calculationsTitle}>Kratom</h4>
                    <span>used: </span>
                    {kratomSoFar(schedule, props.index) /10}g / {kratomTotal(schedule) / 10}g
                    <span>still required: </span>
                    {kratomLeft(schedule, props.index) / 10}g
                </div>
            </div>
        )
    }

    const Results = (props) => {
        return (
            <div></div>
        )
    }

    const RenderSplitDosage = (props) => {
        return (
            <div className={styles.splitDoseMain}>
                <p>Dose # {props.i+1}: {props.d/10}g </p><div className={styles.checkbox}></div>
            </div>
        )
    }

    // ..:: CONSOLE LOGS - START ::..
    //console.log(schedule)
    // ..:: CONSOLE LOGS - END ::..
    
    
    return (
        <div className={styles.main}>
            <DailyDosageBox grabDosage={grabDosage} tempDosage={tempDosage} />
            <PatternChooser setPattern={setPattern} />
            <div className={styles.schedule}>
            {schedule.length > 0 ? schedule.map((d,i) => <SingleDay index={i} dosage={d} />) : <NoData />}
            </div>
    </div>
)
}
export default AdvancedKratomTaper;