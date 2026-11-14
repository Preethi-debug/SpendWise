
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { APIUrl, handleError, handleSuccess } from '../utils';

function Login() {

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('email and password are required')
        }
        try {
            const url = `${APIUrl}/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    navigate('/home')
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
                    <span className="welcome-tag">YOUR MONEY, YOUR CONTROL</span>

                    <h1>
                        Take control of
                        <br />
                        your finances.
                    </h1>

                    <p>
                        Track your income, manage your expenses
                        and make smarter financial decisions
                        every day.
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
                        <div className="login-icon">↗</div>
                        <h2>Welcome back!</h2>
                        <p>Log in to continue managing your finances.</p>
                    </div>

                    <form onSubmit={handleLogin}>

                        <div className="login-field">
                            <label htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                onChange={handleChange}
                                type="email"
                                name="email"
                                placeholder="Enter your email..."
                                value={loginInfo.email}
                            />
                        </div>

                        <div className="login-field">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                onChange={handleChange}
                                type="password"
                                name="password"
                                placeholder="Enter your password..."
                                value={loginInfo.password}
                            />
                        </div>

                        <button type="submit" className="login-submit">
                            Login to your account →
                        </button>

                        <div className="signup-prompt">
                            Don't have an account?
                            <Link to="/signup"> Create one</Link>
                        </div>

                    </form>
                </div>

                <p className="login-bottom-text">
                    Securely manage your personal finances.
                </p>
            </div>

            <ToastContainer />
        </div>
    )
}

export default Login
