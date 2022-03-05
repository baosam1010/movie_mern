import *as Types from './../constants/actionsType';

const initialState = {
    isLoading: true,
    message: null,
    films: []
}
const filmReducer = (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        case Types.ADD_FILM: {
            let newSate = { ...state, ...payload }
            return newSate;
        }
        case Types.ADD_FILM_SUCCESS: {
            let newSate = { ...state, ...payload }
            return newSate;
        }
        case Types.ADD_FILM_FAIL: {
            let newSate = { ...state, ...payload }
            return newSate;
        }
        case Types.UPDATE_FILM: {
            let newSate = { ...state, ...payload }
            return newSate;
        }
        case Types.UPDATE_FILM_SUCCESS: {
            let newSate = { ...state, ...payload }
            return newSate;
        }
        case Types.UPDATE_FILM_FAIL: {
            let newSate = { ...state, ...payload }
            return newSate;
        }
        case Types.DELETE_FILM_SUCCESS: {
            let newSate = { ...state, ...payload }
            return newSate;
        }
        case Types.DELETE_FILM_FAIL: {
            let newSate = { ...state, ...payload }
            return newSate;
        }
        default: return state;
    }

}
export default filmReducer;