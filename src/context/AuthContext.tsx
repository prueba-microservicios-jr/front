import { createContext, useState, ReactNode, useEffect } from "react";

type User = {
    username: string;
    access_token?: string;
} | null;

type AuthContextType = {
    user: User;
    login: (userData: User) => void;
    logout: () => void;
};

// Creamos el contexto
export const AuthContext = createContext<AuthContextType | null>(null);

// Proveedor del contexto
export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const initialData: User = JSON.parse(localStorage.getItem("access_token") || '{}');


    const [user, setUser] = useState<User>(initialData);

    const login = (userData: User) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    useEffect(() => {
        localStorage.setItem("access_token", JSON.stringify(user));
      }, [user]);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};