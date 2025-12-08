import React from 'react';
import { Link } from 'react-router-dom';
import { Vote, ShieldCheck } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-glass-border bg-black/50 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-4 h-full py-2">
                    <img
                        src="/emblem_nepal.png"
                        alt="Election Commission Board"
                        className="h-16 w-auto object-contain drop-shadow-md"
                    />
                    <div className="flex flex-col justify-center">
                        <h1 className="text-lg font-bold leading-none text-white tracking-wide uppercase drop-shadow-sm">
                            Election Commission Board
                        </h1>
                        <p className="text-sm text-blue-400 font-semibold tracking-wider uppercase mt-1">
                            Texas College
                        </p>
                    </div>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
