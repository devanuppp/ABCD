import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Phone, Shield, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';

const PhoneAuth: React.FC = () => {
    const [step, setStep] = useState<'phone' | 'otp'>('phone');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [resendCooldown, setResendCooldown] = useState(0);
    const { login } = useAuth();

    const CORRECT_OTP = '143600';

    const validateNepalPhoneNumber = (number: string): boolean => {
        const cleaned = number.replace(/\D/g, '');
        return cleaned.length === 10 && /^[0-9]{10}$/.test(cleaned);
    };

    const handleSendOTP = async () => {
        setError('');

        if (!validateNepalPhoneNumber(phoneNumber)) {
            setError('Please enter a valid 10-digit Nepali mobile number');
            return;
        }

        setLoading(true);

        // Simulate sending OTP
        setTimeout(() => {
            setLoading(false);
            setStep('otp');
            startResendCooldown();
        }, 800);
    };

    const startResendCooldown = () => {
        setResendCooldown(60);
        const interval = setInterval(() => {
            setResendCooldown((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleOTPChange = (value: string) => {
        setOtp(value);
        setError('');

        // Auto-verify when OTP is complete (6 digits)
        if (value.length === 6) {
            verifyOTP(value);
        }
    };

    const verifyOTP = (code: string) => {
        setLoading(true);

        setTimeout(() => {
            if (code === CORRECT_OTP) {
                const fullPhoneNumber = `+977${phoneNumber.replace(/\D/g, '')}`;
                login(fullPhoneNumber);
            } else {
                setError('Invalid OTP. Please enter 143600');
                setOtp('');
            }
            setLoading(false);
        }, 500);
    };

    const handleBack = () => {
        setStep('phone');
        setOtp('');
        setError('');
    };

    const handleResendOTP = () => {
        if (resendCooldown > 0) return;
        setError('');
        startResendCooldown();
        // In a real app, this would resend the OTP
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 10);
        setPhoneNumber(value);
        setError('');
    };

    const maskPhoneNumber = (phone: string) => {
        if (phone.length >= 6) {
            return `+977 ${phone.slice(0, 2)}XX XXX XXX`;
        }
        return `+977 ${phone}`;
    };

    if (step === 'otp') {
        return (
            <div className="space-y-6">
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    disabled={loading}
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </button>

                <div className="text-center space-y-2">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mb-4">
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white">Verify OTP</h2>
                    <p className="text-gray-400">
                        Enter the code sent to
                        <br />
                        <span className="text-white font-medium">+977 {phoneNumber}</span>
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="flex justify-center">
                        <InputOTP
                            maxLength={6}
                            value={otp}
                            onChange={handleOTPChange}
                            disabled={loading}
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} className="otp-slot" />
                                <InputOTPSlot index={1} className="otp-slot" />
                                <InputOTPSlot index={2} className="otp-slot" />
                                <InputOTPSlot index={3} className="otp-slot" />
                                <InputOTPSlot index={4} className="otp-slot" />
                                <InputOTPSlot index={5} className="otp-slot" />
                            </InputOTPGroup>
                        </InputOTP>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm text-center">
                            {error}
                        </div>
                    )}

                    {loading && (
                        <div className="flex items-center justify-center gap-2 text-blue-400">
                            <div className="w-5 h-5 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin"></div>
                            Verifying...
                        </div>
                    )}

                    <div className="text-center">
                        <p className="text-gray-400 text-sm mb-2">Didn't receive the code?</p>
                        <Button
                            onClick={handleResendOTP}
                            disabled={resendCooldown > 0}
                            variant="ghost"
                            className="text-blue-400 hover:text-blue-300"
                        >
                            {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend OTP'}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                    <Phone className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">Phone Verification</h2>
                <p className="text-gray-400">Enter your Nepali mobile number to continue</p>
            </div>

            <div className="space-y-4">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="text-gray-400 font-medium">+977</span>
                    </div>
                    <input
                        type="tel"
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        placeholder="98XXXXXXXX"
                        className="w-full pl-20 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all"
                        disabled={loading}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendOTP()}
                    />
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm">
                        {error}
                    </div>
                )}

                <Button
                    onClick={handleSendOTP}
                    disabled={loading || phoneNumber.length !== 10}
                    className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {loading ? (
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Sending OTP...
                        </div>
                    ) : (
                        'Send OTP'
                    )}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                    By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
            </div>
        </div>
    );
};

export default PhoneAuth;
