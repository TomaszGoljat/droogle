// Shroomery:
   // resultsTable[title, title-url, subforum, subforum-url, date]
   const Shroomery = (props) => {
        const shroomeryDate = -Math.round((Date.parse(props.date) - Date.now()) / (1000 * 60 * 60 * 24))
       return (
        <div className="shroomery--singleResult">
           <a href={props.link} className="shroomery--link" target="_blank" rel="noreferrer">
            <div className="shroomery--title">{props.title}</div></a>
            <hr className="shroomery--hr"/>
            <div className="shroomery--secondRow">posted {shroomeryDate} days ago in 
            <a href={props.subforumUrl}>{props.subforum}</a></div>
        </div>
           )
        }

export default Shroomery;