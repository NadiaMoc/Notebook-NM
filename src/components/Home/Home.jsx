import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import "./Home.css"

const Home = () => {
const [userName, setUserName] = useState("");
const [notas, setNotas] = useState([]);
const [showLogout, setShowLogout] = useState(false);
const logoutButtonRef = useRef(null);
const navigate = useNavigate();

useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) {
    setUserName(name);
    }

    const notasGuardadas = JSON.parse(localStorage.getItem("notas") || "[]");
    setNotas(notasGuardadas);
}, []);

useEffect(() => {
    const handleClickOutside = (event) => {
        if (showLogout && logoutButtonRef.current && !logoutButtonRef.current.contains(event.target)) {
            setShowLogout(false);
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, [showLogout]);

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
        {showLogout ? (
            <button 
                type="button" 
                className='Cerrar-sesion' 
                onClick={handleCerrarSesion}
                ref={logoutButtonRef}
            >
                Cerrar sesión
            </button>
        ) : (
            <button
                type="button"
                className='userName'
                onClick={() => setShowLogout((prev) => !prev)}
            >
                <i className="bi bi-person-fill"></i>
                {userName}
            </button>
        )}
        <h1 className='logo'>Notebook NM</h1>
        <button className='button-nueva-nota' onClick={()=> navigate("/textinput")}>Nueva nota</button>
    </div>
    <div className={`notas-lista ${notas.length === 0 ? "vacia" : ""}`}>
        {notas.length === 0 ? (
        <div className='notas-vacias'><p >Aun no hay notas creadas.</p></div>
        ) : (
        notas.map((nota) => (
            <div className='nota-card' key={nota.id}>
            <h3>{nota.titulo}</h3>
            <p>{nota.contenido}</p>
            <div className='nota-acciones'>
                <button type="button" onClick={() => handleEditar(nota)}>
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button type="button" onClick={() => handleEliminar(nota.id)}>
                    <i class="bi bi-trash3-fill"></i>
                </button>
            </div>
            </div>
        ))
        )}
    </div>
</div>
)
}

export default Home