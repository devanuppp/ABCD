import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Check, FileText } from 'lucide-react';

const UploadBox = ({ label, file, onUpload }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onUpload(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            onUpload(e.target.files[0]);
        }
    };

    return (
        <label
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`relative h-40 rounded-xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center gap-2
        ${isDragging ? 'border-primary bg-primary/10' : 'border-white/10 hover:border-white/30 hover:bg-white/5'}
        ${file ? 'border-green-500/50 bg-green-500/10' : ''}
      `}
        >
            <input type="file" className="hidden" accept="image/*" onChange={handleChange} />
            {file ? (
                <>
                    <div className="p-2 rounded-full bg-green-500/20 text-green-500">
                        <Check className="w-6 h-6" />
                    </div>
                    <span className="text-sm text-green-400 font-medium">Uploaded: {file.name}</span>
                </>
            ) : (
                <>
                    <div className="p-2 rounded-full bg-white/5 text-gray-400">
                        <Upload className="w-6 h-6" />
                    </div>
                    <span className="text-sm text-gray-400">{label}</span>
                    <span className="text-xs text-gray-500">Drag & drop or click to upload</span>
                </>
            )}
        </label>
    );
};

const IdUpload = ({ onComplete, updateData }) => {
    const [front, setFront] = useState(null);
    const [back, setBack] = useState(null);
    const [isVerifying, setIsVerifying] = useState(false);

    const handleContinue = async () => {
        if (front && back) {
            setIsVerifying(true);
            // Simulate OCR verification
            await new Promise(r => setTimeout(r, 2000));
            updateData({ idFront: front, idBack: back });
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
            <h2 className="text-3xl font-bold mb-2">Document Upload</h2>
            <p className="text-gray-400 mb-8">Upload clear photos of your Citizenship ID.</p>

            <div className="space-y-4">
                <UploadBox label="Front Side" file={front} onUpload={setFront} />
                <UploadBox label="Back Side" file={back} onUpload={setBack} />
            </div>

            <button
                onClick={handleContinue}
                disabled={!front || !back || isVerifying}
                className={`w-full py-4 mt-8 font-bold rounded-lg transition-all flex items-center justify-center gap-2
          ${!front || !back ? 'bg-white/10 text-gray-500 cursor-not-allowed' : 'bg-emerald-600 text-white hover:bg-emerald-700'}
        `}
            >
                {isVerifying ? (
                    <>
                        <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                        Verifying Documents...
                    </>
                ) : (
                    "Verify & Continue"
                )}
            </button>
        </motion.div>
    );
};

export default IdUpload;
