import { call, put } from 'redux-saga/effects'
import api from '../services/api'
import { setCards, setInfo, throwError } from '../actions/index'

export function * getCardsSaga(action) {
  try {
    const payload = yield call(() => api.get(action.payload))
    yield put(setCards(payload.cards))
    yield put(setInfo(payload.info))
    action.callback()
  } catch (e) {
    yield put(throwError({type: 'api error', error: e}))
  }
}
