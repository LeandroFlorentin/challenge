import React from 'react'
import nuevo from '../../img/nuevo.png'
import { useNavigate } from 'react-router-dom'
import Libro from '../../img/libro.png'
import linea from '../../img/inicio.png'

const Navbar = () => {
    const navigate = useNavigate()
    return (
        <div className='containerNavbar'>
            <div className='containerLibro'>
                <img src={Libro} alt='libro' className='libroNav' onClick={() => navigate('/')} />
            </div>
            <img className='linea' src={linea} alt='linea' />
            <div className='containerNavegar'>
                <h6 className='btnInicio' onClick={() => navigate('/inicio')}>Formularios</h6>
                <div className='containerCrea'>
                    <h6 className='nuevo' onClick={() => navigate('/formulario')} src={nuevo} >Crear</h6>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
