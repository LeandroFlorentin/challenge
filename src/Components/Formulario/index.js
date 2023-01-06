import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { traerFormulario, traerUnFormulario } from '../../redux/actions'
import { useParams, useNavigate } from 'react-router-dom'
import db from '../../utils/firebase.js'
import { collection, addDoc, query, setDoc, doc } from 'firebase/firestore'

const Formulario = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const dispatch = useDispatch()
    const formulario = useSelector(state => state.formulario)
    const uno = useSelector(state => state.uno)
    const [datos, setDatos] = useState({
        full_name: '',
        email: '',
        birth_date: '',
        country_of_origin: '',
    })
    const [repetir, setRepetir] = useState(true)

    useEffect(() => {
        !formulario.length && dispatch(traerFormulario())
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
    }

    const subirFormulario = async (e) => {
        e.preventDefault()
        const envio = {
            ...datos,
            fecha: `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
            hora: `${new Date().getHours()}:${new Date().getMinutes()}`,
            numero: `${Math.floor(Math.random() * (999999999 - 0 + 1) + 0)}`,
        }
        const queryRef = collection(db, "formularios")
        if (!id?.length) {
            await addDoc(queryRef, envio)
            navigate('/')
        }
        else {
            const queryRef = collection(db, "formularios", uno.id)
            await setDoc(queryRef, envio)
            navigate('/')
        }
    }

    return (
        <div>
            <form onSubmit={subirFormulario}>
                {
                    formulario.items?.map((item, ubi) => {
                        return (
                            <div key={ubi}>
                                <label>{item.label}</label>
                                <input type={item.type} onChange={cambiarValor} name={item.name} value={datos[item.name]} required={item.required} />
                            </div>
                        )
                    })
                }
            </form>
        </div>
    )
}

export default Formulario;
