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
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      setUserName(user.username);
    }

    // Cargar notas desde el backend
    const fetchNotas = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/notes", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al cargar notas");
        }

        const data = await response.json();
        setNotas(data.notes);
      } catch (error) {
        console.error("Error cargando notas:", error);
      }
    };

    fetchNotas();
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
const handleEliminar = async (id) => {
    const token = localStorage.getItem("token");
    
    try {
    const response = await fetch(`http://localhost:5000/api/notes/${id}`, {
        method: "DELETE",
        headers: {
        "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Error al eliminar nota");
    }

      // Actualizar estado local
    const nuevasNotas = notas.filter((nota) => nota._id !== id);
    setNotas(nuevasNotas);
    } catch (error) {
    console.error("Error eliminando nota:", error);
    alert("Error al eliminar la nota");
    }
};

const handleEditar = (nota) => {
    localStorage.setItem("notaEdit", JSON.stringify(nota));
    navigate("/textinput");
};

const handleCerrarSesion = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
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
            <div className='nota-card' key={nota._id}>
            <h3>{nota.title}</h3>
            <p>{nota.content}</p>
            <div className='nota-acciones'>
                <button type="button" onClick={() => handleEditar(nota)}>
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button type="button" onClick={() => handleEliminar(nota._id)}>
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