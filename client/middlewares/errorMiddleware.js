import { THROW_ERROR } from '../actions/index'

export default function errorMiddleware({ dispatch }) {
  return function(next){
    return function(action){
      if(action.type === THROW_ERROR) {
        console.log('error in app', action.payload)
      }
      return next(action);
    }
  }
}