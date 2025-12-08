import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, LogOut, Phone } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const { phoneNumber, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const formatPhoneNumber = (phone) => {
        if (!phone) return '';
        // Format +9779808042103 to +977 9808042103
        if (phone.startsWith('+977')) {
            return phone.replace('+977', '+977 ');
        }
        return phone;
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-glass-border bg-black/50 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Left side - Logo */}
                <Link to="/" className="flex items-center gap-4 h-full py-2">
                    <img
                        src="/emblem_nepal.png"
                        alt="Election Commission Board"
                        className="h-16 w-auto object-contain drop-shadow-md"
                    />
                    <div className="flex flex-col justify-center">
                        <h1 className="text-xl font-bold leading-none text-white tracking-wide uppercase drop-shadow-sm">
                            Election Commission Board
                        </h1>
                        <div className="flex items-center gap-2 mt-1">
                            <p className="text-sm text-blue-400 font-semibold tracking-widest uppercase">
                                Texas College
                            </p>
                            {/* Secure System badge - Eye-catching */}
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 backdrop-blur-md border border-green-500/40 hover:border-green-500/60 transition-all shadow-lg shadow-green-500/20 hover:shadow-green-500/40 animate-pulse-slow">
                                <ShieldCheck className="w-4 h-4 text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                                <span className="text-xs font-semibold text-green-300 drop-shadow-[0_0_4px_rgba(74,222,128,0.3)]">Secure System</span>
                            </div>
                        </div>
                    </div>
                </Link>

                {/* Right side - User info and logout */}
                <div className="flex items-center gap-4">
                    {phoneNumber && (
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                            <Phone className="w-4 h-4 text-blue-400" />
                            <span className="text-sm text-gray-300">{formatPhoneNumber(phoneNumber)}</span>
                        </div>
                    )}

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 backdrop-blur-sm rounded-lg border border-red-500/50 transition-all duration-200 text-red-400 hover:text-red-300"
                        title="Logout"
                    >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
