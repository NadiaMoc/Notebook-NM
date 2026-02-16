import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "./TextInput.css"

const TextInput = () => {
const navigate = useNavigate();
const [nota, setNota] = useState({
    titulo: "",
    contenido: ""
});
const [notaEditId, setNotaEditId] = useState(null);

useEffect(() => {
    const notaEdit = JSON.parse(localStorage.getItem("notaEdit") || "null");
    if (notaEdit) {
    setNota({
        titulo: notaEdit.titulo || "",
        contenido: notaEdit.contenido || ""
    });
    setNotaEditId(notaEdit.id);
    }
}, []);

const handleChange = (event) => {
    const { name, value } = event.target;
    
    // Si es el contenido, limitar a 100 palabras
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

const handleAgregar = (event) => {
    event.preventDefault();
    const notasGuardadas = JSON.parse(localStorage.getItem("notas") || "[]");
    const notaEditActual = notaEditId
        ? notasGuardadas.find((item) => item.id === notaEditId)
        : null;
    const notaNueva = {
        id: notaEditId || Date.now(),
        titulo: nota.titulo.trim(),
        contenido: nota.contenido.trim(),
        creadaEn: notaEditActual?.creadaEn || new Date().toISOString()
    };

    const nuevasNotas = notaEditId
        ? notasGuardadas.map((item) => (item.id === notaEditId ? { ...item, ...notaNueva } : item))
        : [notaNueva, ...notasGuardadas];

    localStorage.setItem("notas", JSON.stringify(nuevasNotas));
    localStorage.removeItem("notaEdit");

    // Aquí se enviará la nota al backend cuando esté listo
    navigate("/home");
};

return (
    <div className="text-input-container">
        <h1 className="logo">Notebook NM</h1>
    <form className="nota-form" onSubmit={handleAgregar}>
        <div className='nota-input'>
        <label htmlFor="titulo">Título</label>
        <input
        id="titulo"
        name="titulo"
        type="text"
        value={nota.titulo}
        onChange={handleChange}
        placeholder="Ingresa el título de tu nota"
        required
        /></div>

        <div className='nota-input'>
        <label htmlFor="contenido">Contenido</label>
        <textarea
        id="contenido"
        name="contenido"
        value={nota.contenido}
        onChange={handleChange}
        placeholder="Ingresa el contenido de tu nota (máximo 100 palabras)"
        rows="10"
        /></div>

        <div className="nota-buttons">
        <button className="nota-button" type="button" onClick={() => navigate("/home")}>Volver</button>
        <button className="nota-button" type="submit">Agregar</button>
        </div>
    </form>
    </div>
)
}

export default TextInput