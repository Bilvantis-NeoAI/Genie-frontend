import { headerTextSamples } from "../utils/constatnts"

export function HeaderComponent() {
    return (<>
        <div className="w-100 h-100 d-flex justify-content-center align-items-center header-style">
            <span className="header-text">{headerTextSamples.SOLAR_WINDS}</span>
        </div>
    </>
    )
}