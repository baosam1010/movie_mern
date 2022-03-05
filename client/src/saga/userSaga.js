import {
    call,
    put,
    takeEvery,
    // delay,
    // fork,
    // select,
    // take,
    takeLatest,
    //put
} from 'redux-saga/effects'
import *as Types from './../constants/actionsType';
import userApi from './../apis/userApi';
import { 
    DeleteUserFail, 
    DeleteUserSuccess, 
    LoadUserFail, 
    LoadUserSuccess, 
    LoginFail, 
    LoginSuccess, 
    RegisterFail, 
    RegisterSuccess, 
    UpdateUserFail, 
    UpdateUserSuccess } from '../actions/Actions';



function*loadUserSaga({payload}){
    const resp = yield call(userApi.loadUser,payload)
    const { success, message, user } = resp;
    if (success) {
        yield put(LoadUserSuccess({  user }))
    } else {
        localStorage.removeItem(Types.LocalStorage_TokenName)
        yield put(LoadUserFail({ message }))
    }
};

function* loginSaga({ payload }) {
    const resp = yield call(userApi.login, payload);
    const { success, accessToken, message } = resp;
    if (success) {
        localStorage.setItem(Types.LocalStorage_TokenName, accessToken)
        yield put(LoginSuccess({ accessToken, message }))
    } else {
        yield put(LoginFail({ message }))
    }
};

function* registerSaga({ payload}){
    const resp = yield call(userApi.register, payload);
    const { success, accessToken, message } = resp;
    if (success) {
        localStorage.setItem(Types.LocalStorage_TokenName, accessToken)
        yield put(RegisterSuccess({ accessToken, message }))
    } else {
        yield put(RegisterFail({ message }))
    }
};

function* deleteUserSaga({payload}){
    console.log("id saga:", payload)
    const resp = yield call(userApi.deleteUser, payload);
    const { success, message } = resp;
    if(success){
        yield put(DeleteUserSuccess({ message }))
    }else{
        yield put(DeleteUserFail({ message }))
    }
};

function*updateUserSaga({ payload}){
    console.log("idUpdate saga:", payload)
    const resp = yield call(userApi.updateUser, payload);
    const { success, message } = resp;
    if(success){
        yield put(UpdateUserSuccess({ message }))
    }else{
        yield put(UpdateUserFail({ message }))
    }
}

function* userSaga() {
    yield takeLatest(Types.LOAD_USER, loadUserSaga)
    yield takeLatest(Types.LOGIN, loginSaga)
    yield takeEvery(Types.REGISTER, registerSaga)
    yield takeEvery(Types.DELETE_USER, deleteUserSaga)
    yield takeEvery(Types.UPDATE_USER, updateUserSaga)

}
export default userSaga;