 // DuckDuckGo:
    // Currently: DMT-nexus, Blue-light
    
const DuckDuckGo = (props) => {
        return (
<a href={`https://${props.link}`} target="_blank" rel="noreferrer">
            <div className="ddg--singleResult">
                {props.title}
                <p className="ddg--description">{props.description}</p>
            </div></a>
        )
    }

export default DuckDuckGo;