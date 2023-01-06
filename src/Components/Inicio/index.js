import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { traerFormularioshechos } from '../../redux/actions'
import { useNavigate } from 'react-router-dom'

const Inicio = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const formularios = useSelector(state => state.formularios)
    useEffect(() => {
        dispatch(traerFormularioshechos())
    }, [])
    const navegar = (ele) => {
        navigate(`/${ele}`)
    }

    return (
        <div>
            {
                formularios?.map(ele => {
                    return (
                        <div key={ele.id}>
                            <h4>{ele.full_name}</h4>
                            <h6>creado por: {ele.email}</h6>
                            <p>el {ele.fecha} a las {ele.hora}</p>
                            <button onClick={() => navegar(ele.numero)}>Ver formulario</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Inicio;
