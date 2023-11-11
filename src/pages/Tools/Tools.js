import { Link } from "react-router-dom";
import styles from "./Tools.module.css"


export default function Tools() {

    /* Object template:
    {
        name: "",
        description: "",
        tags: [""],
        path: ""
    }
    */

    const toolsArray = [
        {
            name: "CBD dosage calculator for pets",
            description: "Input your pet weight and calculate CBD dosage.",
            tags: ["cbd", "pet", "calculator", "dosage"],
            path: "cbd-dose-for-pets"
        },
        {
            name: "simple oil strength calculator",
            description: "Choose strength and volume of your oil to calculate mg per ml and per drop.",
            tags: ["cannabinoids", "oil", "calculator", "dosage"],
            path: "volume-calc-simple"
        },
        {
        name: "advanced oil strength calculator",
        description: "Input strength and volume of your oil to calculate mg per ml and per drop.",
        tags: ["cannabinoids", "oil", "calculator", "dosage"],
        path: "volume-calc-advanced"
        },
        {
            name: "kratom taper schedule generator",
            description: "Provide your current daily dose to generate taper schedule and quit Kratom.",
            tags: ["kratom", "addiction", "quitting"],
            path: "kratom-taper"
        },
        {
        name: "DXM plateau calculator",
        description: "Input your weight and calculate DXM dosage (in mg) required to reach each plateau.",
        tags: ["dxm", "dosage", "calculator"],
        path: "dxm-plateau-calc"
        }

    ]

    const ToolLink = (props) => {
        const {name, description, tags, path} = props.toolObj
        return (
            <Link to={`/tools/${path}`} className="tool--link">
                <div className="tool--linkDiv">
                    <span className="tool--linkName">{name}</span>
                    <span className="tool--linkDesc">{description}</span>
                </div>
            </Link>
        )
    }
    return (
        <div className={styles.main}>
            {toolsArray.map(tool => <ToolLink toolObj={tool} />)}
        </div>
    )
}