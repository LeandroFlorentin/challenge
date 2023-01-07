import React from 'react'
import nuevo from '../../img/nuevo.png'
import inicio from '../../img/inicio.png'
import { useNavigate } from 'react-router-dom'
import Libro from '../../img/libro.png'

const Navbar = () => {
    const navigate = useNavigate()
    return (
        <div className='containerNavbar'>
            <img src={inicio} alt='inicio' className='btnInicio' onClick={() => navigate('/inicio')} />
            <img src={Libro} alt='libro' className='libroNav' onClick={() => navigate('/')} />
            <div className='containerCrea'>
                <img className='nuevo' onClick={() => navigate('/formulario')} src={nuevo} />
            </div>
        </div>
    )
}

export default Navbar;
