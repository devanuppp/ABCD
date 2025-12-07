import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, User } from 'lucide-react';

const candidates = [
    { id: 1, name: "Sarah Connor", party: "Future Party", color: "from-blue-500 to-cyan-500" },
    { id: 2, name: "John Doe", party: "People's Alliance", color: "from-purple-500 to-pink-500" },
    { id: 3, name: "Jane Smith", party: "Green Initiative", color: "from-green-500 to-emerald-500" },
];

const VotingDashboard = () => {
    const [selected, setSelected] = useState(null);
    const [voted, setVoted] = useState(false);

    const handleVote = () => {
        if (selected) {
            setVoted(true);
        }
    };

    if (voted) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.5)]"
                >
                    <CheckCircle className="w-12 h-12 text-white" />
                </motion.div>
                <h2 className="text-4xl font-bold mb-4">Vote Cast Successfully!</h2>
                <p className="text-gray-400 max-w-md">
                    Your vote has been recorded on the blockchain. Thank you for participating in the democratic process.
                </p>
                <div className="mt-8 p-4 rounded-lg bg-white/5 border border-white/10 font-mono text-sm text-primary">
                    Transaction Hash: 0x7f...3a2b
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto">
            <header className="mb-12 text-center">
                <h1 className="text-4xl font-bold mb-4">Cast Your Vote</h1>
                <p className="text-gray-400">Select your preferred candidate below. This action cannot be undone.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {candidates.map((candidate) => (
                    <motion.div
                        key={candidate.id}
                        whileHover={{ y: -5 }}
                        onClick={() => setSelected(candidate.id)}
                        className={`cursor-pointer relative p-6 rounded-2xl border-2 transition-all overflow-hidden
              ${selected === candidate.id ? 'border-primary bg-white/5 shadow-[0_0_20px_rgba(0,242,255,0.2)]' : 'border-white/10 hover:border-white/30 bg-glass'}
            `}
                    >
                        <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${candidate.color}`} />

                        <div className="w-20 h-20 rounded-full bg-white/10 mx-auto mb-4 flex items-center justify-center">
                            <User className="w-10 h-10 text-gray-400" />
                        </div>

                        <h3 className="text-xl font-bold text-center mb-1">{candidate.name}</h3>
                        <p className="text-sm text-gray-400 text-center mb-4">{candidate.party}</p>

                        <div className={`w-6 h-6 rounded-full border-2 mx-auto flex items-center justify-center
              ${selected === candidate.id ? 'border-primary bg-primary' : 'border-gray-500'}
            `}>
                            {selected === candidate.id && <CheckCircle className="w-4 h-4 text-black" />}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="flex justify-center">
                <button
                    onClick={handleVote}
                    disabled={!selected}
                    className={`px-12 py-4 text-lg font-bold rounded-full transition-all
            ${selected
                            ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-primary/25 hover:scale-105'
                            : 'bg-white/10 text-gray-500 cursor-not-allowed'}
          `}
                >
                    Confirm Vote
                </button>
            </div>
        </div>
    );
};

export default VotingDashboard;
