import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginRegister.css";

function LoginRegister() {
  const navigate = useNavigate();

  return (
    <div className="contenedor-principal">
      <div className="contenedor-top">
        <h1 className="logo">Notebook NM</h1>
        <p>Hacemos que  anotar sea tan sencillo como pensar</p>
      </div>
      <div className="contenedor-buttons">
        <button className="button" onClick={() => navigate("/login")}>Iniciar sesión</button>
        <button className="button" onClick={() => navigate("/register")}>Registro</button>
      </div>
    </div>
  );
}

export default LoginRegister;