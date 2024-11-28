import React from "react";
import { FaUser,FaLock, FaEnvelope } from "react-icons/fa";

const LoginComponent = ({ onSubmit }) =>{

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const credentials = {
          email: data.get('email'),
          password: data.get('password'),
        };
        onSubmit(credentials);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <div className="input-group">
                    <span className="input-group-text">
                        <FaEnvelope/>
                    </span>
                    <input
                        type="text"
                        name="email"
                        className="form-control"
                        placeholder="Mail"
                        required
                    />
                </div>
            </div>

            <div className="mb-3">
                <div className="input-group">
                    <span className="input-group-text">
                        <FaLock/>
                    </span>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        required
                    />
                </div>
            </div>

            <button type="submit" className="btn btn-primary w-100">
                Login
            </button>
        </form>
    );
}

export default LoginComponent;