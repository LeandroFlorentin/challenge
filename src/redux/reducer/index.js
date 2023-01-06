import { FORM, FORMULARIOS, UNOSOLO } from '../actions'

const initialState = {
    formulario: {},
    formularios: [],
    uno: {}
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case FORM:
            return {
                ...state,
                formulario: { ...action.payload }
            }
        case FORMULARIOS:
            return {
                ...state,
                formularios: [...action.payload]
            }
        case UNOSOLO:
            return {
                ...state,
                uno: action.payload
            }
        default: return state;
    }
}

export default rootReducer;