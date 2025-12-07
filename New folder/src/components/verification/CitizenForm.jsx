import React from 'react';
import { motion } from 'framer-motion';

const CitizenForm = ({ onComplete, data, updateData }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.idNumber && data.dob) {
            onComplete();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-md mx-auto"
        >
            <h2 className="text-3xl font-bold mb-2">Identity Verification</h2>
            <p className="text-gray-400 mb-8">Please enter your citizenship details to proceed.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Citizenship ID Number</label>
                    <input
                        type="text"
                        required
                        value={data.idNumber}
                        onChange={(e) => updateData({ idNumber: e.target.value })}
                        placeholder="XX-XX-XX-XXXXX"
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Date of Birth</label>
                    <input
                        type="date"
                        required
                        value={data.dob}
                        onChange={(e) => updateData({ dob: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-white"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-4 bg-primary text-black font-bold rounded-lg hover:bg-primary/90 transition-colors mt-4"
                >
                    Continue
                </button>
            </form>
        </motion.div>
    );
};

export default CitizenForm;
