import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NepaliDate from 'nepali-date-converter';

const CitizenForm = ({ onComplete, data, updateData }) => {
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        // Validate Citizenship ID
        if (!data.idNumber || data.idNumber.trim() === '') {
            newErrors.idNumber = 'Citizenship ID is required';
        } else if (!/^[0-9\-/]+$/.test(data.idNumber)) {
            newErrors.idNumber = 'Citizenship ID can only contain numbers, hyphens (-), and slashes (/)';
        }

        // Validate Gender
        if (!data.gender) {
            newErrors.gender = 'Please select your gender';
        }

        // Validate DOB (Age 18+)
        if (!data.dob) {
            newErrors.dob = 'English Date (AD) is required';
        } else if (!data.dobBS) {
            newErrors.dobBS = 'Nepali Date (BS) is required';
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
            } else if (age > 100) {
                newErrors.dob = 'Age cannot exceed 100 years';
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Backend Verification
        try {
            const response = await fetch('http://localhost:3000/api/verify-citizen', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    idNumber: data.idNumber,
                    dob: data.dob,
                    gender: data.gender
                })
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setErrors({});
                onComplete();
            } else {
                setErrors({ general: "You are not allowed to vote" });
            }
        } catch (error) {
            console.error("Verification error:", error);
            setErrors({ general: "You are not allowed to vote" });
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
            <p className="text-gray-400 mb-8">Please enter your citizenship details and verify your phone number.</p>

            {errors.general && (
                <div className="bg-red-500/10 border border-red-500/50 p-3 rounded-lg text-red-400 text-sm py-4 mb-4">
                    {errors.general}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Citizenship ID */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Citizenship ID Number</label>
                    <input
                        type="text"
                        value={data.idNumber}
                        onChange={(e) => {
                            const val = e.target.value;
                            if (/^[0-9/\-]*$/.test(val)) {
                                updateData({ idNumber: val });
                                if (errors.idNumber) setErrors({ ...errors, idNumber: null });
                            }
                        }}
                        placeholder="XX-XX-XX-XXXXX"
                        className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${errors.idNumber
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-white/10 focus:border-emerald-500' // Changed focus color
                            } focus:ring-1 ${errors.idNumber
                                ? 'focus:ring-red-500'
                                : 'focus:ring-emerald-500' // Changed focus color
                            } outline-none transition-all`}
                    />
                    {errors.idNumber && (
                        <p className="text-sm text-red-500 mt-1">{errors.idNumber}</p>
                    )}

                </div>

                {/* Gender Selection */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Gender</label>
                    <select
                        value={data.gender}
                        onChange={(e) => {
                            updateData({ gender: e.target.value });
                            if (errors.gender) setErrors({ ...errors, gender: null });
                        }}
                        className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${errors.gender
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-white/10 focus:border-emerald-500'
                            } focus:ring-1 ${errors.gender
                                ? 'focus:ring-red-500'
                                : 'focus:ring-emerald-500'
                            } outline-none transition-all text-white [&>option]:bg-gray-900`}
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    {errors.gender && (
                        <p className="text-sm text-red-500 mt-1">{errors.gender}</p>
                    )}
                </div>

                {/* Date of Birth (AD & BS) */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">English Date (AD)</label>
                        <input
                            type="date"
                            value={data.dob}
                            onChange={(e) => {
                                const adDate = e.target.value;
                                try {
                                    if (adDate) {
                                        const date = new Date(adDate);
                                        const bsDate = new NepaliDate(date).format('YYYY-MM-DD');
                                        updateData({ dob: adDate, dobBS: bsDate });
                                    } else {
                                        updateData({ dob: '', dobBS: '' });
                                    }
                                    if (errors.dob) setErrors({ ...errors, dob: null });
                                    if (errors.dobBS) setErrors({ ...errors, dobBS: null });
                                } catch (err) {
                                    console.error("AD Sync Error", err);
                                }
                            }}
                            className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${errors.dob
                                ? 'border-red-500 focus:border-red-500'
                                : 'border-white/10 focus:border-emerald-500'
                                } focus:ring-1 ${errors.dob
                                    ? 'focus:ring-red-500'
                                    : 'focus:ring-emerald-500'
                                } outline-none transition-all text-white`}
                        />
                        {errors.dob && (
                            <p className="text-sm text-red-500 mt-1">{errors.dob}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Nepali Date (BS)</label>
                        <input
                            type="text"
                            value={data.dobBS || ''}
                            onChange={(e) => {
                                const bsDate = e.target.value;
                                updateData({ ...data, dobBS: bsDate }); // Allow typing freely

                                // Attempt sync if format roughly matches YYYY-MM-DD
                                if (/^\d{4}-\d{2}-\d{2}$/.test(bsDate)) {
                                    try {
                                        const adDate = new NepaliDate(bsDate).toJsDate();
                                        const adDateStr = adDate.toISOString().split('T')[0];
                                        updateData({ dob: adDateStr, dobBS: bsDate });
                                        if (errors.dob) setErrors({ ...errors, dob: null });
                                    } catch (err) {
                                        // Invalid BS date, ignore sync
                                    }
                                }
                                if (errors.dobBS) setErrors({ ...errors, dobBS: null });
                            }}
                            placeholder="YYYY-MM-DD"
                            className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${errors.dobBS
                                ? 'border-red-500 focus:border-red-500'
                                : 'border-white/10 focus:border-emerald-500'
                                } focus:ring-1 ${errors.dobBS
                                    ? 'focus:ring-red-500'
                                    : 'focus:ring-emerald-500'
                                } outline-none transition-all text-white`}
                        />
                        {errors.dobBS && (
                            <p className="text-sm text-red-500 mt-1">{errors.dobBS}</p>
                        )}
                    </div>
                </div>



                {/* Continue Button */}
                <button
                    type="submit"
                    className="w-full py-4 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-all hover:shadow-lg hover:shadow-emerald-500/20"
                >
                    Continue
                </button>
            </form>
        </motion.div>
    );
};

export default CitizenForm;
