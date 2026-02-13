import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

const getPasswordErrors = (password) => {
    const errors = [];

    if (password.length < 8) {
    errors.push("Minimo 8 caracteres");
    }
    if (!/[A-Z]/.test(password)) {
    errors.push("Al menos 1 mayuscula");
    }
    if (!/[0-9]/.test(password)) {
    errors.push("Al menos 1 numero");
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push("Al menos 1 simbolo");
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

const handleSubmit = (event) => {
    event.preventDefault();

    const passwordErrors = getPasswordErrors(formData.password);
    const passwordsMatch = formData.password === formData.confirmPassword;
    if (passwordErrors.length > 0 || !passwordsMatch) {
    return;
    }

    // cuando el sistema este terminado, aqui se enviara el formData al backend
    // el backend debe validar que el username sea unico
    console.log("Register submit:", formData);
};

const passwordErrors = getPasswordErrors(formData.password);
const passwordsMatch = formData.password === formData.confirmPassword;

return (
    <div className="register-page">
    <h1 className="logo">Notebook NM</h1>
    <p>Crear cuenta</p>
    <form className="register-form" onSubmit={handleSubmit}>
        
        <label htmlFor="username">Usuario</label>
        <input
        id="username"
        name="username"
        type="text"
        autoComplete="username"
        value={formData.username}
        onChange={handleChange}
        required
        />

        <label htmlFor="firstName">Nombre</label>
        <input
        id="firstName"
        name="firstName"
        type="text"
        autoComplete="given-name"
        value={formData.firstName}
        onChange={handleChange}
        required
        />

        <label htmlFor="lastName">Apellido</label>
        <input
        id="lastName"
        name="lastName"
        type="text"
        autoComplete="family-name"
        value={formData.lastName}
        onChange={handleChange}
        required
        />

        <label htmlFor="email">Email</label>
        <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        value={formData.email}
        onChange={handleChange}
        required
        />

        <label htmlFor="password">Contrasena</label>
        <input
        id="password"
        name="password"
        type="password"
        autoComplete="new-password"
        value={formData.password}
        onChange={handleChange}
        required
        />
        {passwordErrors.length > 0 && (
        <ul className="password-errors">
            {passwordErrors.map((error) => (
            <li key={error}>{error}</li>
            ))}
        </ul>
        )}

        <label htmlFor="confirmPassword">Confirmar contrasena</label>
        <input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        autoComplete="new-password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        />
        {!passwordsMatch && formData.confirmPassword.length > 0 && (
        <p className="password-mismatch">Las contrasenas no coinciden</p>
        )}

        <div className="register-buttons">
        <button type="button" onClick={() => navigate("/")}>Volver</button>
        <button type="submit" disabled={passwordErrors.length > 0 || !passwordsMatch} onClick={() => navigate("/home")}>
        Registrarse
        </button>
        </div>
    </form>
    </div>
);
};

export default Register;