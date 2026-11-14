
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { APIUrl, handleError, handleSuccess } from '../utils';

function Signup() {

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError('name, email and password are required')
        }
        try {
            const url = `${APIUrl}/auth/signup`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    }

    return (
        <div className="login-page">

            <div className="login-welcome">
                <div className="welcome-brand">
                    <span className="brand-symbol">₹</span>
                    <span>SpendWise</span>
                </div>

                <div className="welcome-content">
                    <span className="welcome-tag">START YOUR FINANCIAL JOURNEY</span>

                    <h1>
                        A smarter way
                        <br />
                        to manage money.
                    </h1>

                    <p>
                        Create your account and take the
                        first step towards better financial
                        habits and smarter spending.
                    </p>

                    <div className="welcome-decoration">
                        <div className="decoration-circle circle-one"></div>
                        <div className="decoration-circle circle-two"></div>
                        <div className="decoration-circle circle-three"></div>
                        <span>✦</span>
                    </div>
                </div>

                <p className="welcome-footer">
                    Make every rupee count.
                </p>
            </div>

            <div className="login-form-section">
                <div className="login-card">

                    <div className="login-heading">
                        <div className="login-icon">✦</div>
                        <h2>Create Account</h2>
                        <p>Join SpendWise and start managing your money.</p>
                    </div>

                    <form onSubmit={handleSignup}>

                        <div className="login-field">
                            <label htmlFor="name">Full Name</label>
                            <input
                                id="name"
                                onChange={handleChange}
                                type="text"
                                name="name"
                                autoFocus
                                placeholder="Enter your name..."
                                value={signupInfo.name}
                            />
                        </div>

                        <div className="login-field">
                            <label htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                onChange={handleChange}
                                type="email"
                                name="email"
                                placeholder="Enter your email..."
                                value={signupInfo.email}
                            />
                        </div>

                        <div className="login-field">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                onChange={handleChange}
                                type="password"
                                name="password"
                                placeholder="Create a password..."
                                value={signupInfo.password}
                            />
                        </div>

                        <button type="submit" className="login-submit">
                            Create Account →
                        </button>

                        <div className="signup-prompt">
                            Already have an account?
                            <Link to="/login"> Login</Link>
                        </div>

                    </form>
                </div>

                <p className="login-bottom-text">
                    Your financial journey starts here.
                </p>
            </div>

            <ToastContainer />
        </div>
    )
}

export default Signup
