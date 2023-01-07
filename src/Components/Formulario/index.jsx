import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { traerFormulario, traerUnFormulario, crearFormulario } from '../../redux/actions'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../NavBar'
import Loading from '../Loading'

const Formulario = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const dispatch = useDispatch()
    const formulario = useSelector(state => state.formulario)
    const uno = useSelector(state => state.uno)
    const [cargando, setCargando] = useState(true)
    const [incompleto, setIncompleto] = useState({
        full_name: '',
        email: '',
        birth_date: '',
    })
    const [datos, setDatos] = useState({
        full_name: '',
        email: '',
        birth_date: '',
        country_of_origin: '',
    })
    const [repetir, setRepetir] = useState(true)

    useEffect(() => {
        !formulario.length && dispatch(traerFormulario()).then(() => setCargando(false))
        id?.length && repetir && dispatch(traerUnFormulario(id))
            .then(() => {
                setDatos({
                    full_name: uno.full_name,
                    email: uno.email,
                    birth_date: uno.birth_date,
                    country_of_origin: uno.country_of_origin
                })
                setRepetir(false)
            })
    }, [uno])

    const cambiarValor = (e) => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        })
        setIncompleto({
            ...incompleto,
            [e.target.name]: e.target.value
        })
    }

    const subirFormulario = async (e) => {
        e.preventDefault()
        const envio = {
            ...datos,
            fecha: `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
            hora: `${new Date().getHours()}:${new Date().getMinutes()}`,
            numero: `${Math.floor(Math.random() * (999999999 - 0 + 1) + 0)}`,
        }
        try {
            if (datos.full_name.length &&
                datos.email.length &&
                datos.birth_date.length &&
                datos.country_of_origin.length) {
                dispatch(crearFormulario(id, envio, uno)).then(() => navigate('/inicio'))
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <>
            {
                cargando
                    ?
                    <Loading />
                    :
                    <div style={{ display: 'flex' }}>
                        <Navbar />
                        <div className='containerFormulario'>
                            <form onSubmit={subirFormulario} className='formularioCreacion'>
                                {
                                    formulario.items?.map((item, ubi) => {
                                        return (
                                            item.type === "select" ?
                                                <div key={ubi} className={!datos[item.name] ?
                                                    `${item.name} error`
                                                    :
                                                    `${item.name}`
                                                }>
                                                    <label>{item.label}</label>
                                                    <select name={item.name} onChange={cambiarValor} value={datos[item.name]}>
                                                        {item.options?.map((option, ubi) => <option key={ubi}>{option.value}</option>)}
                                                    </select>
                                                </div>
                                                :
                                                <div
                                                    key={ubi}
                                                    className={
                                                        item.type === "submit"
                                                            ||
                                                            item.type === "checkbox"
                                                            ?
                                                            'divInp'
                                                            :
                                                            !datos[item.name]
                                                                ?
                                                                'divInp error'
                                                                :
                                                                'divInp'
                                                    }
                                                    style={item.type === "submit" || item.type === "checkbox" ? {
                                                        alignItems: 'center',
                                                        flexDirection: 'row',
                                                    } : null}
                                                >
                                                    <label>{item.label === "Enviar" ? null : item.label}</label>
                                                    <input
                                                        placeholder={item.name}
                                                        type={item.type}
                                                        style={item.type === "submit" ? {
                                                            cursor: 'pointer',
                                                            width: '200px',
                                                            backgroundColor: '#fff',
                                                            fontSize: '16px'
                                                        } : null}
                                                        onChange={cambiarValor}
                                                        name={item.name}
                                                        value={datos[item.name]}
                                                        required={item.required}
                                                    />
                                                </div>
                                        )
                                    })
                                }
                            </form>
                        </div >
                    </div>
            }
        </>
    )
}

export default Formulario;
