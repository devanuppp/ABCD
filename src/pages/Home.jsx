import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Lock, Fingerprint, CheckCircle, Shield, Eye, Zap, Server, Cpu, Database, ShieldCheck } from 'lucide-react';

const Home = () => {
    const [expandedCard, setExpandedCard] = useState(null);

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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl"
            >
                {features.map((feature, idx) => (
                    <motion.div
                        key={idx}
                        layout
                        onClick={() => toggleCard(idx)}
                        className={`p-6 rounded-2xl glass-panel text-left cursor-pointer transition-all duration-300 ${expandedCard === idx
                            ? 'md:col-span-3 border-2 border-primary/50 shadow-lg shadow-primary/20'
                            : 'hover:border-primary/30'
                            }`}
                        whileHover={{ scale: expandedCard === idx ? 1 : 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="flex items-start gap-4">
                            <motion.div
                                animate={{
                                    rotate: expandedCard === idx ? 360 : 0,
                                    scale: expandedCard === idx ? 1.2 : 1
                                }}
                                transition={{ duration: 0.5 }}
                            >
                                <feature.icon className={`w-10 h-10 ${expandedCard === idx ? `text-transparent bg-clip-text bg-gradient-to-r ${feature.color}` : 'text-primary'}`} />
                            </motion.div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                <p className="text-gray-400">{feature.desc}</p>
                            </div>
                        </div>

                        <AnimatePresence>
                            {expandedCard === idx && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                                    className="overflow-hidden"
                                >
                                    <div className="mt-6 pt-6 border-t border-white/10">
                                        <h4 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                            Technical Details
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {feature.details.map((detail, detailIdx) => (
                                                <motion.div
                                                    key={detailIdx}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: detailIdx * 0.1, duration: 0.3 }}
                                                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                                                >
                                                    <detail.icon className={`w-5 h-5 text-transparent bg-clip-text bg-gradient-to-r ${feature.color}`} />
                                                    <span className="text-sm text-gray-300">{detail.text}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4, duration: 0.3 }}
                                            className="mt-4 text-center"
                                        >
                                            <button className={`px-6 py-2 rounded-lg bg-gradient-to-r ${feature.color} text-white font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all`}>
                                                Learn More
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
