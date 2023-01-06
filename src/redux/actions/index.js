import axios from 'axios'
import db from '../../utils/firebase.js'
import { collection, getDocs, query, where } from 'firebase/firestore'
export const FORM = "FORM";
export const FORMULARIOS = "FORMULARIOS";
export const UNOSOLO = 'UNOSOLO';

export const traerFormulario = () => async dispatch => {
    const json = await axios.get('formulario.json')
    return dispatch({ type: FORM, payload: json.data })
}

export const traerUnFormulario = (id) => async dispatch => {
    console.log("FORMULARIO", id)
    const queryRef = query(collection(db, "formularios"), where('numero', '==', id))
    const response = await getDocs(queryRef)
    const unoSolo = response.docs?.map(doc => {
        const form = {
            ...doc.data(),
            id: doc.id
        }
        return form;
    })
    return dispatch({ type: UNOSOLO, payload: unoSolo[0] })
}

export const traerFormularioshechos = () => async dispatch => {
    const queryRef = query(collection(db, 'formularios'))
    const response = await getDocs(queryRef)
    const arrayFormu = response.docs?.map(doc => {
        const newProduct = {
            ...doc.data(),
            id: doc.id
        }
        return newProduct;
    })
    return dispatch({ type: FORMULARIOS, payload: arrayFormu })
}