import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    //GETTING ACCOUNT DETAILS FROM JWT TOKEN ON SUCCESSFUL LOGIN
    const login = async (inputs) => {
        const res = await axios.post("https://crowdhub-api-production.up.railway.app/api/auth/login", inputs, { withCredentials: true })
        //Set the userdata state from login generated cookie data
        setCurrentUser(res.data)
        console.log(res.data)
        console.log(currentUser)
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login }}>
            {children}
        </AuthContext.Provider>
    );
};
