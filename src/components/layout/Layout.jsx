import React from 'react';
import Navbar from './Navbar';
import { ShieldCheck } from 'lucide-react';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-black relative overflow-hidden selection:bg-primary/30 flex flex-col">
            {/* Ambient Background Effects */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
            </div>

            <Navbar />

            <main className="pt-24 px-6 pb-12 max-w-7xl mx-auto flex-1 w-full">
                {children}
            </main>

            <Footer />
        </div>
    );
};

export default Layout;
