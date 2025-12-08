import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AuthGuard from './components/auth/AuthGuard';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Vote from './pages/Vote';
import VerificationFlow from './components/verification/VerificationFlow';

function App() {
    return (
        <AuthProvider>
            <AuthGuard>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/verify" element={<VerificationFlow />} />
                        <Route path="/vote" element={<Vote />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </Layout>
            </AuthGuard>
        </AuthProvider>
    );
}

export default App;
