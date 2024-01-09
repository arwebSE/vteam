import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const { isLoggedIn } = useContext(AuthContext);
        const navigate = useNavigate();

        useEffect(() => {
            if (!isLoggedIn) {
                navigate('/');
            }
        }, [isLoggedIn, navigate]);

        return isLoggedIn ? < WrappedComponent {...props }
        /> : null;
    };
};

export default withAuth;