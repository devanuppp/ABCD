import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, ShieldCheck, AlertCircle } from 'lucide-react';

const FaceAuth = ({ onComplete }) => {
    const [status, setStatus] = useState('idle'); // idle, scanning, success, failed
    const [cameraError, setCameraError] = useState(null);
    const videoRef = useRef(null);

    useEffect(() => {
        startCamera();
        return () => stopCamera();
    }, []);

    const startCamera = async () => {
        setCameraError(null);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error("Camera access denied:", err);
            setCameraError("Camera access denied. Please enable camera permissions to continue.");
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        }
    };

    const startScan = async () => {
        if (cameraError) return;
        setStatus('scanning');

        // Capture Image
        let blob = null;
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(videoRef.current, 0, 0);
            blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg'));
        }

        // Simulate scanning visual delay
        await new Promise(r => setTimeout(r, 2000));

        try {
            await onComplete(blob);
            setStatus('success');
        } catch (error) {
            console.error("Face verify failed", error);
            setStatus('idle'); // or failed state
            alert(error.message || "Verification Failed");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-md mx-auto text-center"
        >
            <h2 className="text-3xl font-bold mb-2">Face Recognition</h2>
            <p className="text-gray-400 mb-8">Please look directly at the camera.</p>

            <div className="relative w-full aspect-square max-w-sm mx-auto rounded-2xl overflow-hidden bg-black border-2 border-white/10 mb-8">
                {/* Camera Feed */}
                {!cameraError && (
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-80"
                    />
                )}

                {/* Error State */}
                {cameraError && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gray-900/90 text-center">
                        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                        <p className="text-red-400 font-medium mb-4">{cameraError}</p>
                        <button
                            onClick={startCamera}
                            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors"
                        >
                            Retry Camera
                        </button>
                    </div>
                )}

                {/* Overlay UI (only if no error) */}
                {!cameraError && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-64 h-64 border-2 border-white/30 rounded-full relative">
                            {/* Scanning Line */}
                            {status === 'scanning' && (
                                <div className="absolute top-0 left-0 w-full h-1 bg-primary shadow-[0_0_15px_rgba(0,242,255,0.8)] animate-scan" />
                            )}

                            {/* Corner Markers */}
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary" />
                            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary" />
                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary" />
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary" />
                        </div>
                    </div>
                )}

                {/* Status Overlay */}
                {status === 'success' && (
                    <div className="absolute inset-0 bg-green-500/20 backdrop-blur-sm flex items-center justify-center flex-col gap-2">
                        <div className="p-4 rounded-full bg-green-500 text-white animate-bounce">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <span className="text-xl font-bold text-white">Identity Verified</span>
                    </div>
                )}
            </div>

            <button
                onClick={startScan}
                disabled={status === 'scanning' || status === 'success' || !!cameraError}
                className={`w-full py-4 font-bold rounded-lg transition-all flex items-center justify-center gap-2
          ${(status === 'scanning' || !!cameraError) ? 'bg-white/10 text-gray-400 cursor-not-allowed' : 'bg-emerald-600 text-white hover:bg-emerald-700'}
        `}
            >
                {status === 'idle' && <><Camera className="w-5 h-5" /> Start Face Scan</>}
                {status === 'scanning' && "Scanning Face..."}
                {status === 'success' && "Redirecting..."}
            </button>
        </motion.div>
    );
};

export default FaceAuth;
