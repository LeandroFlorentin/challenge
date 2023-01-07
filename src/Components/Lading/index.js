import React from 'react'
import Libro from '../../img/libro.png'
import Persona from '../../img/persona.png'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
    const navigate = useNavigate()
    return (
        <div className='containerLanding'>
            <div className='containerLogo'>
                <img src={Libro} alt='libro' className='logo' />
                <h4 className='creando'>CREANDO<br />FORMULARIOS</h4>
            </div>
            <h2 className='texto'>Crea, visualiza y<br /> elimina tus formularios.</h2>
            <button
                onClick={() => navigate('/inicio')}
                className='botonIr'
            >Crea tu primer formulario.</button>
            <img src={Persona} alt='persona' className='persona' />
        </div>
    )
}

export default Landing;
