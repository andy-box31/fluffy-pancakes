import { ACTIONS } from '../utilities/constants'

export default function errorMiddleware ({ dispatch }) {
  return function (next) {
    return function (action) {
      if (action.type === ACTIONS.THROW_ERROR) {
        console.log('error in app', action.payload)
      }
      return next(action)
    }
  }
}
