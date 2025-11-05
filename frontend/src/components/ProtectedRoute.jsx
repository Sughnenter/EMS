import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import api from "../api";
import {ACCESS_TOKEN} from "../constants";
import { REFRESH_TOKEN } from "../constants";
import { useState, useEffect, use } from "react";

function ProtectedRoute({ children }) {
    const [IsAuthorized, SetIsAuthorized] = useState(null) //null means not checked yet

    useEffect(()=>{
        auth().catch(()=>SetIsAuthorized(false)) //if auth fails, set to false
    },[])

    const refreshToken = async()=>{
        const refresh_token = localStorage.getItem(REFRESH_TOKEN) //gets refresh token from local storage

        try{
            const res = await api.post('api/auth/refresh/',{refresh:refresh_token}); //posts refresh token to get new access token
            if(res.status === 200 ){ //200 means success
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                SetIsAuthorized(true)
            }else{SetIsAuthorized(false)}

        }catch (error){
            console.log(error)
            SetIsAuthorized(false)
        }
    }

    const auth = async ()=>{
    const token = localStorage.getItem(ACCESS_TOKEN) //gets access token from local storage
        if(!token){
            SetIsAuthorized(false)
            return
        }
        const decoded = jwtDecode(token) //decodes token to get expiration time
        const token_expiration = decoded.exp //gets expiration time
        const now = Date.now()/1000 //gets current time in seconds
        if(token_expiration < now){
            await refreshToken()
        }else{
            SetIsAuthorized(true)
        }
    }
    if(IsAuthorized === null){ //initial state
        return <div>Loading...</div>
    } 
    return IsAuthorized ? children : <navigate to="/login"/> //if authorized, render children, else redirect to login
}

export default ProtectedRoute