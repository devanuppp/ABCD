import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CitizenForm = ({ onComplete, data, updateData }) => {
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        // Citizenship ID Validation
        if (!data.idNumber || data.idNumber.trim() === '') {
            newErrors.idNumber = 'Citizenship ID is required';
        } else if (!/^[0-9\-/]+$/.test(data.idNumber)) {
            newErrors.idNumber = 'Citizenship ID can only contain numbers, hyphens (-), and slashes (/)';
        }

        // DOM Validation (Age 18+)
        if (!data.dob) {
            newErrors.dob = 'Date of Birth is required';
        } else {
            const birthDate = new Date(data.dob);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            if (age < 18) {
                newErrors.dob = 'You must be at least 18 years old to vote';
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Clear errors if valid
        setErrors({});
        onComplete();
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
                        value={data.idNumber}
                        onChange={(e) => {
                            updateData({ idNumber: e.target.value });
                            if (errors.idNumber) setErrors({ ...errors, idNumber: null });
                        }}
                        placeholder="XX-XX-XX-XXXXX"
                        className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${errors.idNumber ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-primary'} focus:ring-1 ${errors.idNumber ? 'focus:ring-red-500' : 'focus:ring-primary'} outline-none transition-all`}
                    />
                    {errors.idNumber && (
                        <p className="text-sm text-red-500 mt-1">{errors.idNumber}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Date of Birth</label>
                    <input
                        type="date"
                        value={data.dob}
                        onChange={(e) => {
                            updateData({ dob: e.target.value });
                            if (errors.dob) setErrors({ ...errors, dob: null });
                        }}
                        className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${errors.dob ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-primary'} focus:ring-1 ${errors.dob ? 'focus:ring-red-500' : 'focus:ring-primary'} outline-none transition-all text-white`}
                    />
                    {errors.dob && (
                        <p className="text-sm text-red-500 mt-1">{errors.dob}</p>
                    )}
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
