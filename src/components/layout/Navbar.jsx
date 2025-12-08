import React from 'react';
import { Link } from 'react-router-dom';
import { Vote, ShieldCheck } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-glass-border bg-black/50 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 h-full py-2">
                    <div className="bg-black px-3 py-1 rounded-lg">
                        <img
                            src="https://election.gov.np/img1/Header.png"
                            alt="Election Commission Nepal"
                            className="h-12 w-auto object-contain"
                        />
                    </div>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
