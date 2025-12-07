import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, Fingerprint, CheckCircle } from 'lucide-react';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6 max-w-4xl"
            >


                <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
                    The Future of <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary text-glow">
                        Democracy
                    </span>
                </h1>

                <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    Experience the most secure, transparent, and accessible voting platform.
                    Powered by advanced biometric verification and blockchain technology.
                </p>

                <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/verify"
                        className="group relative px-8 py-4 bg-white text-black font-bold rounded-lg overflow-hidden transition-transform hover:scale-105"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">
                            Start Voting <ArrowRight className="w-5 h-5" />
                        </span>
                    </Link>

                    <button className="px-8 py-4 rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-gray-300">
                        Learn More
                    </button>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl"
            >
                {[
                    { icon: Lock, title: "Bank-Grade Security", desc: "End-to-end encryption ensures your vote remains private and tamper-proof." },
                    { icon: Fingerprint, title: "Biometric Verified", desc: "Advanced facial recognition and ID verification prevents fraud." },
                    { icon: CheckCircle, title: "Instant Validation", desc: "Real-time vote counting with blockchain-backed integrity." }
                ].map((feature, idx) => (
                    <div key={idx} className="p-6 rounded-2xl glass-panel text-left hover:border-primary/30 transition-colors">
                        <feature.icon className="w-10 h-10 text-primary mb-4" />
                        <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                        <p className="text-gray-400">{feature.desc}</p>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default Home;
