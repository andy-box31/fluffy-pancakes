import { createStore, applyMiddleware, compose } from "redux"
import createSagaMiddleware from "redux-saga"
import rootReducer from "../reducers/index"
import sagas from '../sagas/index'
import errorMiddleware from '../middlewares/errorMiddleware'

const sagaMiddleware = createSagaMiddleware();
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer,
  storeEnhancers(
    applyMiddleware(sagaMiddleware, errorMiddleware)
  ))

sagaMiddleware.run(sagas);

export default store
