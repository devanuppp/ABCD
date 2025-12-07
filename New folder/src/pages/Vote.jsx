import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VotingDashboard from '../components/voting/VotingDashboard';

const Vote = () => {
    const navigate = useNavigate();
    const isVerified = localStorage.getItem('isVerified') === 'true';

    useEffect(() => {
        if (!isVerified) {
            navigate('/verify');
        }
    }, [isVerified, navigate]);

    if (!isVerified) return null;

    return <VotingDashboard />;
};

export default Vote;
