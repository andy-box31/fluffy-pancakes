import { takeEvery } from 'redux-saga/effects'
import { ACTIONS } from '../utilities/constants'
import { getCardsSaga } from './getCardsSaga'

function * watcher () {
  yield takeEvery(ACTIONS.GET_CARDS, getCardsSaga)
}

export default watcher
