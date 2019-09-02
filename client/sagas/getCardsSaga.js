import { call, put } from 'redux-saga/effects'
import api from '../services/api'
import { setCards, setInfo, throwError } from '../actions/index'

export function * getCardsSaga() {
  try {
    const payload = yield call(() => api.get('transformersShort'))
    yield put(setCards(payload.cards))
    yield put(setInfo(payload.info))
  } catch (e) {
    yield put(throwError({type: 'api error', error: e}))
  }
}
