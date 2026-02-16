 import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    loginId: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isFormValid = formData.loginId.trim() !== "" && formData.password.trim() !== "";
    if (!isFormValid) {
      return;
    }

    // cuando el sistema este terminado, aqui se enviara el formData al backend
    console.log("Login submit:", formData);
    
    // Guardar el nombre del usuario en localStorage
    localStorage.setItem("userName", formData.loginId);
    navigate("/home");
    
  };

  return (
    <div className="login-page">
      <h1 className="logo">Notebook NM</h1>
      <p>Iniciar sesión</p>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-form-group">
          <label htmlFor="loginId">Usuario</label>
          <input
            id="loginId"
            name="loginId"
            type="text"
            autoComplete="username"
            value={formData.loginId}
            onChange={handleChange}
            placeholder="JuanPerez123"
            required
          />
        </div>

        <div className="login-form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Contraseña123*"
            required
          />
          <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                </button>
        </div>
        <div className="login-buttons">
          <button className="button-login" type="button" onClick={() => navigate("/")}>Volver</button>
          <button className="button-login" type="submit" disabled={formData.loginId.trim() === "" || formData.password.trim() === ""}>Entrar</button>
        </div>
      </form>
    </div>
  );
};

export default Login;