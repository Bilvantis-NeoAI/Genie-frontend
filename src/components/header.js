import { headerTextSamples } from "../utils/constatnts"
import { useNavigate } from "react-router-dom";


export function HeaderComponent() {

    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem("access_token");

        navigate("/");
    };
    return (<>
        <div className="w-100 h-100 d-flex align-items-center header-style position-relative">
            <span className="header-text position-absolute start-50 translate-middle-x">
                {headerTextSamples.SOLAR_WINDS}
            </span>
            <div className="ms-auto me-3 p-1 text-blue border rounded-full logout-btn" onClick={handleLogout} 
             >
        <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M17 16L21 12M21 12L17 8M21 12L7 12M13 16V17C13 18.6569 11.6569 20 10 20H6C4.34315 20 3 18.6569 3 17V7C3 5.34315 4.34315 4 6 4H10C11.6569 4 13 5.34315 13 7V8" stroke="#374151" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>
        <span className="px-1">LogOut</span>
        </div>
        </div>

    </>
    )
}