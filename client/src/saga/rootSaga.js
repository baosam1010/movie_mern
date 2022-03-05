import {  all} from 'redux-saga/effects';
import filmSaga from './filmSaga';
import userSaga from './userSaga';

function*rootSaga() {
    yield all([
        userSaga(),
        filmSaga(),
    ])

}


export default rootSaga;