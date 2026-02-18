import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css"


const Register = () => {
const navigate = useNavigate();
const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
});
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

const getPasswordErrors = (password) => {
    const errors = [];

    if (password.length < 8) {
    errors.push("Minimo 8 caracteres");
    }
    if (!/[A-Z]/.test(password)) {
    errors.push("al menos 1 mayuscula");
    }
    if (!/[0-9]/.test(password)) {
    errors.push("1 numero");
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push("y 1 simbolo");
    }
/* hacer mas validaciones para los otros campos */
    return errors;
};
    
const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
    ...prev,
    [name]: value,
    }));
};

const handleSubmit = async (event) => {
    event.preventDefault();

    const passwordErrors = getPasswordErrors(formData.password);
    const passwordsMatch = formData.password === formData.confirmPassword;
    if (passwordErrors.length > 0 || !passwordsMatch) {
    return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al registrar usuario");
      }

      // Guardar token en localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirigir a Home
      navigate("/home");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
};

const passwordErrors = getPasswordErrors(formData.password);
const passwordsMatch = formData.password === formData.confirmPassword;

return (
    <div className="register-page">
    <h1 className="logo">Notebook NM</h1>
    <p>Crear cuenta</p>
    <form className="register-form" onSubmit={handleSubmit}>
        
        <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="JuanPérez123"
            required
            />
        </div>

        <div className="form-group">
            <label htmlFor="firstName">Nombre</label>
            <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Juan"
            required
            />
        </div>

        <div className="form-group">
            <label htmlFor="lastName">Apellido</label>
            <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Pérez"
            required
            />
        </div>

        <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="usuario@ejemplo.com"
            required
            />
        </div>

        <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="password-input-wrapper">
                <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
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
        </div>
        {passwordErrors.length > 0 && (
        <p className="password-errors">({passwordErrors.join(', ')})</p>
        )}

        <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar contraseña</label>
            <div className="password-input-wrapper">
                <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Contraseña123*"
                required
                />
                <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                    <i className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                </button>
            </div>
        </div>
        {!passwordsMatch && formData.confirmPassword.length > 0 && (
        <p className="password-error" >Las contraseñas no coinciden</p>
        )}
        {error && (
        <p className="password-error" >{error}</p>
        )}

        <div className="register-buttons">
        <button className="button-register" type="button" onClick={() => navigate("/")}>Volver</button>
        <button className="button-register" type="submit" disabled={passwordErrors.length > 0 || !passwordsMatch || loading}>
        {loading ? "Registrando..." : "Registrarse"}
        </button>
        </div>
    </form>
    </div>
);
};

export default Register;