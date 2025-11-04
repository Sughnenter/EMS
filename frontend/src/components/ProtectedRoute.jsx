import { Navigate } from "react-router-dom";
import {jwtDecode} from "../utils/jwtDecode";
import api from "../utils/api";
import {ACCESS_TOKEN} from "../constants";
import { REFRESH_TOKEN } from "../constants";

function ProtectedRoute({ children }) {
    const [IsAuthorized, SetIsAuthorized] = useState(null)

    const refreshToken = async()=>{
        const refresh_token = localStorage.getItem(REFRESH_TOKEN)

        try{
            const res = await api.post('api/auth/refresh/')

        }catch (error){
            console.log(error)
            SetIsAuthorized(false)
        }
    }

    const auth = async ()=>{
    const token = localStorage.getItem(ACCESS_TOKEN)
        if(!token){
            SetIsAuthorized(false)
            return
        }
        const decoded = jwtDecode(token)
        const token_expiration = decoded.exp
        const now = Date.now()/1000
        if(token_expiration < now){
            await refreshToken()
        }else{
            SetIsAuthorized(true)
        }
    }
    if(IsAuthorized === null){
        return <div>Loading...</div>
    } 
    return IsAuthorized ? children : <navigate to="/login"/>
}

export default ProtectedRoute