import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const PrivateRoutes = (props) => {
    const {isLoadingUser, user} = useAuth()

    if(isLoadingUser) return <p>Loding...</p>

    return user ? <Outlet /> : <Navigate to={props.redirectTo} replace/>
}

export default PrivateRoutes