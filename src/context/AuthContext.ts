import { createContext } from "react";
import { TypeAuthContext } from "../types";

export const AuthContext = createContext<TypeAuthContext>({
    logged: false, 
    pending: true, 
    user: null,
    setUser: (user) => {}
})