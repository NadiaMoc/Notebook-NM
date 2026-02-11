import React from "react";
import { useNavigate } from "react-router-dom";

function LoginRegister() {
  const navigate = useNavigate();

return (
    <div className="contenedor-principal">
    <h1 className="logo">Notebook NM</h1>
    <p>Hacemos que  anotar sea tan sencillo como pensar</p>
    <div className="contenedor-buttons">
        <button className="button-login" onClick={() => navigate("/login")}>Iniciar sesión</button>
        <button className="button-register" onClick={() => navigate("/register")}>Registro</button>
    </div>
  </div>
  );
}

export default LoginRegister;