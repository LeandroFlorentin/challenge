import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { traerFormularioshechos } from '../../redux/actions'
import { useNavigate } from 'react-router-dom'
import db from '../../utils/firebase.js'
import { deleteDoc, doc } from 'firebase/firestore'
import Navbar from '../NavBar'
import Loading from '../Loading'
import sinResultados from '../../img/sinResultados.png'

const Inicio = () => {
    const [eliminado, setEliminado] = useState(true)
    const [cargando, setCargando] = useState(true)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const formularios = useSelector(state => state.formularios)

    useEffect(() => {
        if (eliminado) {
            dispatch(traerFormularioshechos()).then(() => {
                setCargando(false)
                setEliminado(false)
            })
        }
    }, [eliminado])

    const navegar = (ele) => {
        navigate(`/${ele}`)
    }

    const eliminar = async (id) => {
        await deleteDoc(doc(db, "formularios", id)).then(() => setEliminado(true))
    }

    return (
        <>
            {
                cargando ?
                    <Loading />
                    :
                    <div>
                        <Navbar />
                        <div className='containerFormularios'>
                            {
                                formularios?.length ?
                                    <>
                                        {
                                            formularios?.map(ele => {
                                                return (
                                                    <div key={ele.id} className='containerForm'>
                                                        <div className='cardArriba'>
                                                            <h4 className='nombre'>Nombre: {ele.full_name}</h4>
                                                            <h6 className='mail'>{ele.email}</h6>
                                                            <h6 className='pais'>Pais: {ele.country_of_origin}</h6>
                                                            <button className='eliminar' onClick={() => eliminar(ele.id)} >X</button>
                                                        </div>
                                                        <div className='cardAbajo'>
                                                            <p className='fecha'>{ele.fecha} | {ele.hora}</p>
                                                            <button className='editar' onClick={() => navegar(ele.numero)}>Editar</button>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </>
                                    :
                                    <div className='containerSin'>
                                        <img className='fotoSin' src={sinResultados} alt='sinResultados' />
                                        <label className='labelNo'>No tiene formularios creados.</label>
                                    </div>
                            }
                        </div>
                    </div>
            }
        </>
    )
}

export default Inicio;
