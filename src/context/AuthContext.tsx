import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    phoneNumber: string | null;
    login: (phone: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState<string | null>(null);

    // Check localStorage on mount
    useEffect(() => {
        const storedAuth = localStorage.getItem('isAuthenticated');
        const storedPhone = localStorage.getItem('userPhone');

        if (storedAuth === 'true' && storedPhone) {
            setIsAuthenticated(true);
            setPhoneNumber(storedPhone);
        }
    }, []);

    const login = (phone: string) => {
        setIsAuthenticated(true);
        setPhoneNumber(phone);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userPhone', phone);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setPhoneNumber(null);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userPhone');
    };

    const value: AuthContextType = {
        isAuthenticated,
        phoneNumber,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
