  // Erowid:
    
    const Erowid = (props) => {
        return (
            <a href={`https://www.erowid.org/${props.link}`} target="_blank" rel="noreferrer">
            <div className="erowid--singleResult">
                {props.title}
                <hr className="erowid--hr" />
                <p className="erowid--description">{props.description}</p>
            </div></a>
        )
    }

export default Erowid;