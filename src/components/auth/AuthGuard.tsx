import React from 'react';
import { useAuth } from '../../context/AuthContext';
import OTPLoginPage from '../../pages/OTPLoginPage';

interface AuthGuardProps {
    children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    const { isAuthenticated } = useAuth();

    // If user is not authenticated, show OTP login page
    if (!isAuthenticated) {
        return <OTPLoginPage />;
    }

    // User is authenticated, render the protected content
    return <>{children}</>;
};

export default AuthGuard;
