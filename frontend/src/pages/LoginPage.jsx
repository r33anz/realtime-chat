import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginComponent from "../components/Login";
import SignUpComponent from "../components/SignUp";
import { signup } from "../services/authServices";

const LoginPage = ()=> {
    const [activeTab, setActiveTab] = useState('login');
    const navigate = useNavigate();

    const handleLogin = (credentials) => {
        console.log('Login:', credentials);
        navigate('/home');
    };

    const handleSignup = async (newUser) => {
        try {
            console.log('Signup:', newUser);
            const data = await signup(newUser)
            console.log('Usuario registrado:', data);
            navigate('/home');
        } catch (error) {
            console.error('Error al registrarse',error);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow" style={{ width: '400px' }}>
                <div className="card-header">
                    <ul className="nav nav-tabs card-header-tabs">
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
                                onClick={() => setActiveTab('login')}
                            >
                                Login
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'signup' ? 'active' : ''}`}
                                onClick={() => setActiveTab('signup')}
                            >
                                Register
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="card-body">
                    {activeTab === 'login' ? (
                        <LoginComponent onSubmit={handleLogin} />
                    ) : (
                        <SignUpComponent onSubmit={handleSignup} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default LoginPage;