import { call, put } from 'redux-saga/effects'
import api from '../services/api'
import { setCards, throwError } from '../actions/index'

export function * getCardsSaga() {
  try {
    const payload = yield call(() => api.get('transformers'))
    yield put(setCards(payload))
  } catch (e) {
    yield put(throwError({type: 'api error', error: e}))
  }
}
