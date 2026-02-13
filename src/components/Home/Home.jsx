import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
const [userName, setUserName] = useState("");
const navigate = useNavigate();

useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) {
    setUserName(name);
    }
}, []);

return (
    <div  className='header'>
        <p className='userName'> {userName}</p>
        <h1 className='logo'>Notebook NM</h1>
         <button onClick={()=> navigate("/textinput")}>Nueva nota</button>
    </div>


)
}

export default Home