import { takeEvery } from 'redux-saga/effects'
import { GET_CARDS } from '../actions/index'
import {getCardsSaga} from './getCardsSaga'

function * watcher () {
  yield takeEvery(GET_CARDS, getCardsSaga)
}

export default watcher
