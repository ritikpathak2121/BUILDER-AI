import { createContext, useContext, useEffect, useState } from "react"
import api from "../api/api";
import {toast} from "react-hot-toast"
import { Navigate, useNavigate } from "react-router-dom";

const AppContext = createContext(undefined);

export function AppContextProvider({children}){
    const Navigate = useNavigate()
    //Auth States
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    //Auth Action 
    const checkSession = async () =>{
        try {
            const {data} = await api.get("/api/auth/me");
            setUser(data.user);
        } catch (error) {
            setUser(null)
        } finally {
            setLoadingUser(null)
        }
    }
// CodeRabbit test// CodeRabbit test
    useEffect(()=>{
        checkSession()
    },[checkSession])


    const login = async (email, password) => {
        try {
        const {data} = await api.post("/api/auth/login", {email, password});
        setUser(data.user);
        toast.success("Wellcome back");
        Navigate("/")
        } catch (error) {
            const errMsg = error?.response?.data?.error || "Login failed";
            toast.error(errMsg);
            throw new Error(errMsg)
        }
        
    }

    // Register 
    const register = async (name, email, password) => {
        try {
        const {data} = await api.post("/api/auth/register", {name, email, password});
        setUser(data.user);
        toast.success("Account Created successfully!");
        Navigate("/")
        } catch (error) {
            console.error("Registration failed:", error);
            const errMsg = error?.response?.data?.error || "Registration failed";
            toast.error(errMsg);
            throw new Error(errMsg)
        }
        
    }

    return (
        <AppContext.Provider value={{user, loadingUser, login, register}} >
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext(){
    const context = useContext(AppContext)
    if (context === undefined){
        throw new Error("useAppContext must be used within an AppContextProvider ");
    }
    return context;
}

export default AppContextProvider;