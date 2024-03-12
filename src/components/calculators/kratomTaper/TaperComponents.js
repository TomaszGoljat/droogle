import styles from "./TaperComponents.module.css"



/*
..:: SIMPLE TAPER ::..
*/

/* 
WeekLine - rendering single row.
    Props:
        # week - int, week number
        # dosage - int, dosage to be divided by 10
    Render:
        [align-left] Week # <---> xx g [align-right]
Nov 23
*/

export function WeekLine(props) {
return (
            <>
                <div className={styles.row}>Week {props.week} </div>
                <div className={styles.row} style={{textAlign: "right"}}>{props.dosage / 10} g</div>
            </>
        )
}

/* 
..:: COMMON ::..
*/

/*
Disclaimer - rendering disclaimer. 
    Props:
        # type - string, "simple" or "advanced"
    Render:
        3 paragraphs wrapped in single div
Nov 23
*/

export function Disclaimer(props) {
    const paragraphs = []
    switch (props.type) {
        default:
        case "simple":
            paragraphs.push(<p>For more information about this calculator read <a href="https://ko-fi.com/post/New-tool-on-website-Kratom-Taper-R5R6QR169" className={styles.link} target="_blank" rel="noreferrer">this post</a>.</p>)
            // TODO: Add link to advanced calculator.
        break;
        case "advanced":
            // TODO: Change link to different post. 
            paragraphs.push(<p>For more information about this calculator read <a href="https://ko-fi.com/post/New-tool-on-website-Kratom-Taper-R5R6QR169" className={styles.link} target="_blank" rel="noreferrer">this post</a>.</p>)
        break;
        }
        paragraphs.push(<p>Good luck, you can do it!</p>)
        paragraphs.push(<p>Stay unharmed.</p>)

    return (
    <div className={styles.disclaimer}>
       {paragraphs.map(p => p)} 
    </div>
   )}

/*
NoData - render this when dosage is not set.
        Render:
        Single paragraph
Nov 23
*/
   
   export function NoData() {
    return <p className={styles.disclaimer}> Please provide your daily dosage </p>
}


/*
DailyDosageBox - rendering input box and label for daily dosage.
    Props:
        # grabDosage
        # tempDosage
    Render:
        Label and number input field wrapped in single div
Nov 23
*/

export function DailyDosageBox(props) {
    return(
            <div className={styles.inputBox}>
                Your current daily dosage
                <input 
                type="number"
                id="dosage"
                name="dosage"
                className={styles.dosageInput}
                onChange={props.grabDosage}
                value={props.tempDosage}
                min={0}
                max={100} /> g
            </div>
    )
}

/* 
PatternChooser - rendering buttons for pattern choice
    Props:
    # setPattern
    Render:
    h3 laber followed by 3 buttons
*/

export function PatternChooser(props) {
    return ( 
        <>
            <h3 className={styles.patternsLabel}>
                Choose preffered taper pattern:
            </h3>
            <div className={styles.patterns}>
                <button className={styles.easyBTN} onClick={() => props.setPattern("easier")}>Easier</button>
                <button className={styles.regularBTN} onClick={() => props.setPattern("regular")}>Regular</button>
                <button className={styles.hardBTN} onClick={() => props.setPattern("harder")}>Harder</button>
            </div>
        </> 
        )
}


export function GenerateBtn(props) {
    return <button className={styles.generateBTN} onClick={() => props.setState("gen")}>Generate</button>
}