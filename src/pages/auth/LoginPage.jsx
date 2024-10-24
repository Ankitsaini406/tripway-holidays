import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/pages/authpage.css';

function LoaginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        if (email === "user@example.com" && password === "password123") {
            navigate("/"); // Redirect to homepage
        } else {
            setError("Invalid email or password.");
        }
    };

    return (
        <>
        <img className="login-page" alt="auth-image" src="https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2676&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            <div className="overlay"></div>
            <div className="login-container">
                <div className="login-card">
                    <h2>Login to Your Travel Account</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                                />
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        <button type="submit" className="login-button">Login</button>
                    </form>
                    <p className="signup-link">
                        Don’t have an account? <a href="/register">Sign Up</a>
                    </p>
                </div>
            </div>
                                </>
    );
};

export default LoaginPage;