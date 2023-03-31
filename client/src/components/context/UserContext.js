import { useState,createContext } from "react";

export const UserContext = createContext(null)

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(() => {
        return JSON.parse(window.localStorage.getItem("user"))
    })
    return (
        <UserContext.Provider value={{currentUser,setCurrentUser}}>
            {children}
        </UserContext.Provider>
    )
}