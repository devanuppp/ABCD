import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Lock, Fingerprint, CheckCircle, Shield, Eye, Zap, Server, Cpu, Database, ShieldCheck, X, Globe, Users, TrendingUp, Award } from 'lucide-react';

const Home = () => {
    const [expandedCard, setExpandedCard] = useState(null);
    const [showLearnMore, setShowLearnMore] = useState(false);
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

                    <button
                        onClick={() => setShowLearnMore(true)}
                        className="px-8 py-4 rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-gray-300"
                    >
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

            {/* Learn More Modal */}
            <AnimatePresence>
                {showLearnMore && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                        onClick={() => setShowLearnMore(false)}
                    >
                        {/* Backdrop with blur */}
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{
                                type: "spring",
                                damping: 25,
                                stiffness: 300,
                                duration: 0.5
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl border border-white/10 shadow-2xl"
                        >
                            {/* Close Button */}
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                onClick={() => setShowLearnMore(false)}
                                className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all group"
                            >
                                <X className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                            </motion.button>

                            {/* Decorative Background Gradient */}
                            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl opacity-30" />
                            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-3xl opacity-30" />

                            <div className="relative p-8 md:p-12">
                                {/* Header */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1, duration: 0.6 }}
                                    className="mb-8"
                                >
                                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                        About VoteSecure
                                    </h2>
                                    <p className="text-xl text-gray-300 leading-relaxed">
                                        The world's most advanced electronic voting platform
                                    </p>
                                </motion.div>

                                {/* Main Description */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.6 }}
                                    className="mb-10 p-6 rounded-2xl bg-white/5 border border-white/10"
                                >
                                    <h3 className="text-2xl font-bold mb-4 text-white flex items-center gap-3">
                                        <Globe className="w-6 h-6 text-primary" />
                                        Our Mission
                                    </h3>
                                    <p className="text-gray-300 leading-relaxed mb-4">
                                        VoteSecure revolutionizes democratic participation by combining cutting-edge biometric authentication,
                                        blockchain technology, and military-grade encryption to create the most secure, transparent, and
                                        accessible voting platform ever built.
                                    </p>
                                    <p className="text-gray-300 leading-relaxed">
                                        We believe that every citizen deserves a voting experience that is not only secure and verifiable,
                                        but also intuitive and accessible from anywhere in the world.
                                    </p>
                                </motion.div>

                                {/* Key Features Grid */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                    className="mb-10"
                                >
                                    <h3 className="text-2xl font-bold mb-6 text-white">Core Features</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            {
                                                icon: Lock,
                                                title: "End-to-End Encryption",
                                                desc: "Military-grade AES-256 encryption protects every vote from submission to final count"
                                            },
                                            {
                                                icon: Fingerprint,
                                                title: "Biometric Verification",
                                                desc: "Advanced facial recognition with liveness detection ensures only verified citizens can vote"
                                            },
                                            {
                                                icon: Shield,
                                                title: "Blockchain Integrity",
                                                desc: "Immutable distributed ledger creates an unalterable audit trail for complete transparency"
                                            },
                                            {
                                                icon: Zap,
                                                title: "Real-Time Results",
                                                desc: "Instant vote processing with cryptographic verification ensures accuracy and speed"
                                            },
                                            {
                                                icon: Users,
                                                title: "Universal Access",
                                                desc: "Vote from any device, anywhere in the world with our responsive platform"
                                            },
                                            {
                                                icon: Award,
                                                title: "Certified Secure",
                                                desc: "Multiple security audits and compliance with international voting standards"
                                            }
                                        ].map((feature, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.4 + idx * 0.1, duration: 0.5 }}
                                                className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all duration-300 group"
                                            >
                                                <feature.icon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                                                <h4 className="text-lg font-bold text-white mb-2">{feature.title}</h4>
                                                <p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* How It Works */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.9, duration: 0.6 }}
                                    className="mb-10"
                                >
                                    <h3 className="text-2xl font-bold mb-6 text-white">How It Works</h3>
                                    <div className="space-y-4">
                                        {[
                                            {
                                                step: "01",
                                                title: "Citizen Verification",
                                                desc: "Verify your identity with citizenship ID and date of birth"
                                            },
                                            {
                                                step: "02",
                                                title: "Biometric Authentication",
                                                desc: "Upload ID photo and complete facial recognition scan with liveness detection"
                                            },
                                            {
                                                step: "03",
                                                title: "Secure Voting",
                                                desc: "Cast your encrypted vote with full transparency and blockchain verification"
                                            },
                                            {
                                                step: "04",
                                                title: "Instant Confirmation",
                                                desc: "Receive cryptographic proof of vote submission with real-time status updates"
                                            }
                                        ].map((item, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 1.0 + idx * 0.1, duration: 0.6 }}
                                                className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all"
                                            >
                                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-white">
                                                    {item.step}
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                                                    <p className="text-sm text-gray-400">{item.desc}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Statistics */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.4, duration: 0.6 }}
                                    className="grid grid-cols-3 gap-6 p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20"
                                >
                                    {[
                                        { value: "99.9%", label: "Accuracy Rate" },
                                        { value: "256-bit", label: "Encryption" },
                                        { value: "< 1s", label: "Vote Processing" }
                                    ].map((stat, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 1.5 + idx * 0.1, duration: 0.5 }}
                                            className="text-center"
                                        >
                                            <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">
                                                {stat.value}
                                            </div>
                                            <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
                                        </motion.div>
                                    ))}
                                </motion.div>

                                {/* CTA */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.8, duration: 0.6 }}
                                    className="mt-10 text-center"
                                >
                                    <Link
                                        to="/verify"
                                        onClick={() => setShowLearnMore(false)}
                                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-primary/50 transition-all transform hover:scale-105"
                                    >
                                        Get Started Now
                                        <ArrowRight className="w-5 h-5" />
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Home;
