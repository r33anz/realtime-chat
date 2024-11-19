import React from "react";
import { FaUser,FaLock } from "react-icons/fa";

const LoginComponent = ({ onSubmit }) =>{

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const credentials = {
          username: data.get('username'),
          password: data.get('password'),
        };
        onSubmit(credentials);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <div className="input-group">
                    <span className="input-group-text">
                        <FaUser/>
                    </span>
                    <input
                        type="text"
                        name="username"
                        className="form-control"
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