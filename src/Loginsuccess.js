import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Loginsuccess.css'; // Create this CSS file for styling

const LoginSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home after 3 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000); // 3-second delay

    return () => clearTimeout(timer); // Clean up the timer
  }, [navigate]);

  return (
    <div className="login-success-container">
      <h1>Login Successful</h1>
      <div className="vertical-line"></div>
    </div>
  );
};

export default LoginSuccess;
