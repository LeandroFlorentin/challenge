import React from 'react'
import './scss/main.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Inicio from './Components/Inicio'
import Formulario from './Components/Formulario'
import Landing from './Components/Lading'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Landing />} />
                <Route path='/inicio' element={<Inicio />} />
                <Route path='/formulario' element={<Formulario />} />
                <Route path='/:id' element={<Formulario />} />
            </Routes>
        </BrowserRouter>
    )
}
export default App;
