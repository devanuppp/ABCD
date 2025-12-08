import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Lock, Fingerprint, CheckCircle, Shield, Eye, Zap, Server, Cpu, Database, ShieldCheck } from 'lucide-react';

const Home = () => {
    const [expandedCard, setExpandedCard] = useState(null);
    const cardRefs = React.useRef([]);

    const features = [
        {
            icon: Lock,
            title: "Bank-Grade Security",
            desc: "End-to-end encryption ensures your vote remains private and tamper-proof.",
            details: [
                { icon: Shield, text: "AES-256 encryption for all vote data" },
                { icon: Eye, text: "Zero-knowledge proofs protect voter identity" },
                { icon: Server, text: "Multi-layer security protocols" },
                { icon: Database, text: "Secure key management system" }
            ],
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: Fingerprint,
            title: "Biometric Verified",
            desc: "Advanced facial recognition and ID verification prevents fraud.",
            details: [
                { icon: Eye, text: "99.9% facial recognition accuracy" },
                { icon: Shield, text: "Liveness detection prevents spoofing" },
                { icon: Cpu, text: "Multi-factor authentication system" },
                { icon: Database, text: "Encrypted biometric data storage" }
            ],
            color: "from-purple-500 to-pink-500"
        },
        {
            icon: CheckCircle,
            title: "Instant Validation",
            desc: "Real-time vote counting with blockchain-backed integrity.",
            details: [
                { icon: Zap, text: "Real-time vote processing & counting" },
                { icon: Database, text: "Immutable blockchain audit trail" },
                { icon: Shield, text: "Cryptographic vote verification" },
                { icon: Server, text: "Distributed consensus mechanism" }
            ],
            color: "from-green-500 to-emerald-500"
        }
    ];

    const toggleCard = (idx) => {
        setExpandedCard(expandedCard === idx ? null : idx);
    };

    React.useEffect(() => {
        if (expandedCard !== null && cardRefs.current[expandedCard]) {
            setTimeout(() => {
                cardRefs.current[expandedCard].scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'center'
                });
            }, 300); // Delay to allow layout animation to start/complete for accurate positioning
        }
    }, [expandedCard]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
            {/* Secure System Badge - Top Right Corner */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-green-500/50 transition-all"
            >
                <ShieldCheck className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-gray-200">Secure System</span>
            </motion.div>

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
                layout
                className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl"
            >
                {features.map((feature, idx) => (
                    <motion.div
                        key={idx}
                        ref={el => cardRefs.current[idx] = el}
                        layout="position"
                        onClick={() => toggleCard(idx)}
                        className={`group relative p-6 rounded-2xl glass-panel text-left cursor-pointer overflow-hidden transition-colors duration-500
                            ${expandedCard === idx
                                ? 'md:col-span-3 bg-white/5 border-primary/50 shadow-2xl shadow-primary/10'
                                : 'hover:bg-white/5 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5'
                            }`}
                        transition={{
                            layout: { duration: 0.6, type: "spring", bounce: 0, stiffness: 100, damping: 20 }
                        }}
                    >
                        {/* Smooth Background Gradient Fade */}
                        <div
                            className={`absolute inset-0 bg-gradient-to-br ${feature.color} transition-opacity duration-700 ease-out
                            ${expandedCard === idx ? 'opacity-10' : 'opacity-0 group-hover:opacity-5'}`}
                        />

                        <div className="relative z-10 flex items-start gap-4">
                            <motion.div
                                layout
                                className={`p-3 rounded-xl transition-colors duration-500
                                    ${expandedCard === idx ? 'bg-primary/20' : 'bg-white/5 group-hover:bg-primary/10'}`}
                            >
                                <feature.icon
                                    className={`w-8 h-8 transition-colors duration-500
                                    ${expandedCard === idx
                                            ? `text-white`
                                            : 'text-primary group-hover:text-blue-300'}`}
                                />
                            </motion.div>

                            <div className="flex-1">
                                <motion.h3 layout="position" className="text-xl font-bold mb-2 text-white">
                                    {feature.title}
                                </motion.h3>
                                <motion.p layout="position" className="text-gray-400 leading-relaxed text-sm">
                                    {feature.desc}
                                </motion.p>
                            </div>
                        </div>

                        <AnimatePresence mode="popLayout">
                            {expandedCard === idx && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                                >
                                    <div className="mt-8 pt-6 border-t border-white/10">
                                        <div className="flex items-center justify-between mb-6">
                                            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                                                Key Features
                                            </h4>
                                            <span className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${feature.color} text-white bg-opacity-20`}>
                                                Verified
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {feature.details.map((detail, detailIdx) => (
                                                <motion.div
                                                    key={detailIdx}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: detailIdx * 0.1 + 0.1, duration: 0.5, ease: "easeOut" }}
                                                    className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-all duration-300"
                                                >
                                                    <detail.icon className={`w-5 h-5 text-gray-400`} />
                                                    <span className="text-sm text-gray-200">{detail.text}</span>
                                                </motion.div>
                                            ))}
                                        </div>

                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.5, duration: 0.5 }}
                                            className="mt-8 flex justify-end"
                                        >
                                            <button className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group/btn">
                                                Learn technical specifications
                                                <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                                            </button>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default Home;
