import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TextInput = () => {
const navigate = useNavigate();
const [nota, setNota] = useState({
    titulo: "",
    contenido: ""
});

const handleChange = (event) => {
    const { name, value } = event.target;
    
    // Si es el contenido, limitar a 1500 palabras
    if (name === "contenido") {
    const palabras = value.trim().split(/\s+/).filter(palabra => palabra.length > 0);
    if (palabras.length > 100) {
        return; // No actualizar si excede 100 palabras
    }
    }

    setNota((prev) => ({
    ...prev,
    [name]: value
    }));
};

const contarPalabras = () => {
    const palabras = nota.contenido.trim().split(/\s+/).filter(palabra => palabra.length > 0);
    return palabras.length;
};

const handleAgregar = (event) => {
    event.preventDefault();
    console.log("Nota guardada:", nota);
    // Aquí se enviará la nota al backend cuando esté listo
};

return (
    <div className="text-input-container">
    <form className="nota-form" onSubmit={handleAgregar}>
        <label htmlFor="titulo">Título</label>
        <input
        id="titulo"
        name="titulo"
        type="text"
        value={nota.titulo}
        onChange={handleChange}
        placeholder="Ingresa el título de tu nota"
        required
        />

        <label htmlFor="contenido">Contenido</label>
        <textarea
        id="contenido"
        name="contenido"
        value={nota.contenido}
        onChange={handleChange}
        placeholder="Ingresa el contenido de tu nota (máximo 100 palabras)"
        rows="10"
        />

        <div className="nota-buttons">
        <button type="button" onClick={() => navigate("/home")}>Volver</button>
        <button type="submit">Agregar</button>
        </div>
    </form>
    </div>
)
}

export default TextInput