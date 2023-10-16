 // DuckDuckGo:
    // Currently: DMT-nexus, Blue-light
    
const DuckDuckGo = (props) => {
        const link = props.link.slice(0,4) + "old." + props.link.slice(4)
        return (
<a href={`https://${props.link}`} target="_blank" rel="noreferrer">
            <div className="ddg--singleResult">
                {props.title}
                <p className="ddg--description">{props.description}</p>
            </div></a>
        )
    }

export default DuckDuckGo;