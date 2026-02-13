import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
const [userName, setUserName] = useState("");
const [notas, setNotas] = useState([]);
const navigate = useNavigate();

useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) {
    setUserName(name);
    }

    const notasGuardadas = JSON.parse(localStorage.getItem("notas") || "[]");
    setNotas(notasGuardadas);
}, []);

const handleEliminar = (id) => {
    const nuevasNotas = notas.filter((nota) => nota.id !== id);
    setNotas(nuevasNotas);
    localStorage.setItem("notas", JSON.stringify(nuevasNotas));
};

const handleEditar = (nota) => {
    localStorage.setItem("notaEdit", JSON.stringify(nota));
    navigate("/textinput");
};

const handleCerrarSesion = () => {
    localStorage.removeItem("userName");
    navigate("/");
};

return (
<div className='home'>
    <div  className='header'>
        <p className='userName'> {userName}</p>
        <h1 className='logo'>Notebook NM</h1>
        <button onClick={()=> navigate("/textinput")}>Nueva nota</button>
        <button onClick={handleCerrarSesion}>Cerrar sesión</button>
    </div>
    <div className='notas-lista'>
        {notas.length === 0 ? (
        <p className='notas-vacias'>Aun no hay notas creadas.</p>
        ) : (
        notas.map((nota) => (
            <div className='nota-card' key={nota.id}>
            <h3>{nota.titulo}</h3>
            <p>{nota.contenido}</p>
            <div className='nota-acciones'>
                <button type="button" onClick={() => handleEliminar(nota.id)}>Cancelar</button>
                <button type="button" onClick={() => handleEditar(nota)}>Editar</button>
            </div>
            </div>
        ))
        )}
    </div>
</div>
)
}

export default Home