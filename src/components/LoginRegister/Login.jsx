 import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    loginId: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // cuando el sistema este terminado, aqui se enviara el formData al backend
    console.log("Login submit:", formData);
    
    // Guardar el nombre del usuario en localStorage
    localStorage.setItem("userName", formData.loginId);
    
  };

  return (
    <div className="login-page">
      <h1 className="logo">Notebook NM</h1>
      <p>Iniciar sesion</p>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="loginId">Email o usuario</label>
        <input
          id="loginId"
          name="loginId"
          type="text"
          autoComplete="username"
          value={formData.loginId}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Contrasena</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      <div className="login-buttons">
        <button type="button" onClick={() => navigate("/")}>Volver</button>
        <button type="submit" onClick={() => navigate("/home")}>Entrar</button>
      </div>
      </form>
    </div>
  );
};

export default Login;