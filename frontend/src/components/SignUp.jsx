import React from "react";  
import { FaUser,FaLock,FaEnvelope} from "react-icons/fa";

const SignUpComponent = ({onSubmit}) =>{

    const handleSignUp = (e) =>{
        e.preventDefault()
        const data = new FormData(e.target);
        const newUser = {
            email: data.get('email'),
            password: data.get('password'),
            name: data.get('username')
        };
        onSubmit(newUser);
    }

    return (
        <form onSubmit={handleSignUp}>
      <div className="mb-3">
        <div className="input-group">
          <span className="input-group-text">
            <FaUser />
          </span>
          <input
            type="text"
            name="username"
            className="form-control"
            placeholder="Username"
            required
          />
        </div>
      </div>
      <div className="mb-3">
        <div className="input-group">
          <span className="input-group-text">
            <FaEnvelope />
          </span>
          <input
            type="email"
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
            <FaLock />
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
        Registrarse
      </button>
    </form>
    )
}

export default SignUpComponent;