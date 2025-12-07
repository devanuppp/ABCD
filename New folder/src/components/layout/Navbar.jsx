import React from 'react';
import { Link } from 'react-router-dom';
import { Vote, ShieldCheck } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-glass-border bg-black/50 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Vote className="w-8 h-8 text-primary" />
                    </div>
                    <span className="text-2xl font-bold tracking-wider text-white">
                        NEO<span className="text-primary text-glow">VOTE</span>
                    </span>
                </Link>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <ShieldCheck className="w-4 h-4 text-green-500" />
                        <span>Secure System</span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
