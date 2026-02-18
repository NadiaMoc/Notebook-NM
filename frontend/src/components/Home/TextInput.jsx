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
const [loading, setLoading] = useState(false);

useEffect(() => {
    const notaEdit = JSON.parse(localStorage.getItem("notaEdit") || "null");
    if (notaEdit) {
    setNota({
        titulo: notaEdit.title || "",
        contenido: notaEdit.content || ""
    });
    setNotaEditId(notaEdit._id);
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

const handleAgregar = async (event) => {
    event.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const url = notaEditId
        ? `http://localhost:5000/api/notes/${notaEditId}`
        : "http://localhost:5000/api/notes";
      
      const method = notaEditId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: nota.titulo.trim(),
          content: nota.contenido.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Error al guardar nota");
      }

      localStorage.removeItem("notaEdit");
      navigate("/home");
    } catch (error) {
      console.error("Error guardando nota:", error);
      alert("Error al guardar la nota");
    } finally {
      setLoading(false);
    }
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
        <button className="nota-button" type="submit" disabled={loading}>
          {loading ? "Guardando..." : (notaEditId ? "Actualizar" : "Agregar")}
        </button>
        </div>
    </form>
    </div>
)
}

export default TextInput