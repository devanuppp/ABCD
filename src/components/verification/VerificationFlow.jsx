import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CitizenForm from './CitizenForm';
import IdUpload from './IdUpload';
import FaceAuth from './FaceAuth';

const VerificationFlow = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [data, setData] = useState({
        idNumber: '',
        dob: '',
        dobBS: '',
        idFront: null,
        idBack: null,
        phoneNumber: '',
        otpVerified: false
    });

    const updateData = (newData) => {
        setData(prev => ({ ...prev, ...newData }));
    };

    const nextStep = () => setStep(s => s + 1);

    const handleComplete = async () => {
        try {
            const formData = new FormData();
            formData.append('idNumber', data.idNumber);
            formData.append('dob', data.dob);
            formData.append('dobBS', data.dobBS);
            if (data.idFront) formData.append('idFront', data.idFront);
            if (data.idBack) formData.append('idBack', data.idBack);

            const response = await fetch('http://localhost:3000/api/verify', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (response.ok && result.verified) {
                console.log("Verification Success:", result);
                localStorage.setItem('isVerified', 'true');
                navigate('/vote');
            } else {
                console.error("Verification Failed:", result.error);
                alert(`Verification Failed: ${result.error || "Credentials do not match."}`);
                localStorage.removeItem('isVerified');
            }
        } catch (error) {
            console.error("Network Error:", error);
            alert("Network Error. Ensure backend is running.");
        }
    };

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center py-12">
            {/* Progress Steps */}
            <div className="flex items-center gap-4 mb-12">
                {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center gap-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all
              ${step >= s ? 'bg-primary text-black shadow-[0_0_15px_rgba(0,242,255,0.5)]' : 'bg-white/10 text-gray-500'}
            `}>
                            {s}
                        </div>
                        {s < 3 && <div className={`w-12 h-0.5 ${step > s ? 'bg-primary' : 'bg-white/10'}`} />}
                    </div>
                ))}
            </div>

            <div className="w-full max-w-2xl p-8 rounded-3xl glass-panel relative overflow-hidden">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <CitizenForm key="step1" onComplete={nextStep} data={data} updateData={updateData} />
                    )}
                    {step === 2 && (
                        <IdUpload key="step2" onComplete={nextStep} updateData={updateData} />
                    )}
                    {step === 3 && (
                        <FaceAuth key="step3" onComplete={handleComplete} />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default VerificationFlow;
