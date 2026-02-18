import './App.css'
import { Routes, Route } from 'react-router-dom'
import LoginRegister from './components/LoginRegister/LoginRegister'
import Login from './components/LoginRegister/Login'
import Register from './components/LoginRegister/Register'
import Home from './components/Home/Home'
import TextInput from './components/Home/TextInput'

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<LoginRegister />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/textinput" element={<TextInput />} />
    </Routes>
    </>
  )
}

export default App
