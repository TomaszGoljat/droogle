import PetCBD from "../../components/calculators/PetCBD";
import VolumeOilAdvancedCBD from "../../components/calculators/VolumeOilAdvancedCBD";
import VolumeOilSimpleCBD from "../../components/calculators/VolumeOilSimpleCBD";


export default function Cbd() {
    return (
        <div className="cbd--div">
            <PetCBD />
            <VolumeOilSimpleCBD />
            <VolumeOilAdvancedCBD />
        </div>
    )
}