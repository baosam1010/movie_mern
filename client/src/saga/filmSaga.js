import {
    call,
    put,
    takeEvery,
    // delay,
    // fork,
    // select,
    // take,
    takeLatest,
} from 'redux-saga/effects'
import *as Types from './../constants/actionsType';
import { 
    AddFilmFail, 
    AddFilmSuccess, 
    DeleteFilmmFail, 
    DeleteFilmSuccess, 
    UpdateFilmFail, 
    UpdateFilmSuccess } from '../actions/Actions';
import filmApi from '../apis/filmApi';

function* addFilmSaga({payload}){
    const { data} = payload;
    const resp = yield call(filmApi.addFilm, data);
    const {message, success}=resp;
    if(success){
        yield put(AddFilmSuccess({ message, isLoading: false}))
    }else{
        yield put(AddFilmFail({ message, isLoading: false }))
    }
    
};
function*updateFilmSaga({payload}){
    const { data} = payload;
    const resp = yield call(filmApi.updateFilm, data);
    const {message, success}=resp;
    if(success){
        yield put(UpdateFilmSuccess({ message, isLoading: false}))
    }else{
        yield put(UpdateFilmFail({ message, isLoading: false}))
    }
};
function*deleteFilmSaga({payload}){
    const resp = yield call(filmApi.deleteFilm, payload);
    const {message, success}=resp;
    if(success){
        yield put(DeleteFilmSuccess({ message, isLoading: false }))
    }else{
        yield put(DeleteFilmmFail({ message, isLoading: false }))
    }
};


function* filmSaga() {
   yield takeEvery(Types.ADD_FILM, addFilmSaga)
   yield takeLatest(Types.UPDATE_FILM, updateFilmSaga)
   yield takeLatest(Types.DELETE_FILM, deleteFilmSaga)

}
export default filmSaga;