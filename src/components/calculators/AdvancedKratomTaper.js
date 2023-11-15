import React, {useEffect} from "react";
import styles from "./AdvancedKratomTaper.module.css";

function AdvancedKratomTaper() {
    const [dosage, setDosage] = React.useState(0)
    const [tempDosage, setTempDosage] = React.useState(0)
    const [pattern, setPattern] = React.useState("easier")
    const [schedule, setSchedule] = React.useState([])
    const [cycle, setCycle] = React.useState(7)


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
        for(var i = index; i <= scheduleArr.length; i++) {
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
        console.log('first', dosageArr)
        var singleDosage
        if(dose % amount == 0) {
            singleDosage = dose / amount
            dosageArr.fill(singleDosage)
        } else {
            var reminder = dose % amount;
            console.log('reminder', reminder)
            singleDosage = (dose - reminder) / amount
            dosageArr.fill(singleDosage)
            if(reminder == singleDosage) {
                if(reminder % 2 == 0) {
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

    console.log(splitDose(9, 3))
}

export default AdvancedKratomTaper;