import React from "react";  
import { FaUser,FaLock,FaEnvelope} from "react-icons/fa";

const SignUpComponent = ({onSubmit}) =>{
    
    const handleSubmit = (e) =>{
        e.preventDefault()
        const data = new FormData(e.target);
        const newUser = {
        username: data.get('username'),
        email: data.get('email'),
        password: data.get('password'),
        confirmPassword: data.get('confirmPassword'),
        };
        onSubmit(newUser);
    }

    return (
        <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <div className="input-group">
          <span className="input-group-text">
            <FaUser />
          </span>
          <input
            type="text"
            name="username"
            className="form-control"
            placeholder="Usuario"
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
            placeholder="Correo electrónico"
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
            placeholder="Contraseña"
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
            name="confirmPassword"
            className="form-control"
            placeholder="Confirmar contraseña"
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