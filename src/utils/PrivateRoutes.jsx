import { Outlet, Navigate} from "react-router-dom"
import { useAuthContext } from "../contexts/AuthContext";


const PrivateRoutes = () => {
    
    let { user } = useAuthContext();
    return(
        !user ? <Navigate to="/login" /> : <Outlet/>
    )
}

export default PrivateRoutes;