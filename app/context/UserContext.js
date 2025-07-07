import {  createContext, useContext, useState, useEffect } from "react";
import { getUser } from "@/actions/get-user";

export const UserContext = createContext();

export function UserProvider({ children, initialUser = null }) {
    const [user, setUser] = useState(initialUser);

    useEffect(() => {
        const fetchUser = async () => {
            const { user } = await getUser();
  
            setUser(user);
        }
        fetchUser();
    }, [])


    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    return useContext(UserContext);
}