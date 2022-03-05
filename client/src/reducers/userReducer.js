import *as Types from './../constants/actionsType';

const accessToken = localStorage.getItem('accessToken')
const initialState = accessToken ? {
    userLoading: true,
    userAuthenticated: false,
    user: null,
    accessToken: accessToken,
    message: null

} : {
    userLoading: true,
    userAuthenticated: false,
    user: null,
    accessToken: null,
    message: null

}

const userReducer = (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        case Types.LOAD_USER_SUCCESS:{
            let newSate = { ...state, ...payload }
            return newSate;
        }
        case Types.LOAD_USER_FAIL:{
            let newSate = { ...state, ...payload }
            return newSate;
        }
        case Types.LOGIN_SUCCESS: {
            let newSate = { ...state, ...payload }
            return newSate;
        }
        case Types.LOGIN_FAIL: {
            let newSate = { ...state, ...payload }
            return newSate
        }
        case Types.REGISTER_SUCCESS: {
            let newSate = { ...state, ...payload }
            return newSate;
        }
        case Types.REGISTER_FAIL: {
            let newSate = { ...state, ...payload }
            return newSate;
        }
        case Types.DELETE_USER_SUCCESS: {
            let newSate = { ...state, message: payload }
            return newSate
        }
        case Types.DELETE_USER_FAIL: {
            let newSate = { ...state, message: payload }
            return newSate
        }
        case Types.UPDATE_USER_SUCCESS: {
            let newSate = { ...state, message: payload }
            return newSate
        }
        default: return state;
    }

}
export default userReducer;